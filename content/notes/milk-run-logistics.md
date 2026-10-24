---
title: Milk run logistics: how the route and replenishment fit together
date: 2026-10-24
summary: A regular collection route can connect several stops, but its timetable must fit the replenishment need. Follow a parts signal through the full return journey.
seoTitle: Milk run logistics: how the route works
seoDescription: Learn how milk run logistics connects scheduled stops with replenishment. Follow an existing Kanban example and check route time, capacity and missed signals.
status: published
topic: Supply chain
keywords: milk run logistics, milk run supply chain, milk run shipping, milk run process, scheduled replenishment route
---

A milk run is a planned vehicle route that collects or delivers material at several stops. Teams use a repeated route and schedule to connect smaller movements instead of arranging every shipment as a separate direct trip.

The [Lean Management Instituut lexicon](https://en.leaninstituut.nl/lean-lexicon) describes milk runs between facilities and their similarity to material-handling routes inside a facility. A scheduled route can shorten waits for replenishment, but its timing and capacity still have to fit the work.

The route needs more than a loop drawn on a map. Each stop must know what to hand over, what to receive and what happens when a signal or load is late.

## Connect the route to the replenishment signal

The [Kanban Note](/notes/kanban-pull-system/) follows a shelf containing three boxes of twenty brackets. Assembly withdraws one box, leaving forty brackets on the shelf. A detached card authorises one replacement box when the upstream team receives it.

That example already contains a transport dependency: the card must reach the supplying process, and the acceptable replacement must return to the shelf.

A repeated material-handling route could connect those points. It might collect the card, reach the supplying area and return with replenishment when ready. A wider milk run can serve several such pickup and delivery points along its scheduled route.

::figure r4-milk-route | Route logic applied to the fictional Kanban setting: supplying process, supermarket shelf and assembly. Arrows show a possible collection and replenishment connection, not measured travel times or a calculated route frequency. The three-card, twenty-per-box quantities remain unchanged.

Do not turn every pass into permission to deliver another box. The card supplies the replenishment authority. The route supplies the movement.

## Measure the entire wait for a usable box

For a route to help, the team needs to know when the signal becomes available, when the vehicle next collects it and when a replacement can return. A missed collection can add a route interval before production has even started.

| Part of the wait | Evidence to collect |
| --- | --- |
| Signal waiting for collection | Withdrawal time and actual collection time |
| Supplying process | Signal receipt, queue, production and quality-release times |
| Replacement waiting for transport | Ready time and next collection |
| Journey and unloading | Departure, arrival and time stock becomes usable at the shelf |

We have no route times or consumption-rate distribution for the Kanban case. Its three cards were teaching inputs, not a calculated buffer. We therefore cannot claim that a particular hourly or daily milk run will prevent shortages.

The [lead-time comparison](/notes/takt-time-vs-cycle-time/) separates processing time from the longer journey. Use that full boundary when checking the replenishment arrangement.

## Check the busiest leg, not only total vehicle space

A route can pick up material before making a later delivery. Check load quantity, weight, volume and handling constraints on each leg, including returned containers where relevant.

A low average load does not prove the vehicle has space at every stop. A route can also fit physically while spending too long loading, checking or waiting for access.

Agree the handling unit and the pickup rule. The shelf's box contains twenty brackets; “one box” must mean the same quantity to the supplying process and the material handler. The [master-data example](/notes/master-data-vs-transactional-data/) shows how changing a pack definition can otherwise distort that record.

## Give a late stop a defined response

If the card misses collection, identify who checks it and whether an authorised recovery movement is needed. If the replacement is not ready, record the missing box and tell the receiving process before the next scheduled visit.

An extra unscheduled delivery may protect production. Keep its reason and cost visible so the team can distinguish an effective route from one supported by repeated emergency trips.

The [transport-mode comparison](/notes/transport-mode-selection/) helps assess those recovery choices. Adding cards or stock without investigating the delayed movement can conceal the route problem.

## Compare the route with the current service

A milk run concerns a scheduled multi-stop movement. Freight consolidation concerns combining shipments. A plan can do both, but combining loads does not establish the schedule or replenishment response.

The [cost-to-serve example](/notes/cost-to-serve-example/) examines how delivery arrangements affect customer cost. For this route decision, add measured waiting, missed stops, load constraints and emergency movements before claiming a saving.

Start with one part and follow its signal to a usable replacement. Put those timestamps beside the planned route. Choose frequency and stock protection only after checking that complete journey.

## Sources and example notes

- [Lean Management Instituut: milk-run entry](https://en.leaninstituut.nl/lean-lexicon), scheduled multi-location collection and delivery, and the connection with internal handling routes.
- [The existing Kanban example](/notes/kanban-pull-system/), fictional three-card, twenty-bracket-box quantities reused here.

The route is an explanatory application to that existing setting. No vehicle capacity, route frequency, consumption distribution, cost reduction or shortage protection has been estimated.
