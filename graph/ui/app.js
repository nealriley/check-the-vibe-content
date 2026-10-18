/* global cytoscape */
const vscodeHost = typeof acquireVsCodeApi === 'function' ? acquireVsCodeApi() : null;
const ui = {
  search: document.querySelector('#search'),
  filters: document.querySelector('#planning-filters'),
  series: document.querySelector('#series-list'),
  pieceList: document.querySelector('#piece-list'),
  visibleCount: document.querySelector('#visible-count'),
  graph: document.querySelector('#graph'),
  emptyGraph: document.querySelector('#empty-graph'),
  detail: document.querySelector('#detail'),
  graphSummary: document.querySelector('#graph-summary'),
  syncStatus: document.querySelector('#sync-status'),
  syncError: document.querySelector('#sync-error'),
};

let payload = null;
let graph = null;
let selectedId = null;
let planningFilter = 'all';
let seriesFilter = null;
let searchText = '';

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function pieceNodes() {
  return payload.graph.nodes.filter((node) => node.type === 'piece');
}

function byId(id) {
  return payload.graph.nodes.find((node) => node.id === id);
}

function edgesOf(type) {
  return payload.graph.edges.filter((edge) => edge.type === type);
}

function statesFor(pieceId) {
  return edgesOf('HAS_STATE').filter((edge) => edge.source === pieceId).map((edge) => edge.target.slice('state:'.length));
}

function seriesFor(pieceId) {
  return edgesOf('IN_SERIES').filter((edge) => edge.source === pieceId).map((edge) => edge.target);
}

function visiblePieces() {
  return pieceNodes().filter((piece) => {
    const states = statesFor(piece.id);
    if (planningFilter === 'backlog' && states.length) return false;
    if (planningFilter === 'active' && !states.includes('active')) return false;
    if (planningFilter === 'published' && !states.includes('published')) return false;
    if (seriesFilter && !seriesFor(piece.id).includes(seriesFilter)) return false;
    return piece.title.toLocaleLowerCase().includes(searchText);
  });
}

function renderCounts() {
  const pieces = pieceNodes();
  const counts = {
    all: pieces.length,
    backlog: pieces.filter((piece) => statesFor(piece.id).length === 0).length,
    active: pieces.filter((piece) => statesFor(piece.id).includes('active')).length,
    published: pieces.filter((piece) => statesFor(piece.id).includes('published')).length,
  };
  for (const [name, count] of Object.entries(counts)) {
    document.querySelector(`#count-${name}`).textContent = String(count);
  }
  for (const button of ui.filters.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === planningFilter));
  }
}

function renderSeriesList() {
  ui.series.replaceChildren();
  const all = element('button', 'All series');
  all.type = 'button';
  all.setAttribute('aria-pressed', String(seriesFilter === null));
  all.append(element('span', String(payload.graph.nodes.filter((node) => node.type === 'series').length)));
  all.addEventListener('click', () => { seriesFilter = null; render(); });
  ui.series.append(all);

  for (const series of payload.graph.nodes.filter((node) => node.type === 'series')) {
    const button = element('button', series.title);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(seriesFilter === series.id));
    const count = edgesOf('IN_SERIES').filter((edge) => edge.target === series.id).length;
    button.append(element('span', String(count)));
    button.addEventListener('click', () => { seriesFilter = series.id; render(); });
    ui.series.append(button);
  }
}

function renderPieceList(pieces) {
  ui.pieceList.replaceChildren();
  ui.visibleCount.textContent = `${pieces.length} shown`;
  if (!pieces.length) {
    ui.pieceList.append(element('p', 'Nothing here with these filters.', 'nothing'));
    return;
  }
  for (const piece of [...pieces].sort((a, b) => a.title.localeCompare(b.title))) {
    const button = element('button');
    button.type = 'button';
    button.setAttribute('aria-current', String(piece.id === selectedId));
    button.append(element('strong', piece.title));
    const states = statesFor(piece.id);
    button.append(element('small', states.length ? states.join(' · ') : 'Backlog'));
    button.addEventListener('click', () => selectNode(piece.id));
    ui.pieceList.append(button);
  }
}

function cytoscapeElements(pieces) {
  const ids = new Set(pieces.map((piece) => piece.id));
  if (planningFilter === 'all' && !seriesFilter && !searchText) {
    for (const state of payload.graph.nodes.filter((node) => node.type === 'state')) ids.add(state.id);
  }
  for (const edge of payload.graph.edges) {
    if (ids.has(edge.source) && edge.type !== 'LINKS_TO_PIECE') ids.add(edge.target);
  }
  const nodes = payload.graph.nodes.filter((node) => ids.has(node.id)).map((node) => {
    const states = node.type === 'piece' ? statesFor(node.id) : [];
    const classes = node.type === 'piece' ? (states.length === 2 ? 'both' : states[0] || 'backlog') : '';
    return { data: { id: node.id, label: node.title, kind: node.type }, classes };
  });
  const edges = payload.graph.edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target))
    .map((edge) => ({ data: { id: edge.id, source: edge.source, target: edge.target, kind: edge.type } }));
  return [...nodes, ...edges];
}

