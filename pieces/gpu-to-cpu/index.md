---
title: "(G/C)PU"
---

# (G/C)PU

## The idea

An essay about the point at which an AI system should stop improvising a familiar step and turn it into something repeatable: automation, a script, or ordinary code. The system might use flexible model-based work to explore an uncertain task, identify a useful pattern, and handle exceptions. Once the pattern is understood, it can move the stable part into a narrower procedure that is easier to run, test, and inspect. The question is how quickly to make that move without freezing a process before it is understood.

**GPU → CPU** is the working metaphor: flexible but less predictable AI work giving way to more specified and repeatable execution, with less room to adapt on the fly. It is a metaphor for *kinds of work*, not a claim that models always run on GPUs, that scripts always run on CPUs, or that code is automatically correct or deterministic.

## Questions to develop

- What signals show that a model-assisted step has become stable enough to specify as code: repetition, clear inputs and outputs, known exceptions, tests, or a measurable cost of variation?
- Which parts should remain flexible because inputs or goals still change? Can a workflow use ordinary code for the routine path and call on AI only for ambiguous cases?
- What is actually gained by the move: reliability, speed, cost, auditability, control, or easier correction? Which gains need evidence rather than assumption?
- How does a system discover and maintain the boundary between the repeatable procedure and the exceptional case? When should it move a step back toward flexible reasoning?
- What worked example could trace one task from exploratory AI use to a tested script or automation, including what the narrower procedure can no longer handle?

## Related local work

- [You Don't Always Need MCP](research/source-material/writing/ideas/you-dont-always-need-mcp/README.md) compares agents, scripts, commands, APIs, and other integration choices. That project asks which boundary to use; this piece asks when work can move from model judgment into a repeatable procedure.
- [Practical agent workflows](research/source-material/what-is-an-agent/research-pack/definition-history/practical-agent-workflows-2026.md) discusses bounded jobs, verifiable outcomes, and using ordinary automation for fixed sequences. It is background material, not evidence that every successful agent workflow should become code.

Started directly from the writer's 18 October 2026 idea. It has no intake ID; the related files remain in their original locations.

## Original locations

The files above are copies. Their original paths under `/Users/neal/Code/` are:

- [`research/source-material/writing/ideas/you-dont-always-need-mcp/README.md`](research/source-material/writing/ideas/you-dont-always-need-mcp/README.md) ← `writing/ideas/you-dont-always-need-mcp/README.md`
- [`research/source-material/what-is-an-agent/research-pack/definition-history/practical-agent-workflows-2026.md`](research/source-material/what-is-an-agent/research-pack/definition-history/practical-agent-workflows-2026.md) ← `what-is-an-agent/research-pack/definition-history/practical-agent-workflows-2026.md`
