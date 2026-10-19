FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

COPY graph-service.sh /usr/local/bin/ctv-graph-service
RUN chmod +x /usr/local/bin/ctv-graph-service

# Make the unpublished workspace extension visible before the remote editor starts.
COPY check-the-vibe.vsix /tmp/check-the-vibe.vsix
RUN mkdir -p /tmp/ctv-vsix /home/node/.vscode-remote/extensions \
    && unzip -q /tmp/check-the-vibe.vsix 'extension/*' -d /tmp/ctv-vsix \
    && extension_version="$(node -p "require('/tmp/ctv-vsix/extension/package.json').version")" \
    && mv /tmp/ctv-vsix/extension "/home/node/.vscode-remote/extensions/local.check-the-vibe-vscode-${extension_version}" \
    && chown -R node:node /home/node/.vscode-remote \
    && rm -rf /tmp/ctv-vsix /tmp/check-the-vibe.vsix

USER node
ENTRYPOINT ["/usr/local/bin/ctv-graph-service"]
