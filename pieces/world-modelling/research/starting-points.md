# World Modelling — initial research leads

Research snapshot: 18 October 2026. These notes establish useful distinctions and source leads for the proposed piece; they are not a comprehensive review. Recheck dated claims before drafting.

## Three different claims under one name

1. **Predict in an abstract space.** In [LeCun's JEPA proposal](https://ai.meta.com/blog/yann-lecun-advances-in-ai-research/), a predictor learns relationships between representations of inputs rather than reconstructing every visible detail. Meta's [V-JEPA explanation](https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/) describes video prediction in this representation space and calls the 2024 system an early, limited physical world model. This is a research direction toward planning, not a generated environment someone can enter.
2. **Use prediction to plan an action.** The [V-JEPA 2 paper](https://arxiv.org/abs/2506.09985) reports an action-conditioned version used for image-goal robot planning after training on video and robot trajectories. The [V-JEPA 2.1 paper](https://arxiv.org/abs/2603.14482) reports further work on spatially and temporally detailed visual representations and robot tasks. These are the authors' experimental results; inspect tasks, baselines, and failure cases before making broader capability claims.
3. **Generate a responsive environment.** Odyssey describes [Odyssey-3](https://odyssey.systems/meet-odyssey-3) as an action-conditioned, autoregressive diffusion video model that can extend a scene as a person or agent acts. Its [earlier technical overview](https://odyssey.systems/introducing-odyssey-3) also describes using the model as a basis for policies in robots, vehicles, drones, and games. These are company descriptions and demonstrations; assess physical accuracy and transfer separately from visual plausibility.

For LeCun's more recent research, read [LeWorldModel](https://arxiv.org/abs/2603.19312) (March 2026) and [H-JEPA](https://arxiv.org/abs/2610.06805) (October 2026). The latter studies hierarchical representations and planning across time scales. These papers keep the LeCun thread current; their reported gains are tied to the tasks and evaluation settings in the papers.

Other model-based reinforcement learning and simulator work should be considered so the piece does not present JEPA and Odyssey as the only approaches.

## The fly post: a lead with an open method

The [17 October Odyssey post](https://x.com/odysseyml/status/2111589148146749616?s=20), preserved in the [writer-supplied screenshot](odyssey-post-2026-10-17.png), says the company placed a fruit fly brain inside Odyssey-3 and shows a short generated-world clip. Direct access to X was unavailable during this first pass. Odyssey's published Odyssey-3 pages describe agent interaction and generated environments, but this pass did not find an accompanying technical account of the fly demonstration.

Do not infer from the post alone that it used a particular connectome, that the fly's motion was driven by a full brain simulation, or that its behaviour demonstrates reliable world physics. [Eon's embodied fruit fly write-up](https://eon.systems/updates/embodied-brain-emulation) documents a separate connectome-based brain-and-body simulation; it is context, not evidence of Odyssey's implementation. Find Odyssey's method, collaborators, control loop, and evaluation before treating the clip as a technical result.

## Evidence questions for the eventual survey

- What state does each model predict, at what time horizon, and with what action input?
- Is the evaluation open-loop prediction, closed-loop interaction, planning success, or performance after transfer to the physical world?
- Does a generated environment preserve objects and respond consistently to intervention, or is it chiefly a plausible stream of images?
- Which results have a paper, released code, independent replication, or only a company demonstration?
