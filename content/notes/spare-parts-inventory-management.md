---
title: Spare parts inventory: what should you keep in stock?
date: 2026-11-18
summary: A part with no recent demand can still deserve a place on the shelf. Build a stocking decision around the equipment, recovery options and replenishment time.
seoTitle: Spare parts inventory management: what to stock
seoDescription: Decide which maintenance spare parts to stock using failure consequences, supplier lead time, repair options and reliable inventory records.
status: published
topic: Supply chain
keywords: spare parts inventory management, critical spare parts, maintenance inventory, spare parts criticality
---

Spare parts inventory management means deciding which replacement parts to hold, in what quantity and how to keep them ready for use. The difficult cases are often parts that barely move. A year without an issue tells you little about what happens if the machine needs that part tomorrow.

At BAT, I built an inventory tool for the spare parts warehouse to help improve stock accuracy and ordering. That work sits behind a basic maintenance question. Can the team find a usable replacement when equipment fails?

Start with the equipment and the recovery plan. Annual spend alone cannot answer that question.

## Decide what happens while the part is missing

For each candidate spare, ask maintenance to identify the equipment it fits and the failure it helps repair. Record whether the equipment has a working standby, whether another part can safely substitute, and how long the operation can wait for a replacement.

The IAEA's [asset-management guidance](https://www-pub.iaea.org/MTCD/publications/PDF/TE-2084web.pdf#page=52) connects these decisions to equipment importance, supply time and storage conditions. It addresses uranium mining and processing, but the same questions help structure a maintenance spares review.

| Evidence to collect | Why it changes the stocking decision |
| --- | --- |
| Equipment and failure mode | Establishes what the part would restore |
| Safe recovery or standby arrangement | Shows whether production can continue while waiting |
| Confirmed replenishment time | Includes qualification, transport and receipt checks |
| Interchangeability and repair route | Identifies alternatives to holding another new part |
| Storage life and condition | Establishes whether the stored part will still work |

A “critical” label should point to this evidence. Give it an owner and review it when equipment, suppliers or production plans change.

::figure spare-recovery | Compare the time the operation can tolerate with the time needed to obtain and fit a replacement. This is a decision sequence, not a stock-quantity formula.

## Separate importance from quantity

[ABC analysis](/notes/abc-xyz-inventory-analysis/) sorts items by consumption value. That helps focus purchasing and counting effort. A rarely used component can have little annual consumption value and still serve equipment with no acceptable fallback.

Once the team agrees that a spare needs to be available, decide how to provide it. Options include local stock, a shared spare across compatible machines, an agreed supplier holding arrangement or a repairable pool. Check who can actually access that arrangement during a breakdown.

The quantity decision needs more information. Use the installed equipment population, failure and repair history, replenishment time and the service requirement. A criticality score by itself does not calculate how many units to buy.

[FMEA](/notes/fmea-step-by-step/) can help the team examine the failure and its consequences before choosing a response. Vrolen's long-form walkthrough explains that reasoning through a separate example.

::video F5GjLjVR8Fw | FMEA helps structure the failure discussion. The video uses a separate example and does not calculate spare-parts quantities.

## Make the record useful during a breakdown

Keep the manufacturer and part number, compatible equipment, bin location and usable quantity together. Separate serviceable stock from items awaiting inspection or repair. Record issues and returns against the job so the next ordering decision has something better than memory behind it.

Use [cycle counting](/notes/cycle-counting-inventory-accuracy/) to check those records at the level people pick from. A correct warehouse total can still hide a missing part in the bin the technician needs.

Start with the parts supporting equipment that has no easy recovery route. Review their stock records, condition and supply arrangements with maintenance before placing another order.

## Sources

- [IAEA asset-management guidance](https://www-pub.iaea.org/MTCD/publications/PDF/TE-2084web.pdf), sections 4.6 and 4.7. Sector-specific guidance on spares and asset records.
- [SAP on ABC/XYZ analysis](https://help.sap.com/saphelp_SCM700_ehp02/helpdata/en/4d/33d92edb9e00d3e10000000a42189b/content.htm). Value and consumption-based grouping.
