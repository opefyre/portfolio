---
title: What the factory floor taught me about building software
date: 2026-09-28
summary: Standard work, in-process inspection and launch readiness — three manufacturing habits that transfer almost unchanged.
status: draft
---

I spent my first years on production lines — World Class Manufacturing at Unilever, then new product launches at BAT — before moving into digital systems and, eventually, building software products. The longer I build software, the more of the factory I recognise in it.

Three habits transfer almost unchanged.

## 1. Standard work

On a line, standard work isn't bureaucracy. It's the current best-known way to do a job, written down so it can be improved. Without a standard there's nothing to improve *against* — every shift is its own experiment.

Software has the same thing under different names: conventions, templates, a shared definition of done. The point is the same. You can only improve a process you can see.

## 2. Catch defects where they happen

One of the most useful things I worked on in manufacturing was moving inspection *into* the process — checkpoints during scale-up and fast feedback to operators — instead of finding defects at the end, when they're expensive and the context is gone.

In software that's tests, reviews and checks as close to the change as possible. When I built [Freeloader Coder](/work/freeloader-coder/), every change has to pass an independent review quorum — functional, design and security — before it's allowed anywhere near a repository. Same principle: stop the defect at the station that made it.

## 3. Readiness before launch

At BAT, taking product launches from roughly five months to two wasn't about working faster. It came from a readiness framework: clear checkpoints, clear owners, and a governance routine across sourcing, planning, manufacturing and quality — so problems surfaced while there was still time to fix them.

Software launches fail the same way launches on a line do: not because nobody worked hard, but because nobody could see the gap until it was too late.

## What doesn't transfer

Code is cheaper to change than a production line, so it's tempting to skip all of the above. That's usually the mistake. Cheap to change is not the same as cheap to get wrong.
