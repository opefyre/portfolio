---
title: Kanban explained: follow the signal that replaces a box
date: 2026-10-14
summary: A box leaves the parts shelf. What tells the upstream team to replace it? Follow the material and its signal separately to see how Kanban controls replenishment.
seoTitle: Kanban pull system explained with an example
seoDescription: Follow a container and its Kanban signal through a pull system. See what authorises replenishment, why pull still holds stock and how delays cause shortages.
status: published
topic: Supply chain
keywords: Kanban pull system, Kanban inventory example, pull vs push production, Kanban cards, material replenishment
---

A shelf holds three boxes of brackets. An operator takes one to the assembly station. The upstream team sees an empty space and starts discussing whether to make another box, several boxes or the rest of tomorrow's forecast.

A **Kanban signal authorises a defined quantity to be made or moved in a pull system**. It connects replenishment to a downstream need. The signal might be a card, an electronic message or another clear device. The [Lean Enterprise Institute](https://www.lean.org/lexicon-terms/kanban/) distinguishes signals for production from those for moving material.

This article follows physical parts. Software teams also use Kanban, but a board with columns doesn't explain who may produce the next box of brackets.

## Pull starts with a withdrawal

In a push arrangement, the upstream team might release work according to its schedule, whether or not assembly has taken the previous batch. In a pull arrangement, downstream use provides the instruction to replenish.

That doesn't remove planning. Someone still needs to plan capacity, prepare materials and decide which products the system should support. Pull changes the rule for releasing this replenishment work.

The [Lean Enterprise Institute's pull-production explanation](https://www.lean.org/lexicon-terms/pull-production/) includes a supermarket system: a controlled stock of parts is replaced as downstream processes withdraw it. Our example uses that arrangement.

| Question | Scheduled push in this example | Supermarket pull in this example |
| --- | --- | --- |
| What releases the next box? | The upstream production schedule | A valid signal from a withdrawal |
| What quantity is released? | The scheduled batch | The quantity on the signal |
| What if the shelf is still full? | The schedule may still release work | No withdrawal means no replacement signal |
| Is a forecast still useful? | Yes, for the schedule | Yes, for capacity and replenishment design |

These are simplified release rules. Real operations can combine push and pull across different parts of the same supply chain.

## One box travels forward, one signal travels back

Take a fictional internal supermarket with three full boxes, each containing 20 brackets. Each box has one production card identifying the part and its pack quantity.

Assembly takes a whole box from the supermarket. The production card is detached and returned upstream. It authorises one replacement box of 20 brackets. Assembly's collection is a separate downstream action; this simplified model does not represent a second withdrawal-card loop.

Step through the sequence. The stock movement and the information movement happen at different moments.

::interactive kanban-loop | Fictional one-card production-replenishment example. Three cards, 20 brackets per box, no off-card production or scrap. It follows one withdrawal while the other two boxes remain full. Steps show event order, not elapsed time or production capacity. Assembly consumption and any separate withdrawal-card system are outside the stock count.

Immediately after collection, the supermarket holds 40 brackets. Assembly has the other 20. The detached card exists, but the upstream team has not yet received it.

After the signal arrives, one replacement box can be made. When that box returns to the supermarket with its card attached, the shelf again holds 60 brackets.

The returning box is new production. Don't add it to the original 60 and call the result the supermarket's stock. The withdrawn box has left that boundary, and its subsequent use is outside this diagram.

## The card is permission, not extra capacity

Three cards for boxes of 20 allow at most three boxes on the shelf or being replaced in this loop. The authorised quantities total 60 units, including full boxes and replacement work. It is not a promise that 60 finished units are always available on the shelf.

If the upstream machine stops, the returned card can wait without producing a single bracket. If transport is delayed, a full replacement box may exist upstream while assembly runs short downstream.

Adding cards allows more replenishment stock or work into the loop. It does not repair the machine, shorten a changeover or make the transport route reliable. The [SMED example](/notes/smed-changeover-smaller-batches/) shows how changeover work can affect how often a process can replenish.

The loop therefore needs a response when a card is late, a box contains the wrong part or stock is missing. Decide who investigates and how assembly gets help. An undocumented emergency batch can obscure the very shortage the signals are meant to expose.

## When should the signal return?

In our supermarket example, it returns when a whole box is withdrawn. That's different from a two-bin point-of-use system where emptying one bin may trigger replenishment while the second bin covers demand.

Choose the trigger to match the actual arrangement. “Send the card when it is empty” can be too late if the supplying process needs hours to refill the box and assembly has no remaining cover.

Replenishment time includes the whole journey: collecting the signal, waiting for production, making acceptable parts and getting them back to the required location. Timing only the machine cycle leaves out the rest of that wait.

:::link https://www.youtube.com/watch?v=34Z2IQJOeDU | Watch Vrolen's cycle time and lead time example
The video separates processing time from the longer journey through a process. That distinction helps when measuring how long a Kanban signal takes to produce a usable replacement.
:::

The [Little's Law example](/notes/busy-machines-slower-orders/) connects average work in progress, throughput and flow time. It can help explain a queue, but it doesn't by itself calculate a safe number of Kanban cards.

## How many cards should you start with?

The three-card choice above is a teaching assumption. It was not calculated from a measured demand pattern or replenishment-time distribution.

For a real loop, start with the part, container quantity, consumption pattern and end-to-end replenishment time. Then examine variation, delivery reliability, quality losses and any required protection against shortages. Trial the design under representative conditions and review it as those conditions change.

Average daily demand alone is insufficient. Two parts with the same average can need different protection if one is consumed steadily and the other arrives in large bursts. The [safety stock and reorder point example](/notes/safety-stock-reorder-point/) explains why demand and replenishment uncertainty both matter, using a different inventory policy.

Pull also doesn't mean zero inventory. Our loop deliberately keeps a supermarket. Its purpose is to provide parts while limiting and making replenishment visible. Removing a box before improving the response can simply bring the shortage forward.

For the wider relationship between flow, pull and improvement, see [Vrolen's Lean manufacturing guide](https://vrolen.com/blog/lean-manufacturing/).

Before calling a shelf-and-card arrangement a pull system, follow one actual withdrawal. Find the signal it creates, the quantity it authorises and the replacement that closes the loop. If the upstream team keeps producing without that signal, the release rule needs attention.

## Sources and example notes

- [Lean Enterprise Institute: Kanban](https://www.lean.org/lexicon-terms/kanban/). Production and withdrawal signals, card information and replenishment authorisation.
- [Lean Enterprise Institute: Pull Production](https://www.lean.org/lexicon-terms/pull-production/). Downstream signalling and supermarket, sequential and mixed arrangements.

The bracket example is fictional and intentionally shows one production-card loop. All three starting boxes are full. One is withdrawn, one replacement is authorised and no further withdrawals occur during the sequence. No card-count formula, service-level guarantee or measured improvement is claimed.
