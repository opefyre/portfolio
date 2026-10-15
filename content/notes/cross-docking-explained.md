---
title: Cross-docking explained: process, types and a warehouse example
date: 2026-10-15
summary: Ten pallets are already allocated to an outbound order. Follow the warehouse route, change their arrival time and see when cross-docking stops being feasible.
seoTitle: Cross-docking: process, types and worked example
seoDescription: Follow ten pallets through cross-docking and storage. Compare loading times, change the arrival and see why release status and departure cutoffs matter.
status: published
topic: Supply chain
keywords: cross docking explained, cross docking vs warehousing, cross docking example, planned cross docking
---

**Cross-docking routes incoming goods towards an outbound shipment without putting them through the usual storage-and-pick cycle.** There can still be unloading, checks, sorting, staging and a wait at the dock.

Ten pallets arrive at goods receipt. An outbound order needs all ten that morning. Putting them into storage, only to pick them again, may add work the order does not need.

The opportunity depends on more than an empty space beside the outbound door. The goods must suit the order, be released for use and be ready before loading closes.

## Cross-docking vs the storage route

[Oracle's warehouse guide](https://docs.oracle.com/cd/E26401_01/doc.122/e48828/T210618T433599.htm) describes matching incoming supply to outbound demand and allowing enough time to process, unload and load it. The example below follows that timing without relying on a particular warehouse system.

| Question | Cross-docking | Storage and later picking |
| --- | --- | --- |
| Where does the receipt go? | Towards an allocated outbound load, often through staging | Into a storage location before a later pick |
| What must be coordinated? | The receipt, release and outbound window | Receipt and release, then stock availability and the pick schedule |
| What happens if there is no suitable outbound need? | The receipt needs another authorised route | Storage can hold it for a later need |
| Is stock or handling eliminated? | Neither is guaranteed | Both remain visible in the warehouse process |

A **planned** cross-dock matches supply and demand before receipt. An **opportunistic** match is made when the receipt arrives. Both still need an eligible order and enough time to fulfil it.

## Cross-docking example: ten pallets and a loading cutoff

Our fictional warehouse receives ten interchangeable pallets at 08:30. All ten are reserved for one outbound order. There is no partial shipment, other allocation or competing dock work in this example.

Loading must be complete by **11:00** for an 11:15 truck departure. The fifteen minutes between those times are reserved for final departure activities. Finishing loading at 11:10 misses the cutoff, even though the truck has not left.

Both routes need twenty minutes to unload and twenty minutes to complete receiving checks and release. After release, their work differs.

| Step | Cross-dock route | Storage route |
| --- | --- | --- |
| Unload | 08:30 to 08:50 | 08:30 to 08:50 |
| Receiving checks and release | 08:50 to 09:10 | 08:50 to 09:10 |
| Next move | Stage for outbound, 09:10 to 09:20 | Put away, 09:10 to 09:30 |
| Wait | No further queue assumed | Wait until the pick team starts at 10:00 |
| Pick | No storage pick | 10:00 to 10:30 |
| Load | 09:20 to 09:40 | 10:30 to 10:50 |
| Time left before loading closes | 80 minutes | 10 minutes |

Both routes meet the cutoff. Cross-docking finishes loading seventy minutes earlier, but that is not seventy minutes of labour saved. Part of the difference is waiting, and we have not priced either route.

Both also take the same 11:15 truck. Earlier readiness does not mean the customer receives the order earlier.

## Cross-docking feasibility: arrival time and release status

Move the arrival time below. The storage pick begins at 10:00 or when putaway finishes, whichever is later. The cross-dock route begins outbound staging as soon as receiving releases the goods.

::interactive crossdock-window | Fictional ten-pallet order and fixed same-day timings. Loading closes at 11:00; the truck departs at 11:15. Both routes require receiving release. A pending release blocks onward work. There are no competing jobs, capacity queues, partial shipments or later recovery departures in the model.

At 09:30, cross-docking finishes loading at 10:40. The storage route finishes at 11:20 and misses the cutoff by twenty minutes. The receipt is physically present in both cases; the route determines when it becomes ready to ship.

The latest arrival that meets the cutoff here is 09:50: forty minutes for receipt and release, ten for staging and twenty for loading leave no margin before 11:00. At 09:50 there is no time left for a delay.

Now mark release as pending. Neither route can continue into usable outbound stock. Cross-docking does not make a quality hold disappear. The [FIFO and FEFO example](/notes/fifo-vs-fefo/) uses the same order of decisions: check that goods can be used before choosing how they move.

## Cross-docking risks: late arrivals and missed departures

A missed cross-dock window needs a defined response. That might mean an approved alternative load, storage for a later departure or escalation against the customer promise. Leaving ten pallets in an outbound lane does not resolve their status.

Keep the physical location, allocation and shipment record connected. If the inbound quantity changes or inspection reduces the released quantity, the outbound plan must change too. A reservation for ten pallets is not evidence that ten usable pallets arrived.

Before choosing the route, check the order match, released quantity, actual arrival, remaining work and loading cutoff together. Check the staging space as well: stock waiting at a dock still occupies space and needs control.

Vrolen's [guide to cycle time and lead time](https://vrolen.com/blog/takt-time-vs-cycle-time-vs-lead-time/) follows a different production example to separate work time from waiting. That distinction helps here: removing a storage cycle can shorten the warehouse journey without changing the departure timetable.

## Measure the whole route after changing it

Compare handling effort, waiting, dock occupancy and missed departures on similar orders. Include the cost of exceptions rather than counting only the receipts that moved straight through.

The [OTIF note](/notes/otif-vs-on-time-delivery/) explains why warehouse readiness and customer delivery are different measures. Finishing loading on time is one step towards an on-time delivery. The rest of the journey still matters.

For these ten pallets, the first step is to confirm the released quantity and the available window. That gives the warehouse a reason to choose a route before moving the goods twice.

## Sources and example notes

- [Oracle Warehouse Management: Crossdocking](https://docs.oracle.com/cd/E26401_01/doc.122/e48828/T210618T433599.htm). Planned and opportunistic matching, eligibility, processing windows and quantity changes.

All pallets, times, release conditions and staffing arrangements are fictional. The comparison covers these warehouse routes and their loading window; neither route has been costed.
