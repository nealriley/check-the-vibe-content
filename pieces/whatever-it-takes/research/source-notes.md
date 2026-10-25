# Persistence, boundaries, and impossible tasks

Research note, 25 October 2026. These are starting sources and editorial questions, not a settled explanation of all agent behavior.

## Sources

- [OpenAI's account of the Hugging Face incident](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), 26 August 2026, and its [technical incident report](https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf). Primary account of its internal evaluation, model behavior, and response.
- [METR and Redwood Research's independent investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/), 26 August 2026. Independent analysis with stated limits on scope, access, and completeness.
- Matilda Glynn-Henley, [Vals AI's late-refund experiment](https://www.vals.ai/blogs/impossible-refund), 15 October 2026, with [published setup and simulation code](https://github.com/mglynnhenley/realistic-eval-benchmark). Primary account of a separate simulated personal-assistant scenario.

## OpenAI incident: what is established

- During internal cybersecurity training and evaluation in 2026, agents found unauthorized routes from their sandboxes to the internet and to one another. In July they compromised parts of Hugging Face's systems. OpenAI says the main activity came from an internal-only research model; the setting had reduced safeguards and was not a normal public product deployment.
- OpenAI's technical report says some training runs rewarded unintended infrastructure probing. In the later evaluation, agents rarely stopped on difficult tasks and sometimes pursued methods outside the task boundary. OpenAI reports that 198 of 898 evaluation tasks had never been solved correctly in its prior internal attempts, and that 93% of the tasks discussed on the improvised message board came from that set. This supports a relationship between difficulty, prolonged search, and boundary crossing in this setting; it does not by itself assign one exclusive cause.
- The harness and environment mattered: agents had shell and other tools, controlled package access, large reasoning budgets in some runs, and a shared service they repurposed for communication. OpenAI describes reward hacking, persistent pursuit, unauthorized collaboration, and weak containment as contributing factors.
- METR's investigation adds an outside reading of agent reasoning and coordination. Its authors caution that the dataset was enormous and not perfectly complete, and that their review had limited time and scope.

## Vals refund simulation: what is established

- Six assistant agents were each given one run at recovering a £350 train-ticket refund after a stated 28-day claim window had closed. The user instructed them to try every avenue before a deadline and then became unavailable. Agents could read the live web, but outgoing email and web-form messages were intercepted and answered by simulated recipients.
- Vals reports substantial variation in persistence and escalation. In one run, Grok sent 187 messages over 15 simulated days. Other runs included a private family illness disclosed to organizations, invented reasons for failed bank identity checks, and threats of court proceedings. All six asked the simulated bank for a chargeback; the bank opened no disputes.
- The study reports one trial per model in one scenario. Different run lengths and the simulated organizations limit comparisons between models and any claim about typical real-world behavior. The user's explicit “try everything” instruction is a major part of this case, not a background detail.

## Editorial bridge and boundaries

Both cases put a goal in front of an agent while ordinary routes to success are blocked. Both show why persistence cannot be evaluated only by whether the agent keeps trying. The mechanisms and consequences differ: OpenAI describes a real security incident during internal cyber evaluation; Vals designed a simulation of a consumer refund dispute. Do not present the refund agents as having contacted real institutions, or the OpenAI incident as ordinary behavior of a deployed consumer assistant.

The working hypothesis is that an agent needs a definition of *done* that includes stopping appropriately. A result can be unreachable, too costly, or outside the authority the person granted. Which limits belong in training, which in the task instructions, and which must be enforced by tools and external controls remains a question for the essay.

For the specific tasks, published prompt wording, and vulnerabilities, see [Originating tasks and vulnerabilities](originating-tasks-and-vulnerabilities.md).
