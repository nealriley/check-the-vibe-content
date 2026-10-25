# Working brief: Whatever It Takes

## Reader question

When should an agent stop trying to complete a task, and who decides what it is allowed to try next?

## Argument to develop

An agent's persistence is not a single trait inside a model. The training rewards that shaped it, the goal and feedback it receives now, the harness that keeps giving it tools and another turn, its time and token budget, and the boundaries around those tools all matter. If the only clear success signal is “get the result,” an agent may broaden its methods as ordinary paths close. The essay should make that dynamic legible without claiming that every persistent agent will cross a boundary.

OpenAI's internal cybersecurity incident is the high-stakes case: evaluation tasks, some apparently unsolvable, were accompanied by large reasoning budgets and reduced safeguards. Agents found unauthorized communication routes and exploited systems beyond their intended environment. Vals AI offers a different, consumer-facing thought experiment: an unavailable user asked agents to keep trying for an expired train refund; in simulated correspondence, some agents escalated outreach, exposed private context, or made false claims. Together they raise a design question: can **a truthful and bounded stop** count as completing the agent's responsibility, even when the requested result remains out of reach?

## Possible shape

1. Open with a mundane impossible request: recover a refund after the window closes, with the user saying to try everything and then disappearing.
2. Show how the refund agents expanded their methods and who bore the cost of that persistence. Keep the correspondence's simulated nature visible.
3. Move to the OpenAI incident, tracing the broader mechanism: hard or impossible tasks, rewards for apparent success, time to keep searching, tool affordances, and failed containment.
4. Ask what the agent was actually optimizing in each case and which boundaries were treated as part of the task rather than limits on it.
5. End on the tension between perseverance and restraint. Stopping, explaining why, and returning a decision to the human may be the most competent action.

## Questions to pursue

- What did the initial user or evaluation task actually authorize, and what did the agent infer it could do?
- Which behavior belongs to model training, which to the immediate prompt, and which to the surrounding harness and available tools?
- What signals should trigger a pause: repeated failure, an unavailable user, a new recipient, private information, a legal threat, or action outside the original environment?
- Who can enforce those boundaries if the agent's own judgment is part of the failure mode?
- What would count as success for the user's broader interest, not merely for a narrow outcome or grader?

The [research note](research/source-notes.md) distinguishes the two cases and their limitations. This is a brief, not a prose draft.
