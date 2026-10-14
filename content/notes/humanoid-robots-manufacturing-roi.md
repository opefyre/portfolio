---
title: Humanoid robots in factories: what would make them pay?
date: 2026-10-14
summary: A humanoid moves the part. What does it cost to keep doing that all year? Compare it with a conventional robot and manual work, including the help it still needs.
seoTitle: Humanoid robots in manufacturing: the ROI question
seoDescription: Compare humanoid robots, conventional automation and manual work on the same task. See how uptime, human support and useful output change the economics.
status: published
topic: Industrial AI
keywords: humanoid robots manufacturing ROI, humanoid vs industrial robots, robot cost per task, physical AI manufacturing, robotics business case
---

A humanoid picks up a part and places it in a fixture. The movement works. To put it on a production line, though, you need to know how often it can repeat the job and what happens when it can't.

Someone may have to clear a fault, reset the gripper or cover the work while it charges. Those minutes belong in the business case alongside the robot's price.

For humanoid robots in manufacturing, the return on investment depends on completing the required work reliably enough, and at a low enough total cost, to justify the installation. A conventional robot or a change to the workstation may offer another way to do the same job.

## What the BMW pilot tells us

BMW reports that Figure 02 moved more than 90,000 components during roughly 1,250 operating hours at Spartanburg, helping production of more than 30,000 X3 vehicles. It positioned sheet-metal parts for welding. That is a specific production task; the robot wasn't building whole cars. [BMW's account](https://www.press.bmwgroup.com/united-kingdom/article/detail/T0455870EN_GB/bmw-group-to-deploy-humanoid-robots-in-production-in-germany-for-the-first-time).

Figure's [deployment report](https://www.figure.ai/news/production-at-bmw) lists targets for an 84-second overall cycle, more than 99% correct placement per shift and zero interventions. Those are targets, rather than independently verified achieved rates.

Cycle time, correct placement and interventions are all things a factory can measure during a trial. To turn them into an investment case, the team also needs costs and a comparison with the alternatives available at that station.

The conventional option deserves serious attention. IFR [reports five million industrial robots operating globally](https://ifr.org/ifr-press-releases/news/five-million-robots-now-operate-in-factories-globally). That wider total includes established industrial robot types, not just humanoids.

## Compare the same job

Suppose a factory needs **300,000 acceptable placements a year**. The right part has to reach the fixture within tolerance, ready for the next operation.

We'll compare manual work, a conventional robot and a humanoid. All figures are fictional, and all three options are assumed to meet safety and quality requirements.

| Operating assumption | Manual work | Conventional robot | Humanoid |
| --- | ---: | ---: | ---: |
| Accepted task rate | 120 per paid h | 100 per cycling h | 90 per cycling h |
| Annual deployment window | As needed | 4,000 h | 4,000 h |
| Share of that window actually cycling | Not applicable | 90% | 75% |
| Human support per 100 robot-completed tasks | Not applicable | 1 min | 5 min |

The manual rate includes normal pauses. The robot rates count acceptable output, allowing for retries and rejects while cycling. Charging, faults and resets reduce the share of the year available for that cycling.

At 75%, the humanoid has 3,000 hours to complete tasks. At 90 accepted placements an hour, it produces 270,000. People still need to cover the remaining 30,000.

::figure robot-required-output | Fictional annual requirement: 270,000 robot placements plus 30,000 manual placements meet the same 300,000-task workload as the other options.

This assumes trained people are available and the work can be scheduled around the robot's interruptions. A tightly paced line needs a shift-by-shift check; an annual total alone won't prove it can keep up.

:::link https://www.youtube.com/watch?v=34Z2IQJOeDU | Watch Vrolen's cycle time and lead time example
Follow a lunch order to see why time spent doing the task and time spent waiting produce different answers. The same distinction matters when checking a robot's cycle against the line's required pace.
:::

## How much human work remains?

Value human work at €35 an hour. Doing all 300,000 placements manually takes 2,500 paid hours, costing €87,500.

The humanoid needs 250 hours of manual backup for the placements it can't cover. Its five support minutes per 100 completed tasks add another 225 hours. Together, the 475 human hours cost €16,625.

We count support labour even when it happens during a fault already included in the robot's downtime. That's a labour cost, not another deduction from its operating time.

Now add the equipment. Assume the humanoid costs €150,000 installed, spread evenly over five years, plus €18,000 a year for maintenance, software, energy and other running costs. That is €48,000 a year before the human work.

For the conventional robot, use €120,000 installed over five years and €12,000 in annual running costs. It covers the full workload and needs 50 support hours.

| Annual cost for 300,000 acceptable placements | Manual work | Conventional robot | Humanoid plus backup |
| --- | ---: | ---: | ---: |
| Annual equipment allocation and running costs | €0 | €36,000 | €48,000 |
| Human work, including support and backup | €87,500 | €1,750 | €16,625 |
| Total | €87,500 | €37,750 | €64,625 |
| Cost per acceptable placement, rounded | €0.292 | €0.126 | €0.215 |

The conventional robot is cheapest on these inputs. The humanoid also costs less than fully manual work, but that result depends on how much help it needs.

Increase support from five to 25 minutes per 100 tasks and the humanoid's annual total becomes **€96,125**. It now costs more than manual work. Try it below.

::interactive robot-task-cost | Fictional comparison for the same 300,000 placements. Change the humanoid's output and support needs. People cover any shortfall; open the calculation details for the cost assumptions.

These are annual costs, using a five-year equipment allocation. They aren't vendor prices or a cash payback calculation. Releasing staff hours also doesn't automatically reduce payroll, as the [automation benefits example](/notes/benefits-realisation-automation/) explains.

A humanoid could justify a higher cost if it handles work the fixed robot can't, or avoids expensive changes to the layout. Compare that flexibility with the actual cost of adapting the conventional option.

## What to record during a trial

For each shift, keep attempted and acceptable placements, time cycling, time stopped, support minutes and work covered manually. Record who provided the help, too. A quick operator reset and a specialist travelling to site have different costs.

Group the records by product and operating conditions. Include awkward part presentation and changeovers so the average reflects the work the robot would receive after the trial.

Then check the next operation. If it can accept only 60 units an hour, giving this station a capacity of 100 won't by itself increase finished output to 100. There may still be benefits in physical strain, staffing or flexibility, but price those benefits separately.

The [OEE example](/notes/same-oee-opposite-fixes/) shows why a machine improvement needs that wider check. Vrolen's [guide to moving bottlenecks](https://vrolen.com/blog/dynamic-bottlenecks-manufacturing/) extends it to lines where the limiting station changes with the product or shift.

Before approving a larger deployment, compare the robot and its supporting work with the best realistic alternative. In this example, a few extra minutes of help change the answer completely. The trial should tell you whether those minutes are five, 25 or something else.

## Sources

- BMW Group, 27 February 2026. [Humanoid robots in production](https://www.press.bmwgroup.com/united-kingdom/article/detail/T0455870EN_GB/bmw-group-to-deploy-humanoid-robots-in-production-in-germany-for-the-first-time). Customer account of the Figure 02 pilot.
- Figure, 19 November 2025. [Production at BMW](https://www.figure.ai/news/production-at-bmw). Vendor account, including cycle, placement and intervention targets.
- IFR, 24 September 2026. [Five million robots now operate in factories globally](https://ifr.org/ifr-press-releases/news/five-million-robots-now-operate-in-factories-globally). Industrial robot operating stock across the wider category.

*The task, workload, prices and operating rates are fictional. The example assumes acceptable safety and quality, available manual backup and enough scheduling flexibility. Costs exclude tax, discounting and resale value. It assigns a cost to human time without assuming a headcount reduction or extra sales.*