function renderGraph(pieces) {
  if (graph) graph.destroy();
  const elements = cytoscapeElements(pieces);
  ui.emptyGraph.hidden = pieces.length !== 0;
  const connections = elements.filter((item) => item.data.source).length;
  ui.graphSummary.textContent = `${pieces.length} pieces · ${connections} connections${ui.graph.clientWidth < 700 && pieces.length > 5 ? ' · Drag to explore' : ''}`;
  graph = cytoscape({
    container: ui.graph,
    elements,
    layout: {
      name: 'cose', animate: false, fit: true, padding: 80, randomize: false,
      nodeRepulsion: 240000, idealEdgeLength: 130, edgeElasticity: 90, gravity: 0.3,
    },
    style: [
      { selector: 'node', style: {
        label: 'data(label)', 'font-family': 'Georgia, serif', 'font-size': 12,
        color: '#253a36', 'text-wrap': 'wrap', 'text-max-width': 112,
        'text-valign': 'center', 'text-halign': 'center',
        'overlay-opacity': 0, 'border-width': 1.5, 'border-color': '#70877e',
        width: 90, height: 90, 'background-color': '#f2eee6',
      } },
      { selector: 'node[kind = "piece"].active', style: { 'background-color': '#f6dfbc', 'border-color': '#bc8756' } },
      { selector: 'node[kind = "piece"].published', style: { 'background-color': '#dbe9da', 'border-color': '#6d9c7b' } },
      { selector: 'node[kind = "piece"].both', style: { 'background-color': '#e8dddf', 'border-color': '#9f7d9a' } },
      { selector: 'node[kind = "series"]', style: {
        'background-color': '#28534c', 'border-color': '#21483f', color: '#fffefa',
        width: 122, height: 122, 'font-size': 14, 'font-weight': 700,
      } },
      { selector: 'node[kind = "state"]', style: {
        'background-color': '#c97851', 'border-color': '#af603c', color: '#fffefa',
        width: 78, height: 78, 'font-size': 12,
      } },
      { selector: 'node:selected', style: { 'border-width': 4, 'border-color': '#d57948' } },
      { selector: 'edge', style: {
        width: 1.4, 'line-color': '#b6c1b8', 'curve-style': 'bezier',
        'target-arrow-shape': 'triangle', 'target-arrow-color': '#b6c1b8', 'arrow-scale': 0.7,
      } },
      { selector: 'edge[kind = "LINKS_TO_PIECE"]', style: { 'line-style': 'dashed', 'line-color': '#a9afa9', 'target-arrow-color': '#a9afa9' } },
      { selector: 'edge[kind = "IN_SERIES"]', style: { 'line-color': '#90aca1', 'target-arrow-color': '#90aca1', width: 1.8 } },
      { selector: 'edge[kind = "HAS_STATE"]', style: { 'line-color': '#d6a17d', 'target-arrow-color': '#d6a17d', width: 1.8 } },
    ],
  });
  graph.on('tap', 'node', (event) => selectNode(event.target.id()));
  graph.on('tap', (event) => { if (event.target === graph) selectNode(null); });
  if (ui.graph.clientWidth < 700 && pieces.length > 5) {
    const focus = graph.nodes('[kind = "series"]').first().length
      ? graph.nodes('[kind = "series"]').first()
      : graph.nodes('[kind = "piece"]').first();
    graph.zoom(0.95);
    graph.center(focus);
  }
  if (selectedId && graph.$id(selectedId).length) graph.$id(selectedId).select();
}

function heading(text) {
  const section = element('section', undefined, 'detail-section');
  section.append(element('h3', text));
  return section;
}

function relatedButton(node) {
  const button = element('button', node.title, 'detail-item');
  button.type = 'button';
  button.addEventListener('click', () => {
    planningFilter = 'all'; seriesFilter = null; searchText = ''; ui.search.value = '';
    render();
    selectNode(node.id);
  });
  return button;
}

