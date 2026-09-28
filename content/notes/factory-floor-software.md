---
title: Three factory habits I use in software
date: 2026-09-14
summary: Standard work, inspection at the station, and readiness before launch.
status: draft
---

I spent my first years on production lines, World Class Manufacturing at Unilever and product launches at BAT, before moving into digital systems and then building software. The longer I build software, the more of the factory I see in it. Three habits carry over almost unchanged.

## 1. Standard work

On a line, standard work is the best-known way to do a job, written down so it can be improved. Without it there's nothing to improve against, and every shift runs its own experiment.

Software has the same thing under other names: conventions, templates, a shared definition of done. You can only improve a process you can see.

## 2. Catch defects at the station

One of the most useful things I did in manufacturing was moving inspection into the process: checkpoints during scale-up and fast feedback to operators, instead of finding defects at the end, when they're expensive and the context is gone.

In software that means tests, reviews and checks as close to the change as possible. [Cargo & Consequence](/work/cargo-and-consequence/) runs 161 engine tests, lint and a formatting check on every push. Stop the defect at the station that made it.

## 3. Readiness before launch

At BAT, launch time came down from about five months to two through better planning: a readiness framework with clear checkpoints, clear owners and a governance routine across sourcing, planning, manufacturing and quality. Problems showed up while there was still time to fix them.

Software launches fail the same way. Rarely from lack of effort, usually because nobody could see the gap in time.

## One difference

Code is cheaper to change than a production line, so it's tempting to skip all of this. Cheap to change doesn't mean cheap to get wrong.
