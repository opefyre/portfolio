---
title: SaaS vs PaaS vs IaaS: differences and responsibilities
date: 2026-10-15
summary: Three cloud proposals can put very different work on your team. Follow one inspection app to see who maintains the application, platform and infrastructure.
seoTitle: SaaS vs PaaS vs IaaS: who manages what?
seoDescription: Compare SaaS, PaaS and IaaS using one inspection app. See the responsibility stack and the data, access and operating decisions your team still owns.
status: published
topic: Digital transformation
keywords: SaaS vs PaaS vs IaaS, cloud service models explained, SaaS responsibilities, PaaS example, IaaS example
---

**SaaS provides an application to use. PaaS provides a managed platform on which you deploy an application. IaaS provides computing infrastructure on which you manage an operating system and software.** The letters mean Software, Platform and Infrastructure as a Service.

The names tell you which parts the provider manages. You still need to check whether the product does the job.

A factory wants an app for inspection results. Inspectors record measurements, Quality reviews exceptions and the team needs to recover its records after a mistake. Three proposals say “cloud”. Each leaves the factory with different work.

The model definitions come from [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final). Real services combine features, so use the definitions to ask better questions about the actual offer.

## SaaS, PaaS and IaaS compared

| Model | What the factory obtains | What its team does in this example |
| --- | --- | --- |
| SaaS | A supplier's inspection application | Configures forms and roles, manages use and validates the workflow |
| PaaS | A supported environment for its inspection application | Maintains its app code and configuration, deploys and tests changes |
| IaaS | Virtual computing, storage and networking resources | Maintains the guest operating system and the app, as well as its configurations |

In SaaS, the supplier maintains the application software. In PaaS, the factory's application team owns the code it deploys, while the provider manages the platform. In IaaS, renting a virtual server leaves the customer with more of the software stack to maintain.

The [build vs buy comparison](/notes/build-vs-buy-software/) asks how to source the solution. The cloud model answers a different question: which layers does this service manage for us?

## Read the responsibility stack from top to bottom

The diagram holds all three models beside each other. “Customer” includes any contractor the factory appoints to perform that work. Agree that responsibility with the contractor too.

::interactive cloud-responsibility-stack | Simplified service-management boundaries for the fictional inspection app. Provider-managed software does not remove customer configuration, data or access duties. Check the actual service and support contract for the detailed split.

When a PaaS provider updates the environment that runs the app, the application owner still needs to check compatibility and test affected behaviour.

With IaaS, a virtual server becoming available is only the beginning. Someone must maintain the virtual server's operating system, installed software and the factory's network settings. The provider still operates the underlying physical infrastructure.

## What remains ours with SaaS?

The factory must decide who may enter results, change a product specification or release an exception. It also needs to maintain the meaning of those records: product, unit, test method and effective specification.

A supplier keeping the app online cannot decide whether a new inspector should be allowed to approve their own result. That is a business rule the customer needs to agree and configure through the supported controls.

[Microsoft's shared-responsibility guidance](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility) explains the customer's continuing responsibility for data, identities and settings. The details vary with the service.

The [role-based access example](/notes/role-based-access-control-explained/) shows how to translate tasks into permissions. The [data governance note](/notes/data-governance-explained/) covers who agrees definitions and changes.

## Ask how recovery and exit actually work

Return to the inspection app. An authorised user imports the wrong specification against several products. The infrastructure keeps running, yet the factory needs to restore the correct records and understand which results were affected.

Ask each supplier what can be recovered: an individual record, a customer workspace or an entire service. Ask how long it takes, what can be lost between restore points and who performs the reconciliation.

Do the same for exit. Can the team export product definitions, results, attachments and the links between them in a usable form? A spreadsheet of numbers without its units or method versions may not preserve the inspection history.

The [data migration example](/notes/data-migration-vs-integration/) follows that reconciliation problem when a replacement system takes over.

## Choose a model the operating team can support

For a standard inspection workflow, a suitable SaaS product may avoid owning an application codebase. If the workflow needs custom software, PaaS may reduce platform work. IaaS may fit a requirement for a particular guest environment that the team can maintain.

The choice depends on the service and what your team can maintain. Compare supported behaviour, integrations, availability, recovery and the work your team can sustain.

Before signing, take one likely change and one likely incident through the proposal. Identify who changes the form, updates the app, patches the relevant system and restores the records. If the answer is “the cloud”, the responsibility discussion is unfinished.

## Sources and example notes

- NIST. [The NIST Definition of Cloud Computing, SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final), 2011. Three service-model definitions.
- Microsoft Learn. [Shared responsibility in the cloud](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility), customer and provider responsibilities.

The inspection application and proposals are fictional. The stack compares the main management tasks. Check the detailed division of responsibilities in the actual service agreement.
