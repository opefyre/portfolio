---
title: Supply chain network design: one warehouse or two?
date: 2026-10-21
summary: A regional warehouse shortens deliveries, adds fixed cost and splits stock. Compare the same demand under two feasible networks before calling either one cheaper.
seoTitle: Supply chain network design: one warehouse or two?
seoDescription: Compare one central warehouse with two regional sites using fixed costs, transport, stockholding and customer service. Work out the volume break-even point.
status: published
topic: Supply chain
keywords: supply chain network design, warehouse network design, facility location, distribution network example
---

**Supply chain network design decides where facilities should be, what they should do and which demand they should serve.** It concerns the shape of the network before a planner works out next week's replenishment through it.

A sales team wants another warehouse closer to customers. Finance sees another lease. Both are looking at a real consequence, but neither view settles the decision.

The comparison needs the same customer demand, a clear service requirement and the costs that actually change.

## Define the delivery promise before comparing locations

Our fictional distributor ships 20,000 orders a year: 12,000 to a western customer group and 8,000 to an eastern group. Every order has the same simplified size and handling requirement.

The existing central warehouse can serve both groups in two days. A two-site option would serve each group in one day. Both have enough usable capacity, including the assumed peak. Inventory is available when promised in both scenarios; transit time alone cannot guarantee that in practice.

::figure gap-network-map | Schematic customer assignments for the same 20,000 annual orders. One central site serves both groups; the alternative uses one regional site for each. This is a scenario map, not a calculated geographic optimum.

[MIT's Supply Chain Design Lab](https://ctl.mit.edu/research/supply-chain-design-lab) studies network choices involving logistics cost, service, inventory and uncertainty. Here, we compare two already identified options, rather than claiming to solve every possible location.

## Put annual costs on the same basis

For this example, fixed cost includes the facility and committed staffing that would remain across the modelled volume range. Variable handling is €2 per order in either network. Transport rates include the inbound and outbound allocation shown in the table.

| Annual cost or input | One central warehouse | Two regional warehouses |
| --- | ---: | ---: |
| Fixed facility and staffing cost | €180,000 | €280,000 |
| Inbound transport | €40,000 | €50,000 |
| Outbound transport per order | €8 | €5 |
| Outbound transport at 20,000 orders | €160,000 | €100,000 |
| Variable handling at €2 per order | €40,000 | €40,000 |
| Average stock value | €200,000 | €280,000 |
| Stockholding at 20% per year | €40,000 | €56,000 |
| Total annual modelled cost | **€460,000** | **€526,000** |

Fictional inputs. Stockholding uses an annual carrying rate; the stock value itself is not added again as an annual expense. Setup investment and transition costs are excluded from this recurring-cost table.

The regional network saves €60,000 in outbound transport. Its higher fixed, inbound and stockholding costs add €126,000. The net increase is **€66,000 a year**, or €3.30 per order at this volume.

## Decide whether the extra service is worth the cost

If the accepted requirement is two-day delivery, both networks pass. On the stated recurring costs, keeping the central site is cheaper.

If one-day delivery becomes mandatory, the central option is no longer comparable without a change. Price an express service, revise the assignment or test another facility. Do not label the current central network the winner while quietly accepting a service failure.

The extra €66,000 might be justified by retained customers or an agreed service offer. Those benefits need evidence, such as customer commitments or a tested change in buying behaviour. “Faster delivery will grow sales” is not yet a quantified benefit.

## Find the volume that would reverse the cost result

Hold fixed cost, inbound cost, average stock and the €3 outbound saving per order constant for a first sensitivity check. The extra annual cost before outbound savings is €126,000.

:::formula Scenario break-even
Break-even annual orders = €126,000 ÷ €3 saved per order = 42,000 orders
:::

At 42,000 orders, the two recurring-cost totals would match under those assumptions. This is a sensitivity threshold, not a forecast. Check capacity, rate bands, extra shifts and stock requirements before using it at more than double today's volume.

The [inventory risk-pooling explanation](/notes/inventory-risk-pooling/) shows why splitting stock can change buffer requirements. Do not assume the €80,000 difference above follows automatically from adding a site; it is an input to replace with a policy calculation.

## Check how the network behaves when something goes wrong

Two sites can offer a fallback only if stock, people, systems and transport can support it. A second building with the wrong product or no spare capacity is not a tested continuity plan.

Also examine returns, replenishment lead times, peak demand and customer clusters that an annual average hides. The [cost-to-serve example](/notes/cost-to-serve-example/) helps identify customers whose ordering pattern creates work that a flat order rate misses.

Once the footprint and customer assignments are chosen, [distribution requirements planning](/notes/distribution-requirements-planning-example/) turns that structure into time-phased stock and shipment requirements. Choosing the buildings and planning through them are connected decisions, with different inputs.

## Source and example notes

- [MIT Center for Transportation and Logistics: Supply Chain Design Lab](https://ctl.mit.edu/research/supply-chain-design-lab). Network design, cost/service trade-offs, inventory and uncertainty.

All demand, costs, capacities and service times are fictional. The model compares two defined networks and excludes taxes, setup cash flows and transition disruption. An investment decision needs those cash flows as well as recurring operating cost.
