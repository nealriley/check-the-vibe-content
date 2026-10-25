# Synthetic shoppers and willingness to pay

Research note, 25 October 2026. Source: Sebastian Oetzel and Tobias Maiberger, [“How price sensitive is AI? Benchmarking LLM-generated willingness to pay in pricing analytics”](https://doi.org/10.1057/s41270-026-00542-7), *Journal of Marketing Analytics* (2026). The [original PDF](https://link.springer.com/content/pdf/10.1057/s41270-026-00542-7.pdf) is also saved [locally](oetzel-maiberger-2026-willingness-to-pay.pdf) for work in Codespaces. The authors publish it under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); the local PDF is unchanged.

## What the study asks

Can LLM-generated synthetic respondents estimate what real consumers would pay well enough to support pricing decisions? This is a study of **simulated buyers as market-research inputs**. It does not observe personal shopping agents browsing, negotiating, or spending on a user's behalf.

## Method and findings

- The authors ran four studies of inexpensive goods: Dubai-style chocolate, a bio energy ball, a reusable glass bottle, and earplugs. They elicited willingness to pay from 387 people recruited on one German university campus. Under the Becker–DeGroot–Marschak procedure, a participant could be required to buy at a randomly drawn price if it was no higher than the amount they stated. The authors made one synthetic respondent for each participant using demographic and product-specific information (Methods, pp. 5–7).
- Studies 1–3 used the standard ChatGPT-4 interface; study 4 used GPT-4o through an API. The synthetic answers were not calibrated to the human data. The authors compared means, distributions, modeled demand, and prices implied under assumed costs and market size (Methods and Results, pp. 6–12).
- Mean synthetic willingness to pay was **86% higher** for the chocolate, **37% higher** for the energy ball, **about 3% higher** for the bottle (not a statistically significant mean difference), and **27% lower** for the earplugs. Real and synthetic response distributions differed significantly for **all four** products (Table 3 and distributional analysis, pp. 7–8).
- The bottle is the clearest editorial example: nearly matching averages concealed a different distribution, and the modeled profit-maximizing price from synthetic responses was roughly **20% lower** than the one from human responses across the authors' markup assumptions. The study's profit figures are **model forecasts**, not observed merchant earnings (pricing analysis, Tables 6–7, pp. 9–12).
- Some prompts gave the model a numerical price range that human participants did not see. An additional analysis found that removing that information changed synthetic results, but not consistently across products. The authors therefore urge testing prompt robustness and validating consequential pricing decisions against human data (sensitivity analysis and discussion, pp. 11–13).

## Use in this piece

This is a useful check on claims that an AI can reliably speak for consumer demand merely because its answers sound plausible. If agentic commerce gives intermediaries or merchants new tools to simulate shoppers and optimize prices, the inputs to those decisions need scrutiny as well as the transactions themselves. The paper supports that narrower point. It does **not** show that real shopping agents misjudge their users' preferences, that Universal Cart uses synthetic respondents, or that any deployed merchant has changed prices on this basis.

The study's reach is limited by four low-cost products, a student sample at one university, prompt differences between conditions, and a different model/access method for the earplugs study. The hedonic-versus-utilitarian pattern is descriptive across these four cases, not proof that product type caused the difference. Recheck model and market context before using it as a broad claim about agentic commerce.
