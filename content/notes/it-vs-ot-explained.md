---
title: IT vs OT: differences, factory examples and change planning
date: 2026-10-15
summary: Updating a report and updating a machine controller can affect the same factory in very different ways. Follow the connection before planning the change.
seoTitle: IT vs OT: differences and factory examples
seoDescription: Learn the difference between IT and operational technology. Follow a factory reporting path and control loop to compare changes, outages and recovery.
status: published
topic: Digital transformation
keywords: IT vs OT, operational technology explained, IT OT convergence, IT OT differences, factory systems
---

**Information technology (IT) handles information and business services. Operational technology (OT) monitors or controls physical equipment and processes.** A payroll application is IT. A controller regulating a packaging machine is OT.

The distinction becomes practical when someone proposes an update. Restarting a reporting app may delay a dashboard. Restarting a controller during a packaging run may interrupt the physical process.

[NIST's OT security guide](https://csrc.nist.gov/pubs/sp/800/82/r3/final) defines OT through its interaction with the physical environment and discusses the operating constraints that follow. OT also includes building controls and other systems beyond factories.

## IT and OT: compare the consequence of a failure

Our fictional factory has an hourly production report and a machine controller. This comparison describes those two systems, not every IT or OT installation.

| Question | Hourly reporting app | Packaging-machine controller |
| --- | --- | --- |
| What does it do? | Summarises stored production records | Reads sensors and commands machine actions |
| What timing matters? | Report available for the next review | Responses within the machine's required control timing |
| What happens during an outage? | People lose the latest report | The packaging process may stop or require a controlled recovery |
| Who helps plan a change? | App owner, users and IT support | Operations, controls engineering, maintenance and relevant safety specialists |
| What must recovery confirm? | App works and records are complete | Correct control configuration and equipment ready for authorised operation |

Some IT services are time-critical. Some OT systems only monitor a low-consequence condition. Classify the actual function and failure impact before using the label to choose a change process.

## IT/OT convergence: follow the data and command paths

IT/OT convergence means these environments exchange information and become more closely connected. The factory wants production counts in its reporting system. That does not automatically require the reporting app to command the machine.

::interactive it-ot-paths | Conceptual factory map. The reporting route carries production data out for analysis. The local control loop reads sensors and commands an actuator. Connections shown explain functions, not a complete or approved network design.

A sensor reading can feed both paths. The controller uses it to act on the process; a reporting service stores selected records for later analysis.

Check how much data the collector reads, how often it reads and what happens if the connection fails. Include the load on the equipment and network even when the purpose is only reporting.

The [ERP, MES and SCADA note](/notes/erp-mes-scada/) explains the functions of common factory applications. Here the focus is what an update or connection could change in the physical operation.

## Why OT updates need an operating window

NIST describes differences in availability, timing, equipment constraints and change testing. A general IT update routine may need adaptation before it reaches a machine-connected system.

Suppose the proposed reporting update changes only a chart. The app owner can test its calculations, access and recovery, then agree the short interruption with users.

Now suppose a change updates controller logic. In our example, controls engineering checks the intended behaviour, compatibility and current configuration. Operations agrees the production window and the conditions for stopping and restarting. The team tests the change and recovery route before authorising use.

The exact approval and test requirements depend on the equipment and risk. Check that the backup contains the correct configuration and that the recovery procedure returns the equipment to the required operating state.

## Security still includes confidentiality

OT discussions often stress availability and physical consequences. Recipe data, access credentials and production information can also need protection. Connecting a system to a dashboard does not make those concerns disappear.

Nor should “we cannot stop the line” become a permanent reason to ignore updates. It means the owners need a workable plan for testing, maintenance and any interim protection while a change waits.

The [role and permission example](/notes/role-based-access-control-explained/) explains least privilege. Reading a report, changing its definitions and altering controller settings are different tasks with different access needs.

## Agree who owns the connection after go-live

A connection can sit between teams even when each team understands its own system. Name who notices stale data, who can investigate a failed exchange and who has authority to request or approve a change on each side.

For a practical discussion of manufacturing data exchange, Vrolen's [OPC UA and MQTT guide](https://vrolen.com/blog/opc-ua-mqtt-manufacturing/) compares protocols and their different roles. The connection still needs owners on both sides.

Use the [handover checklist](/notes/project-handover-checklist/) to carry those responsibilities into support. Test a lost connection and recovery under agreed conditions, rather than leaving the first incident to reveal which team owns it.

Before approving a factory software change, trace where its effects can travel. Identify any path that can change the physical process, and include its operating owner in the review.

## Sources and example notes

- NIST. [Guide to Operational Technology Security, SP 800-82 revision 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final), 2023. OT scope and section 2.4 on IT/OT differences. This is the final revision used here; revision 4 was an initial public draft when checked on 15 October 2026.

The factory, application and update routes are fictional. The diagram explains the two functions; actual connections and changes need review against the equipment and operating requirements.
