---
title: Poka-yoke explained: stop the mistake where it happens
date: 2026-10-14
summary: A cover can be fitted backwards. A reminder, a final check and a shaped fixture respond at different points. See what mistake-proofing prevents, what it detects and what remains unchecked.
seoTitle: Poka-yoke: mistake-proofing with worked examples
seoDescription: Understand poka-yoke through a simple assembly example. Compare prevention, detection and warnings, then check which mistakes each control can actually catch.
status: published
topic: Continuous improvement
keywords: poka yoke meaning, mistake proofing examples, poka yoke vs inspection, error proofing, prevention vs detection
---

A cover fits in two directions. Only one is correct. After another reversed cover reaches the end of the line, the team adds a larger instruction beside the station.

The instruction explains the right direction. The part still fits both ways.

**Poka-yoke means mistake-proofing: changing a product or process to prevent a particular mistake, or detect it so it can be corrected before it passes on.** A shaped connector that fits only the right way is a familiar example. A check that stops the next step when a part is missing is another.

[Lean Enterprise Institute](https://www.lean.org/lexicon-terms/error-proofing/) describes these methods as ways to help operators avoid mistakes. The aim is to improve the conditions of the work, rather than depend on someone remembering an extra warning every time.

## Prevention, detection and a warning do different work

Our fictional assembly station fits a cover and a washer to a bracket. A backwards cover is visible from an external orientation mark. The washer becomes hidden once assembly is complete. A wrong material grade can look identical to the correct part.

Consider these responses to the backwards cover:

| Response | What changes | When it acts | What still depends on a person or another check? |
| --- | --- | --- | --- |
| Add an instruction | Explains the correct orientation | Before and during assembly | The person must notice and apply it; wrong orientation is still physically possible |
| Inspect the external mark | Can identify an assembled cover pointing the wrong way | After assembly | The check must be performed correctly, followed by a hold and correction |
| Use a keyed locating nest | Wrong orientation cannot seat in the defined fixture | Before fastening | The fixture must be correct, intact and used as intended |

The second response may protect the next process from a reversed cover. The third changes whether that particular assembly mistake can happen in the fixture at all.

A warning light is different again. It can draw attention to a detected condition, but the response still needs to happen. An interlock makes a defined next action unavailable until its condition is satisfied. Both need testing; an alarm and a stop aren't interchangeable.

[ASQ's poka-yoke definition](https://asq.org/quality-resources/quality-glossary/p) includes prevention and identification of errors. That is why it helps to describe the actual action instead of calling every control “mistake-proof”.

## Check the failure each device actually covers

Now add a washer-presence interlock. In this conceptual example, it checks for a washer before fastening and prevents that cycle if the washer is absent. It doesn't inspect cover direction or material grade.

The keyed nest prevents a reversed cover from seating. It doesn't check for the washer, and a wrong-grade cover with the same shape still fits.

Use the visual to trace each mistake through these separate controls. They are alternatives shown individually, not a complete combined station design.

::interactive poka-yoke-coverage | Fictional assembly and conceptual controls, considered separately. A functioning keyed nest blocks the stated reversed-cover condition; a functioning presence interlock stops fastening without the washer. The external visual check can reveal the orientation mark after assembly. These are declared coverage assumptions, not measured detection rates or a validated equipment design.

Choose “wrong material grade” and all three show a gap. The parts have the same appearance and geometry, so the checks described here have nothing that distinguishes them.

That gap needs a separate response tied to the actual material requirement. It might involve verified part identity and traceability, with an appropriate material check where required. Adding another orientation mark wouldn't answer it.

The [FMEA example](/notes/fmea-step-by-step/) provides a way to list failure modes, effects and current controls. Keep each control beside the failure it addresses. “Poka-yoke installed” is too broad to describe its coverage.

## Final inspection still has a purpose

Inspection can detect defects and support a hold before goods pass on. It also provides evidence while the team investigates a problem. None of that means the earlier mistake has stopped occurring.

If every reversed cover is caught and corrected at the end, the shipment may be acceptable while the assembly process still needs rework. The [first-pass yield article](/notes/first-pass-yield-vs-final-yield/) separates a clean first attempt from a successful correction later.

For our cover, the keyed nest targets orientation earlier. The team still needs to check washer presence, material identity and any other product requirements. One successful prevention device doesn't make the whole product correct.

Vrolen's [first-pass yield and rework guide](https://vrolen.com/blog/first-pass-yield-rework/) follows a separate production ledger. It is useful when the team needs to keep recovered output visible while measuring how often work needed correction.

## Test the normal case and the wrong case

Before relying on the nest, the process owner needs evidence that a correct cover seats properly and the stated wrong orientation doesn't. That check belongs in an appropriate engineering review and trial, using a controlled method that keeps test parts out of released output.

Also consider the product versions, wear, changeovers and operating conditions the device is expected to handle. A nest made for one version can be wrong for the next. A washer sensor can fail, drift or respond to something other than the washer it is meant to check.

Define what happens when a control is unavailable or fails its check. The normal production response should be clear before the first fault. A requirement to test the control also needs an owner and a record; the label on the device isn't that record.

The [PDCA note](/notes/pdca-cycle-example/) explains how to compare the expected result of a change with what a trial actually shows. Keep the trial small enough to examine the failure cases, rather than judging it only by a run of good parts.

:::link https://www.youtube.com/watch?v=p5687M5EoGM | Watch Vrolen's PDCA worked example
The video uses a separate improvement example. Its plan, trial, check and follow-up sequence is useful when deciding what evidence a proposed mistake-proofing change needs.
:::

## Make the control part of the work

Once a change is accepted, update the [standard work and operating procedure](/notes/standard-work-vs-sop/) to show how the device is used, checked and maintained. Include what the team does when it finds a problem.

For our station, the next review should name the failure precisely: reversed cover, missing washer or wrong grade. Then show where the current control acts and what evidence demonstrates that action.

A keyed fixture can solve the first problem while leaving the other two untouched. Knowing that boundary is part of making the improvement useful.

## Sources and example notes

- [Lean Enterprise Institute: Error-Proofing](https://www.lean.org/lexicon-terms/error-proofing/). Purpose and examples involving orientation, missing parts and part selection.
- [ASQ: Poka-yoke and prevention versus detection](https://asq.org/quality-resources/quality-glossary/p). Definitions of mistake-proofing and the different functions of prevention and detection.
- [ASQ: Mistake proofing](https://asq.org/quality-resources/quality-glossary/m). Preventing mistakes or their passage downstream; terminology can vary.

The assembly and control behaviour are fictional. The visual shows intended coverage, not measured detection rates or a validated equipment design.
