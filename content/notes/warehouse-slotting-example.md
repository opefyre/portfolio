---
title: Warehouse slotting: a picking and replenishment example
date: 2026-10-21
summary: Putting a popular item near dispatch cuts walking. A small pick face can add more replenishment work than it saves. Compare the complete job before moving stock.
seoTitle: Warehouse slotting: picking and replenishment
seoDescription: Work through a warehouse slotting example that compares picking distance, pick-face capacity and replenishment trips for the same daily order basket.
status: published
topic: Supply chain
keywords: warehouse slotting, warehouse slotting example, forward pick area, picking and replenishment
---

**Warehouse slotting means assigning items to storage and picking locations.** The decision includes how much each location holds, how people reach it and how it gets replenished.

Putting the most frequently picked item beside dispatch sounds sensible. But if that item is bulky and its new location holds very little, somebody may spend the day refilling it.

[Georgia Tech's Warehouse Science explanation](https://www.warehouse-science.com/apps/forward/index.html) makes that trade-off explicit: assess picking and restocking together. Pick popularity alone does not describe the work.

## Start with the same orders, not a convenient average

A fictional warehouse picks 120 cases of a bulky item each day. There are 60 pick visits, each collecting two cases. The current location holds 60 cases; a proposed location closer to dispatch holds only 20.

Both locations meet the item's storage, weight and access requirements. Neither blocks an exit or mixes unsafe traffic. The example compares travel after those checks, not instead of them.

The team measures a complete out-and-back pick route and a complete replenishment route. It uses the same order basket, starting stock and closing stock for each layout.

| Daily input | Current larger location | Proposed small location |
| --- | ---: | ---: |
| Pick visits | 60 | 60 |
| Cases per visit | 2 | 2 |
| Pick route per visit | 40 m | 20 m |
| Pick-face capacity | 60 cases | 20 cases |
| Complete replenishment route | 80 m | 300 m |

These fictional routes include the return journey. The small location is nearer dispatch but further from reserve stock through the permitted replenishment route.

::figure gap-slotting-routes | Schematic of the two candidate pick locations. Distances come from the worked route ledger, not the drawing scale. Both options supply the same 120 cases per day.

## Count replenishment on a repeatable daily cycle

Each option starts full and finishes full. That includes the work needed to restore the location for tomorrow. Comparing a full starting location with an empty closing location would borrow work from the next shift.

At 60 cases per refill, the larger location needs two replenishment loads over that cycle. At 20 cases per refill, the smaller one needs six. The worker can refill after stock is consumed without interrupting a pick in this simplified case.

:::formula Daily travel comparison
Picking distance = pick visits × complete pick route
Replenishment distance = replenishment loads × complete replenishment route
Total distance = picking distance + replenishment distance
:::

| Daily travel | Current larger location | Proposed small location |
| --- | ---: | ---: |
| Picking | 60 × 40 = 2,400 m | 60 × 20 = 1,200 m |
| Replenishment | 2 × 80 = 160 m | 6 × 300 = 1,800 m |
| Total | **2,560 m** | **3,000 m** |

The move saves 1,200 metres of picking travel and adds 1,640 metres of replenishment travel. Total distance rises by 440 metres per day.

Distance is not labour time. If replenishment uses a powered vehicle and picking is on foot, convert each route into its own time and cost. Include loading, waiting, congestion and any extra handling before claiming a saving.

## Pick frequency, storage space and related items

Pick frequency tells you how often a location is visited. Item dimensions tell you how much storage space it needs. Demand in cases tells you how quickly that space will empty. Those inputs can point to different locations.

Order affinity adds another consideration: items often picked together may benefit from compatible positions on the route. A change that helps one item can lengthen a multi-item tour, so replay representative whole orders before moving an entire aisle.

The [ABC and XYZ inventory explanation](/notes/abc-xyz-inventory-analysis/) classifies value and demand behaviour. Those classes can help select items for review, but a high annual purchase value does not automatically justify the nearest pick face.

## Try a better location or a bigger pick face

The failed proposal does not mean the current layout is ideal. If the near-dispatch location could safely hold 60 cases, two 300-metre replenishment routes would give 1,200 + 600 = **1,800 metres** per day. Space, reach, rack loading and neighbouring items still need checking.

Walk the proposed route before changing the master data. The [spaghetti diagram example](/notes/spaghetti-diagram-example/) shows how to record actual movement, including returns and interruptions that disappear in a tidy layout sketch.

Trial the allocation with representative orders and replenishment demand. Watch pick errors and empty locations alongside travel. A shorter route that leaves the picker waiting for stock has not solved the original problem.

## Source and example notes

- [Georgia Tech Warehouse Science: Slotting the forward-pick area](https://www.warehouse-science.com/apps/forward/index.html). Picking and replenishment must be assessed together.

The warehouse, capacities, orders and distances are fictional. The ledger excludes handling and waiting time so the travel trade-off stays visible. It compares two feasible allocations for one item, not an optimal warehouse layout.
