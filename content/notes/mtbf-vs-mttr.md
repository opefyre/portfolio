---
title: MTBF vs MTTR: formulas, differences and worked examples
date: 2026-10-15
summary: Two machines each lose 20 hours. One fails ten times; the other fails twice. Work through MTBF and MTTR to see why the same downtime needs a different investigation.
seoTitle: MTBF vs MTTR: formulas and worked examples
seoDescription: Calculate MTBF and MTTR for two machines with the same downtime. Compare failure frequency, restoration time and the event records behind each number.
status: published
topic: Operational excellence
keywords: MTBF vs MTTR, MTBF formula, MTTR calculation, mean time between failures, mean time to repair, manufacturing reliability
---

**MTBF means mean time between failures: operating time divided by the number of failures. MTTR commonly means mean time to repair: the time counted for repairs or restoration divided by the completed events.** Agree where the second clock starts and stops: teams count repair and recovery time differently.

Both machines lost 20 hours last week. The downtime report puts them on the same line, with the same result.

The shift teams remember different weeks. Machine A kept stopping. Machine B failed only twice, but each recovery took much longer.

Together, the measures separate how often equipment fails from how long it stays unavailable. [IBM's comparison](https://www.ibm.com/think/topics/mttr-vs-mtbf) sets out both calculations. Agree what counts as a failure and a completed repair before comparing the numbers.

## MTBF and MTTR formulas: calculate both from one period

Our fictional machines each have a 100-hour production window. Each runs for 80 hours and spends 20 hours stopped because of equipment failures. There are no other stop categories in this example, and every failure is restored within the window.

We count a failure when the machine loses its required operating function. Its restoration clock ends when it has been repaired, checked and returned to production. Waiting for help or parts stays inside that clock.

| Measure | Machine A | Machine B |
| --- | ---: | ---: |
| Operating time | 80 hours | 80 hours |
| Failures | 10 | 2 |
| Total stop-to-restoration time | 20 hours | 20 hours |
| MTBF | 80 ÷ 10 = 8 hours | 80 ÷ 2 = 40 hours |
| MTTR, using our restoration clock | 20 ÷ 10 = 2 hours | 20 ÷ 2 = 10 hours |

Using the full 100 hours in the MTBF numerator would include the time the machine wasn't operating. A would appear to have ten hours between failures instead of eight.

[NIST's reliability handbook](https://itl.nist.gov/div898/handbook/apr/section4/apr451.htm) uses total operating time divided by failures to estimate MTBF under its stated model. Here we're describing this observed window, rather than forecasting the next failure.

MTBF is an average, not an appointment for the next breakdown or a machine's guaranteed lifespan. With no observed failures, report the operating exposure and zero failures; dividing by zero doesn't give evidence of infinite reliability.

## MTBF vs MTTR example: same downtime, different failures

Both machines were running for 80% of the window. That common result hides A's ten interruptions and B's two long recoveries.

The timelines below make the difference visible. Change A's failure count while keeping its 80 operating hours and 20 restoration hours fixed. This redistributes the same loss; it doesn't simulate an improvement.

::interactive failure-patterns | Fictional 100-hour windows: each machine runs for 80 hours and needs 20 restoration hours. The control redistributes A's fixed totals. Events are evenly spaced to explain the averages; rust intervals include waiting, repair and restart checks.

A needs investigation of the repeated failures. Are the stops the same fault returning, several unrelated problems, or repeated resets that haven't dealt with the cause?

For B, break down each long recovery. The long interval might involve diagnosis, a difficult repair, waiting for a spare or a delay before someone confirms the machine can run again. The ten-hour average doesn't identify which.

## What time should MTTR include?

Suppose one of B's fictional ten-hour events contains six hours waiting for a spare, three hours repairing and one hour checking the restart.

::figure restoration-clock | Fictional breakdown of one ten-hour recovery on machine B. Six hours waiting, three repairing and one checking the restart. The full interval belongs in the restoration measure used here; active repair alone would describe a different clock.

If maintenance reports three hours of hands-on repair while production reports ten hours lost, both may be describing the same event correctly. The labels need to say which interval was measured.

Ordering a spare in advance might shorten the waiting. A different diagnostic approach might shorten the repair. Neither follows automatically from an MTTR target, and rushing the restart checks would change the process we're trying to maintain.

Vrolen's [MTBF and MTTR guide](https://vrolen.com/blog/mtbf-vs-mttr-oee/) goes further into calculating the measures from a failure log. Use its separate example to check how event records become the totals, rather than mixing its numbers into these two machines.

## Check the records before comparing teams

Use the same asset boundary and failure rule. A short reset counted as a failure on one line shouldn't disappear below another line's recording threshold. Also separate a machine's own failure from waiting caused by a stopped neighbour.

Record the stop, response, repair and return-to-production times where they answer different questions. Agree how to count a recovery still in progress at the reporting cutoff. Mixing its unfinished duration with a count of completed repairs would distort the average.

The [OEE note](/notes/same-oee-opposite-fixes/) puts downtime beside speed and quality losses. MTBF and MTTR describe part of that operating picture. They don't establish good output, customer service or the best maintenance investment on their own.

## Use the pattern to choose the next investigation

Start with A's recurring events and B's longest recoveries. For a repeated fault, the [5 Whys example](/notes/5-whys-example/) shows how to test an explanation before settling on a fix. For a long recovery, compare where the time actually went before asking technicians to work faster.

Keep the failure count, operating hours and restoration breakdown beside each proposed action. Record which part the work should change, then check that part after the change has been tried.

## Sources and example notes

- IBM. [MTTR vs MTBF](https://www.ibm.com/think/topics/mttr-vs-mtbf). Formulas, repairable equipment and repair/recovery clock boundaries.
- NIST/SEMATECH. [Constant repair-rate model](https://itl.nist.gov/div898/handbook/apr/section4/apr451.htm). Operating exposure, MTBF estimation and the need for model assumptions when making reliability inferences.

The machines and event records are fictional. The chart spaces the events evenly while preserving the stated operating and restoration totals.
