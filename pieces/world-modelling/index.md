---
title: "World Modelling"
---

# World Modelling

## The idea

A survey piece about what it means for an AI system to **model a world**. Start with Yann LeCun's JEPA research: learning useful predictions about images and video in an abstract representation, with the longer ambition of predicting consequences and planning actions. Include his more recent work on hierarchical world models, then follow the idea through action-conditioned models, robotics, and systems that generate interactive environments, including Odyssey-3.

The interesting question is what these systems have in common, and what gets hidden when they all receive the same label. Predicting a representation of a future state, controlling a robot, and producing a world that another agent can explore are related ambitions, but they are different capabilities. The piece should show what each system predicts, what actions it can condition on, and how anyone knows whether its predictions remain useful when the world pushes back.

The [Odyssey post](https://x.com/odysseyml/status/2111589148146749616?s=20) is a vivid opening lead: it says a fruit fly brain was placed inside Odyssey-3 and flew through generated worlds. The [screenshot supplied with the idea](research/odyssey-post-2026-10-17.png) preserves the claim. Treat it as a demonstration to investigate, not as proof of a particular brain model, a faithful physical simulation, or autonomous understanding. The method by which the fly model and world model were connected still needs to be established.

## Questions to develop

- What counts as a world model: a predictor of latent states, a video generator, an action-conditioned simulator, or a model useful for planning? Where do these definitions overlap?
- What does JEPA deliberately avoid predicting, and why might an abstract representation help with planning? What does a rendered interactive world add or lose?
- How are actions and observations connected in each system? Can an agent try alternatives internally, act in a generated environment, or transfer what it learned to a physical one?
- How should the survey judge progress: visual coherence, physical consistency, causal response to intervention, long-horizon stability, useful planning, or real-world transfer?
- In the fly demonstration, which brain or controller was used, what sensory information entered it, how did it command motion, and what was independently tested?

## Starting material

- [Initial research leads and claim boundaries](research/starting-points.md)
- [Odyssey post screenshot](research/odyssey-post-2026-10-17.png) and [original post](https://x.com/odysseyml/status/2111589148146749616?s=20)
- [On Intelligence](research/source-material/writing/ideas/on-intelligence/DRAFT_1.md) is related local writing on simulation and world models; a copy is here; the original remains in its source project.

Started directly from the writer's 18 October 2026 idea. It has no intake ID. The linked material is a starting point for research, not a completed survey.

## Original locations

The files above are copies. Their original paths under `/Users/neal/Code/` are:

- [`research/source-material/writing/ideas/on-intelligence/DRAFT_1.md`](research/source-material/writing/ideas/on-intelligence/DRAFT_1.md) ← `writing/ideas/on-intelligence/DRAFT_1.md`
