# Source notes: agentic demand and the hidden terms of access

Research pass: 18 October 2026. These are leads and claim boundaries for *Breaking the Inherent Contracts*, not a draft.

## Original paper

Chris Schmitz, Lewis Hammond, and Alan Chan, [*Characterizing Agentic Flooding of Government Services*](https://arxiv.org/abs/2608.16603), arXiv:2608.16603v2, 19 August 2026. [Full text](https://arxiv.org/html/2608.16603v2) · [arXiv PDF](https://arxiv.org/pdf/2608.16603v2) · [local PDF](characterizing-agentic-flooding-2608.16603v2.pdf) · [authors' case dataset](https://github.com/CLSchmitz/flooding-dataset).

The local PDF is the 17-page arXiv v2 linked by Mollick's follow-up post. Its title, authors, and version were checked against the PDF itself.

### What the paper contributes

- **A definition:** “agentic flooding” covers growth in the *number* of requests or the *complexity* of each request when AI lowers the cost of interacting with government and the change strains capacity. It is broader than a bot repeatedly pressing Submit. See [§2](https://arxiv.org/html/2608.16603v2#S2).
- **An exploratory case set:** the authors collect 84 potential cases across 11 jurisdictions and 13 service domains. Their search covered 12 countries; 11 yielded included cases. Most of the observed mechanism is language models generating text while people handle the remaining steps. The paper reports text generation in 87% of its cases. See [§§3–4](https://arxiv.org/html/2608.16603v2#S3).
- **A risk frame:** services look especially exposed when a successful request has a financial or legal payoff, submissions are complex, and earlier demand was limited by the effort and knowledge needed to apply. See [§5](https://arxiv.org/html/2608.16603v2#S5).
- **Two broad responses:** suppress demand through fees, limits, or other barriers; or increase capacity through staffing, service redesign, and carefully bounded AI support. The first can be deployed faster but risks unequal access. The second requires investment and lead time. See [§6](https://arxiv.org/html/2608.16603v2#S6).
- **A restrained conclusion:** the authors do not predict imminent collapse of government services. They recommend assessing exposed services, developing digital identity strategies, and clarifying the legal basis for response options before a surge forces a rushed decision. See [§7](https://arxiv.org/html/2608.16603v2#S7).

### What it cannot establish

The dataset is an exploratory collection of reported surges with official or credible third-party attribution to AI. It is neither a representative sample of services nor a causal test. The authors explicitly say they cannot measure how much of any surge AI caused, or infer prevalence from the 84 cases. Only 25 cases have volume time series. Their proposed risk factors and responses draw substantially on theory and precedent and have not been validated as a comparative test. See [§§3.2, 4, 8](https://arxiv.org/html/2608.16603v2#S8).

The paper studies government interactions. A claim that the same pattern is occurring in companies would require separate examples and evidence.

## Mollick's post and follow-up

In his [18 October 2026 post](https://x.com/emollick/status/2111595040913100837), Ethan Mollick says government and companies face a consequential choice as AI-assisted inquiries overcome “the frictions that gated access.” He points to the attached graphs as an early sign and asks: “do you make services worse or better as a result?” This records his framing; the graphs come from a paper whose authors do not claim to have proved AI caused the increases.

In his [follow-up](https://x.com/emollick/status/2111595909595480310), he writes, “Status quo isn't an option.” He describes one path as adding fees, degrading services, or banning agents; the other as using AI to expand service and redesigning work to ease access. The follow-up links directly to the paper's PDF.

Mollick extends the question to companies; the cited paper's evidence is about public services. His binary is a useful provocation, while the paper's response map contains several choices and trade-offs within each broad path.

## Angle to test

“Breaking the inherent contracts” is our proposed lens. An institution may formally promise a service while operationally assuming that only a fraction of eligible people will endure the work required to request it. AI can change that participation cost faster than budgets, staffing, rules, or service design change. The resulting queue may reveal an old mismatch between the formal promise and the capacity actually provided. This is an inference to investigate, not terminology or a finding supplied by the paper.

Useful next checks: find a well-documented case with primary volume data; separate valid unmet demand from spam or fraud; ask whose costs were carrying the old system; and identify a concrete redesign that preserves fair access while keeping decisions reviewable.