function renderDetail() {
  ui.detail.replaceChildren();
  const node = selectedId ? byId(selectedId) : null;
  if (!node) {
    const box = element('div', undefined, 'detail-placeholder');
    box.append(element('span', '✳', 'detail-symbol'), element('p', 'Look closer', 'eyebrow'),
      element('h2', 'Select a node'), element('p', 'Choose a piece or series on the map, or pick a piece from the list.'));
    ui.detail.append(box);
    return;
  }

  ui.detail.append(element('p', node.type === 'piece' ? 'Writing piece' : node.type === 'series' ? 'Series' : 'Planning state', 'eyebrow'));
  ui.detail.append(element('h2', node.title));
  if (node.type === 'piece') {
    ui.detail.append(element('p', node.slug, 'slug'));
    const tags = element('div', undefined, 'tag-row');
    const states = statesFor(node.id);
    if (!states.length) tags.append(element('span', 'Backlog', 'tag backlog'));
    for (const state of states) tags.append(element('span', state[0].toUpperCase() + state.slice(1), `tag ${state}`));
    ui.detail.append(tags);

    const series = seriesFor(node.id).map(byId).filter(Boolean);
    if (series.length) {
      const section = heading('Series');
      for (const item of series) section.append(relatedButton(item));
      ui.detail.append(section);
    }
    const outgoing = edgesOf('LINKS_TO_PIECE').filter((edge) => edge.source === node.id).map((edge) => byId(edge.target));
    const incoming = edgesOf('LINKS_TO_PIECE').filter((edge) => edge.target === node.id).map((edge) => byId(edge.source));
    if (outgoing.length) {
      const section = heading('Links to');
      for (const item of outgoing) section.append(relatedButton(item));
      ui.detail.append(section);
    }
    if (incoming.length) {
      const section = heading('Linked from');
      for (const item of incoming) section.append(relatedButton(item));
      ui.detail.append(section);
    }
    const source = heading('Source');
    source.append(element('p', node.indexPath));
    const link = element(vscodeHost ? 'button' : 'a', 'Open index.md ↗', 'detail-action');
    if (vscodeHost) {
      link.type = 'button';
      link.addEventListener('click', () => vscodeHost.postMessage({ type: 'openIndex', slug: node.slug }));
    } else {
      link.href = `/source/${encodeURIComponent(node.slug)}`;
      link.target = '_blank';
      link.rel = 'noopener';
    }
    source.append(link);
    ui.detail.append(source);
    return;
  }

  const members = node.type === 'series'
    ? edgesOf('IN_SERIES').filter((edge) => edge.target === node.id).map((edge) => byId(edge.source))
    : edgesOf('HAS_STATE').filter((edge) => edge.target === node.id).map((edge) => byId(edge.source));
  const section = heading(`${members.length} ${members.length === 1 ? 'piece' : 'pieces'}`);
  if (!members.length) section.append(element('p', 'No pieces linked yet.'));
  for (const member of members.sort((a, b) => a.title.localeCompare(b.title))) section.append(relatedButton(member));
  ui.detail.append(section);
}

function render() {
  if (!payload) return;
  renderCounts();
  renderSeriesList();
  const pieces = visiblePieces();
  renderPieceList(pieces);
  renderGraph(pieces);
  renderDetail();
}

function selectNode(id) {
  selectedId = id;
  if (graph) {
    graph.nodes().unselect();
    const target = id ? graph.$id(id) : null;
    if (target?.length) {
      target.select();
      graph.animate({ center: { eles: target }, duration: 220 });
    }
  }
  renderPieceList(visiblePieces());
  renderDetail();
}

function renderSyncState() {
  if (!payload) return;
  if (payload.error) {
    ui.syncStatus.textContent = 'Index needs attention';
    ui.syncStatus.classList.add('error');
    ui.syncError.textContent = `Graph refresh failed. Showing the last good cache. ${payload.error}`;
    ui.syncError.hidden = false;
  } else if (payload.stale) {
    ui.syncStatus.textContent = 'Source changed · rebuild needed';
    ui.syncStatus.classList.add('error');
    ui.syncError.textContent = 'The graph shows the last build. Ask your coding agent to run npm run graph:build.';
    ui.syncError.hidden = false;
  } else {
    const time = payload.lastIndexedAt ? new Date(payload.lastIndexedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'never';
    ui.syncStatus.textContent = `Updated ${time}${payload.warnings.length ? ` · ${payload.warnings.length} warning(s)` : ''}`;
    ui.syncStatus.classList.remove('error');
    ui.syncError.hidden = true;
  }
  ui.syncStatus.title = payload.error || payload.warnings.join('\n');
}

function acceptPayload(next) {
  const changed = !payload || next.revision !== payload.revision || next.lastIndexedAt !== payload.lastIndexedAt;
  payload = next;
  renderSyncState();
  if (changed) render();
}

async function poll() {
  try {
    const response = await fetch('/api/graph', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    acceptPayload(await response.json());
  } catch (error) {
    ui.syncStatus.textContent = `Viewer disconnected: ${error.message}`;
    ui.syncStatus.classList.add('error');
  }
}

ui.search.addEventListener('input', () => { searchText = ui.search.value.trim().toLocaleLowerCase(); render(); });
ui.filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  planningFilter = button.dataset.filter;
  render();
});
document.querySelector('#zoom-in').addEventListener('click', () => graph?.zoom({ level: graph.zoom() * 1.2, renderedPosition: { x: ui.graph.clientWidth / 2, y: ui.graph.clientHeight / 2 } }));
document.querySelector('#zoom-out').addEventListener('click', () => graph?.zoom({ level: graph.zoom() / 1.2, renderedPosition: { x: ui.graph.clientWidth / 2, y: ui.graph.clientHeight / 2 } }));
document.querySelector('#fit-graph').addEventListener('click', () => graph?.fit(undefined, 70));

if (vscodeHost) {
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'snapshot') acceptPayload(event.data.payload);
  });
  vscodeHost.postMessage({ type: 'ready' });
} else {
  void poll();
  setInterval(() => void poll(), 2000);
}
