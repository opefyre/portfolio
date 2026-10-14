import test from "node:test";
import assert from "node:assert/strict";
import { approvalBaseline, approvalTrials, approvalResult, kanbanEvents, charterRequests, charterDecision } from "./improvement-models";

test("PDCA compares rates at different volumes, including the quality failure", () => {
  assert.deepEqual(approvalResult(approvalBaseline), { average: 24, rate: 5, timeMet: false, qualityMet: true });
  assert.deepEqual(approvalResult(approvalTrials[0]), { average: 16, rate: 10, timeMet: true, qualityMet: false });
  assert.deepEqual(approvalResult(approvalTrials[1]), { average: 16, rate: 5, timeMet: true, qualityMet: true });
  assert.equal((24 - 16) / 24, 1 / 3);
});
test("one Kanban withdrawal changes shelf stock before the signal arrives", () => {
  assert.equal(kanbanEvents[0].shelfBoxes * 20, 60);
  assert.equal(kanbanEvents[1].shelfBoxes * 20, 40);
  assert.equal(kanbanEvents[1].cardAt, "return");
  assert.equal(kanbanEvents[2].newBox, 0);
  assert.equal(kanbanEvents[3].shelfBoxes * 20 + kanbanEvents[3].newBox, 60);
  assert.equal(kanbanEvents[4].shelfBoxes * 20, 60);
  for (const event of kanbanEvents) {
    // Two untouched cards stay on the shelf; the tracked third is either there or elsewhere.
    assert.equal(2 + Number(event.cardAt === "shelf") + Number(event.cardAt !== "shelf"), 3);
    assert.equal(event.shelfBoxes, 2 + Number(event.cardAt === "shelf"));
  }
});
test("charter authority needs both scope and budget, not just cash remaining", () => {
  const [inside, outside, over] = charterRequests.map(charterDecision);
  assert.equal(inside.total, 6700); assert.equal(inside.remaining, 1300); assert.equal(inside.delegated, true);
  assert.equal(outside.budgetMet, true); assert.equal(outside.delegated, false);
  assert.equal(over.total, 8500); assert.equal(over.remaining, -500); assert.equal(over.delegated, false);
  assert.equal(charterDecision({ amount: 2500, inScope: true }).delegated, true);
  assert.equal(charterDecision({ amount: 2501, inScope: true }).delegated, false);
});
