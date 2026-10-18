# Concept research: The Human Baseline

Researched 18 October 2026. Working notes for the piece, not a draft. Each section separates published findings from the proposed interpretation.

## 1. Radiocarbon dating after atmospheric nuclear testing

**What happened.** Atmospheric nuclear weapons tests in the late 1950s and early 1960s sharply increased atmospheric carbon-14. The signal peaked and then declined as carbon moved among the atmosphere, ocean, and biosphere. Fossil-fuel carbon, which lacks carbon-14, also dilutes the atmospheric ratio. Dating a sample requires an appropriate reference curve, and recent samples can require attention to where and when their carbon entered a living organism. [Lawrence Livermore National Laboratory (LLNL)](https://cams.llnl.gov/research/bioscience/cell-biology-research-using-bomb-pulse-dating); [Hua et al., *Radiocarbon*, 2022](https://www.cambridge.org/core/journals/radiocarbon/article/atmospheric-radiocarbon-for-the-period-19502019/28F8E4DD4BA3F32266541445EC3F64C8).

**Crucial correction.** Post-nuclear radiocarbon dating is **not impossible**. Scientists use the distinctive “bomb pulse” to date some biological and forensic material from the testing era; traditional radiocarbon methods remain useful for older material. The bomb-pulse method itself becomes less discriminating as the excess signal declines. [LLNL overview](https://cams.llnl.gov/research/bioscience/cell-biology-research-using-bomb-pulse-dating); [LLNL forensic example](https://www.llnl.gov/article/51481/livermores-research-involvement-23-year-old-cold-case); [Hua et al.](https://www.cambridge.org/core/journals/radiocarbon/article/atmospheric-radiocarbon-for-the-period-19502019/28F8E4DD4BA3F32266541445EC3F64C8).

**Use for the essay.** A changed atmosphere does not erase the past; it changes the calibration problem and makes provenance and reference records more important. That is a stronger, accurate metaphor for an AI-saturated information environment than “carbon dating stopped working.” There is no known universal carbon-14 equivalent that marks every AI-generated sentence, so the metaphor should stop at the need for a trustworthy baseline.

## 2. Does AI-generated work converge toward a mean?

There are **two distinct phenomena** here. They should not be described as the same effect.

**Similarity among people using the same assistant.** In an online experiment on short fiction, Doshi and Hauser found that writers given AI story ideas produced stories rated more creative, better written, and more enjoyable, particularly among participants with lower scores on the study's creativity measure. Their AI-assisted stories were also more similar to one another. This is direct evidence of an individual benefit paired with lower *between-story diversity in that setting*. It does not establish that all AI-assisted work converges, that every model has a single style, or that the effect lasts across a career. [Doshi and Hauser, *Science Advances*, 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532/).

**Model collapse under recursive training.** Shumailov and colleagues studied what happens when successive generative models train on generated data from earlier models. Under indiscriminate recursive use, rare parts of the original distribution can disappear and model quality can degrade. Gerstgrasser and colleagues later found, in their experimental settings, that retaining and accumulating the original real data alongside synthetic data avoided collapse observed when original data were replaced. This is about *training-data feedback loops*, not the immediate quality of a student's essay or a junior developer's code. It does not prove that the current internet has already “collapsed.” [Shumailov et al., *Nature*, 2024](https://www.nature.com/articles/s41586-024-07566-y); [Gerstgrasser et al., 2024](https://arxiv.org/abs/2404.01413).

**Working inference.** If many people accept the same readily available first suggestions, shared defaults could become more visible in the output we encounter. The fiction experiment supports concern about one route to similarity. The wider cultural claim still needs examples and careful scope. A model can also widen access, help a person explore unfamiliar directions, and produce distinctive work under deliberate direction. The essay should ask when an assistant becomes a person's *first thought* rather than assume all AI use is flattening.

## 3. Students and early-career employees: output versus learning

**Short-term performance can hide a learning cost.** In a field experiment with nearly 1,000 high-school mathematics students at one school in Turkey, students with a general GPT-4 chat interface performed better during assisted practice but scored worse than an unassisted control group on a later unassisted exam. A version designed to give teacher-informed hints rather than solutions largely mitigated the negative effect, though it did not produce a clear exam gain. The study measures short-term learning in this setting, not long-term career outcomes. [Bastani et al., *PNAS*, 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/).

**A small coding experiment points in a similar direction.** Shen and Tamkin randomized 52 mostly junior developers learning a new Python library. The AI-assisted group scored 17% lower on a near-term mastery quiz, while the slight task-speed improvement was not statistically significant. Use patterns mattered: people who asked explanatory or conceptual questions while coding showed better understanding than those who delegated the work. This is one library and one short task; it cannot settle what happens across all programming jobs or over years. [Shen and Tamkin, “How AI Impacts Skill Formation,” 2026](https://arxiv.org/abs/2601.20245); [research summary](https://www.anthropic.com/research/AI-assistance-coding-skills).

**A counterweight: AI can help newer workers learn.** A study of 5,172 customer-support agents found that AI assistance increased issues resolved per hour by 15% on average. Less experienced and lower-skilled agents gained most, with evidence of durable learning in that workplace. The authors caution that one company and occupation do not represent all work. This weakens any simple instruction for juniors to avoid AI; *how* the tool is used and what the task teaches matter. [Brynjolfsson, Li, and Raymond, *Quarterly Journal of Economics*, 2025](https://academic.oup.com/qje/article/140/2/889/7990658).

**Question for the piece.** What should an early-career person still practise unaided so they can recognise mistakes, form taste, and make decisions of their own? A plausible answer is to protect some first attempts, reflective revisions, and explanations of decisions, then use AI for critique, examples, or tutoring. This is a proposed practice derived from the tension above, **not** an experimentally validated universal rule.

## 4. Personal context and the value of a self-authored archive

**Mechanism.** A model's response can be conditioned on material selected from a person's own history. The Pearl research prototype retrieved user-authored documents that were likely to help a writing assistant follow that user's style, knowledge, and values. The LaMP benchmark also found benefits from retrieving relevant items in a user profile across several personalised text tasks. A later story-generation study found that an inferred “Author Writing Sheet” improved resemblance to past author style against its baseline, while still falling short of the authors' actual stories in important respects. [Mysore et al., ACL workshop, 2024](https://aclanthology.org/2024.customnlp4u-1.16/); [Salemi et al., ACL, 2024](https://aclanthology.org/2024.acl-long.399/); [“Whose story is it?”, IJCNLP/AACL, 2025](https://aclanthology.org/2025.ijcnlp-long.82/).

**Code has a related but narrower case.** RepoCoder improved repository-level code completion by retrieving relevant existing repository material. This supports the value of *relevant local code context* to a coding assistant. It does not show that handwritten code is always better context than AI-assisted code, or that a person's code archive by itself produces an individual “style.” [Zhang et al., EMNLP, 2023](https://aclanthology.org/2023.emnlp-main.151/).

**What the essay can propose.** Keep a small, retrievable body of genuinely self-authored work: independent first drafts, handwritten code and tests, observations, decisions and their reasons, revisions, examples of work one chose *not* to publish, and notes on feedback received. Attach enough date and context to understand what each item represents. When using AI, choose task-relevant pieces of that archive as context and check whether the result expresses the intended decision or voice. A mixed archive can still be useful if AI assistance is labelled honestly; “human baseline” describes a source of independent judgement, not a purity credential.

**What remains unproven.** The cited studies support *personalisation from selected user history* and *repository context*, but do not establish that amassing non-AI work automatically improves local AI use, or that more documents always help. Relevance, quality, selection, prompt design, model behaviour, privacy, and the person's own review all matter. There is also no direct evidence here that building such an archive changes a student's long-term career prospects. Those are hypotheses for this essay to explore, ideally with a concrete demonstration.

## Follow-up research: where the simple version of the thesis breaks

### Convergence depends on the task and the way AI enters it

The short-fiction result above is not a general law of cultural convergence. In a dynamic experiment with more than 800 participants, Ashkinaze and colleagues exposed people to AI-generated or prior human ideas before asking them to brainstorm. **High AI exposure increased collective idea diversity** without improving individual idea creativity. This differs from giving many writers the same model as their direct starting assistant. The comparison suggests that exposure, generation, and selection are different interventions. [Ashkinaze et al., *Collective Intelligence Conference*, 2025](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/198883/3715928.3737481.pdf?sequence=1).

A more recent randomised study of 211 undergraduates asked them to learn an unfamiliar topic and write an analytical essay with or without AI access, then complete unaided assessments immediately and a week later. The authors report better knowledge scores with AI access, a smaller persistent gain, and **no detected increase in similarity among the AI-allowed essays**. Students who used AI mainly for explanation retained more of the benefit than students who used it to draft for them, but *type of use was chosen by students, not randomised*. This is a 2026 working paper in one timed university setting. It pushes against both “AI always harms learning” and “AI always homogenises writing.” [Contractor and Reyes, 2026 preprint](https://arxiv.org/abs/2607.08849).

For the essay, “regression to the mean” should therefore be a **risk in particular workflows**: starting from a common model suggestion, accepting the first fluent version, or following a shared template. It is not an inevitable property of every AI-assisted work product. The sharper question is which parts of the creative process the person initiates and which parts the model initiates.

### Early-career work: capability now versus expertise retained

A new field experiment with **673 final-year IT apprentices** at twelve German vocational schools found large AI-assisted performance gains, including on tasks beyond their formal training. On those beyond-curriculum tasks, scores rose by 26–31 percentage points. Four unaided comprehension questions immediately after each task showed no average loss of understanding; some tasks showed gains. This is strong evidence that AI can extend what early-career people can do *now*. It does not measure whether they retain the new capability months later. The paper is a preliminary discussion paper. [Brosch et al., IZA Discussion Paper, October 2026](https://docs.iza.org/dp18999.pdf).

A three-month randomised trial with **133 patent lawyers** at eleven US firms drew a different distinction. AI access improved benchmark drafting quality, especially for junior lawyers. At the end, lawyers completed an unaided redlining task measuring professional judgement. Senior lawyers who had used AI performed better than senior controls; juniors who had used AI showed **no average gain** against junior controls, with outcomes spreading toward both better and worse scores. This is not evidence that AI made juniors worse on average, nor a direct test of a personal archive. It suggests that assisted output and retained judgement must be measured separately. The working paper also notes that its unassisted end task differs from its drafting tasks and that only 91 of 133 lawyers completed the full protocol. [Autor et al., MIT/NBER working paper, September 2026](https://shapingwork.mit.edu/wp-content/uploads/2026/09/Autor-et-al-Sept-2026.pdf).

Early skills have value beyond today's AI question. In German apprenticeship data linked to later earnings, cognitive, social, and digital skills acquired early were associated with higher long-run wages. This does not show that any particular AI practice builds or destroys those skills, but it explains why the early-career learning question matters. [Langer and Wiederhold, 2023 working paper](https://dash.harvard.edu/entities/publication/8a6c106e-1ca6-4803-b228-1de3a5e15a6c).

The emerging editorial distinction: **What can I produce with the tool? What can I understand and judge immediately after? What can I still do later without it?** A student or employer could get a different answer to each question. The proposed personal cache belongs mainly to the third question, though its usefulness there has not been tested directly.

### Can editing an AI first draft restore personal style?

In a preregistered online study of 81 people doing personally meaningful writing tasks, participants post-edited LLM drafts. Editing moved the texts closer to their unassisted writing, but the results remained stylistically closer to LLM output and less diverse than unassisted human writing by the study's embedding-based measures. Participants often *felt* the edited work represented their style, which did not fully match those measures. This is specific to the tasks and measurements used; it does not show that no writer can reclaim an AI draft. It gives the proposed “make a first attempt yourself” practice a concrete, testable reason. [Baumler et al., ACL, 2026](https://aclanthology.org/2026.acl-long.2030/).

The opposite promise also needs restraint. A study covering more than 400 authors and several genres found that models given a few writing samples could approximate style better in structured formats such as news and email than in informal blogs and forums. Keeping an archive does **not** ensure the model will reproduce its owner's implicit voice. [Wang et al., Findings of EMNLP, 2025](https://aclanthology.org/2025.findings-emnlp.532/).

### An archive serves two different purposes

1. **For the person:** making and revising work can create understanding and judgement. The classic “generation effect” and retrieval-practice experiments show that actively producing or retrieving material can strengthen later memory compared with simply reading or restudying it. Those experiments involve constrained learning tasks; they do not directly prove that every unaided essay or codebase produces better professional skill. [Slamecka and Graf, *Journal of Experimental Psychology*, 1978](https://doi.org/10.1037/0278-7393.4.6.592); [Karpicke and Roediger, *Science*, 2008](https://doi.org/10.1126/science.1152408).
2. **For the AI interaction:** selected prior work can supply examples of preferred expression, decisions, terminology, and domain context. This is the mechanism studied by Pearl and LaMP above. It depends on selecting material relevant to the current task, not simply possessing a large pile of files. In long-context experiments, models' performance sometimes declined when needed information appeared in the middle of a long input. That result is about specific model and retrieval tasks, but it supports caution about dumping an entire personal archive into a prompt. [Liu et al., *Transactions of the ACL*, 2024](https://aclanthology.org/2024.tacl-1.9/).

These purposes should stay separate in the argument. A person might learn from making something even if the file is never supplied to a model. A model might benefit from a relevant file that its user did not personally write. The proposed value of a **self-authored** archive is that it could serve both purposes at once; that combined, long-term payoff has not yet been demonstrated by these studies.

### What provenance can and cannot mean here

Radiocarbon offers a physical measurement against a reference curve. An AI-text detector is not an equivalent authenticity test: researchers have shown that plausible text edits and style changes can defeat multiple detectors. If the writer wants to know which archive items were made independently, dated process notes and honest labels for assisted work are a more suitable personal record than retroactive detector scores. This is a practical inference, not a claim that every kind of AI provenance is impossible. [Shi et al., *Transactions of the ACL*, 2024](https://aclanthology.org/2024.tacl-1.10/).

### A small demonstration worth making before the piece is drafted

Use one real, permission-cleared writing or coding task and compare: (a) the person's independent first attempt, (b) a generic AI first attempt, and (c) AI assistance that receives a few *task-relevant* pieces of the person's prior work. Keep the brief and evaluation criteria fixed. Ask the person which output best reflects their intent and have an outside reader assess usefulness and distinctiveness. This would be an illustration, not proof of a population-level effect. It could also fail in an interesting way: the independent attempt might be weak, or the personal context might distract the model.

## Candidate through-line and boundaries

The strongest version of the argument may be: **Keep making some things before asking for completion, so that future assistance has something of yours to work with and you have the skill to judge it.** This connects learning, authorship, and context without making “AI-free” an end in itself.

Boundaries to maintain:

- Do not state that nuclear testing ended radiocarbon dating, or imply that AI text carries an isotope-like detectable marker.
- Do not use “model collapse” as proof that every present-day AI-assisted piece of writing converges.
- Do not equate human origin with quality, originality, or moral superiority. A self-authored archive can be derivative; an AI-assisted piece can express a person's choices.
- Do not turn the learning studies into a blanket ban on student or junior AI use. The studies show that tool design and interaction patterns matter.
- Do not promise that a personal archive will make AI outputs distinctive on its own. Its contents must be selected, supplied, and evaluated.

## Research still needed before a draft makes broad claims

- A concrete example from a student or junior worker comparing an unaided first attempt, AI completion without personal material, and AI work with selected personal context. Obtain permission if using another person's work.
- Evidence on whether the same pattern holds beyond short fiction, high-school maths, one Python library, and customer support.
- If claiming AI-generated material already dominates online content or training corpora, measure that claim with a suitable source; the studies above do not establish its current share.
- A decision about the reader: students, junior employees, educators and managers, or a general audience. The proposed practice will look different for each.
