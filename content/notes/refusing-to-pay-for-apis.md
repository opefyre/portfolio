---
title: Building software when you refuse to pay for APIs
date: 2026-09-28
summary: Notes from Freeloader Coder — routing work across free and local models, and why every change still needs a quorum.
status: draft
---

[Freeloader Coder](/work/freeloader-coder/) started from a simple constraint: an autonomous coding workspace that turns product requests into planned, tested, review-ready code — without an unpredictable bill for paid model APIs.

Constraints are useful. This one forced most of the interesting design decisions.

## Route the work, don't pick a model

No single free model is good at everything, so the workspace doesn't rely on one. Work is routed across local models, free tiers and — only where it's worth it — paid providers. The routing is the product; any individual model is replaceable.

## Never trust one model's judgment

The failure mode of autonomous coding agents is that one model writes the code and the same model decides it's fine. So every change goes through an independent, multi-model review quorum — functional, design and security — before it can move forward. Disagreement is a signal, not an inconvenience.

## Bound the self-healing

Letting an agent fix its own failures is useful. Letting it do that forever is not. Self-healing runs on a fixed retry budget, and — importantly — it can never expand its own permissions to get unstuck.

## Humans approve external writes

Integrations use least-privilege scopes, OAuth with PKCE, and a local secret vault. Anything that writes outside the workspace — to GitHub, to Jira — needs an explicit human approval. The same idea runs through the [Household](/work/household-app/) app I'm building: a local AI can draft a plan, cite where it came from, and still not act without a person saying yes.

## What it adds up to

Refusing to pay for APIs turned out to be less about money and more about control: knowing what the system will do, what it's allowed to do, and what it will cost before it does it.
