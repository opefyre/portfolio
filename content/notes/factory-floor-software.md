---
title: Three factory habits I use in software
date: 2026-09-14
updated: 2026-10-23
summary: Standard work, inspection at the station, and readiness before launch.
status: draft
topic: Digital transformation
seoTitle: Three factory habits I use in software
seoDescription: How standard work, inspection during the process and launch readiness carry over from manufacturing to software, with examples from my own work.
---

I spent my first years on production lines, World Class Manufacturing at Unilever and product launches at BAT, before moving into digital systems and then building software. The longer I build software, the more of the factory I see in it. Three habits carry over almost unchanged.

## 1. Standard work

On a line, standard work is the best-known way to do a job, written down so it can be improved. Without it there's nothing to improve against, and every shift runs its own experiment.

In software, shared conventions, templates and a definition of done give the team a reference for checking a change.

## 2. Catch defects at the station

One of the most useful things I did in manufacturing was moving inspection into the process: checkpoints during scale-up and fast feedback to operators, instead of finding defects at the end, when they're expensive and the context is gone.

In software that means tests, reviews and checks as close to the change as possible. [Cargo & Consequence](/work/cargo-and-consequence/) runs 161 engine tests, lint and a formatting check on every push. Stop the defect at the station that made it.

## 3. Readiness before launch

At BAT, launch time came down from about five months to two through better planning: readiness checks, named owners and regular decisions across sourcing, planning, manufacturing and quality. Problems showed up while there was still time to fix them.

Before a software launch, I use the same readiness checks to expose missing work while the team can still respond.

## One difference

Before releasing a software change, check the affected workflow, its tests and the people responsible for support. Resolve any missing prerequisite before committing the release date.
