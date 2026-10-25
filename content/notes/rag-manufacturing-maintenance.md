---
title: RAG in manufacturing: a maintenance guide
date: 2026-10-25
summary: Understand RAG through a maintenance-document example. Check the retrieved passage, procedure revision and authority behind a generated answer.
seoTitle: RAG in manufacturing: a maintenance guide
seoDescription: Understand RAG through a maintenance-document example. Check the retrieved passage, procedure revision and authority behind a generated answer.
status: published
topic: Industrial AI
keywords: RAG manufacturing maintenance, RAG for maintenance, retrieval augmented generation manufacturing, RAG for beginners
---

Retrieval augmented generation, or RAG, gives a language model relevant material to use when producing an answer. A document assistant retrieves passages first, then generates a response using that context.

The retrieved evidence can make the answer easier to check. It does not guarantee that the answer is correct or that the document is current.

[Microsoft's RAG documentation](https://learn.microsoft.com/azure/ai-studio/concepts/retrieval-augmented-generation) separates retrieval from generation. In maintenance work, the operating question is whether the assistant found the applicable instruction and preserved its conditions.

## Follow an answer back to its passage

The [DMAIC Note](/notes/dmaic-step-by-step/) contains a fictional filling-line control plan. Its target-setting row specifies 503 g and says that changes need approval.

Consider how a document assistant should handle that row. An answer quoting the target while omitting the approval condition would lose part of the instruction. A fluent response would not repair that omission.

The 503 g setting belongs to that fictional process. Use the actual approved instruction when reviewing an answer for a real line.

::figure aici-rag-evidence | The answer must remain connected to the applicable source passage, including its restrictions. The excerpt comes from the fictional DMAIC control plan.

| Check | What the reviewer needs |
| --- | --- |
| Retrieval | The passage relevant to the question, not merely a related document |
| Applicability | Equipment, process and operating conditions covered by that instruction |
| Revision | The approved version and its effective status |
| Answer | The target and any approval, exception or escalation conditions |
| Action | The technician's authority under the actual operating procedure |

## Keep obsolete and restricted documents out of the answer

A search index can retain an old procedure after the source system changes. Define how updates and withdrawals reach the index, and how the application handles conflicting passages.

Apply access controls to retrieval as well as to the final screen. The [RBAC guide](/notes/role-based-access-control-explained/) explains permission boundaries; a user should not receive restricted content through a generated summary that they could not open directly.

A citation needs enough information to reach the applicable revision. Linking only to a general manual homepage makes the answer harder to verify.

## Test retrieval separately from wording

Retain representative questions and the passages that should support their answers. Check whether the retriever finds those passages before evaluating the generated wording.

Include questions the available documents cannot answer, withdrawn instructions and conflicting revisions. The assistant needs a useful response when the evidence is absent or inconsistent, rather than filling the gap with a plausible instruction.

The [SOP comparison](/notes/standard-work-vs-sop/) explains why making an instruction available differs from teaching someone to perform the work.

Before using the assistant for maintenance decisions, ask a qualified reviewer to verify the passage, revision and action conditions for each acceptance-test answer. Record retrieval failures separately from generation errors so the team can fix the part that failed.

## Sources

- [Microsoft retrieval augmented generation](https://learn.microsoft.com/azure/ai-studio/concepts/retrieval-augmented-generation).
