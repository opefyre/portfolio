---
title: Building without paying for APIs
date: 2026-09-28
summary: What building Freeloader Coder taught me: route the work, never let one model grade itself, and cap what the agent can do.
status: draft
---

[Freeloader Coder](/work/freeloader-coder/) started from one constraint: an autonomous coding workspace that turns a product request into planned, tested, reviewed code, without an unpredictable bill for model APIs. That constraint shaped most of the design.

## Route the work

No free model is good at everything, so the workspace doesn't depend on one. Work is routed across local models and free tiers (Groq, Cloudflare, Gemini, OpenRouter), and paid providers only where they're worth it. Any single model can be swapped out.

## Never let one model grade its own work

The usual failure of coding agents: one model writes the code and the same model decides it's fine. Here every change goes to a quorum of three independent reviewers, for function, design and security, and only moves forward when the quorum passes.

## Cap the self-healing

An agent that fixes its own failures is useful. One that keeps trying forever is not. Self-healing has a fixed retry budget, and it can never widen its own permissions to get unstuck.

## A person approves anything external

Integrations use least-privilege scopes, OAuth with PKCE and a local secret vault. Anything written outside the workspace, to GitHub or Jira, needs my approval first.

The money constraint ended up giving me control: I know what the system will do, what it's allowed to do, and what it costs before it runs.
