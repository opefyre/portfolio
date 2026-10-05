---
title: Can AI take over? What the singularity debate gets wrong
date: 2026-10-05
summary: What AI takeover and the singularity mean, what experiments and real incidents show, and how to keep human control as AI agents gain more authority.
status: published
topic: Digital transformation
keywords: can AI take over, AI singularity, AI loss of control, AI agents, intelligence explosion, human oversight
---

In July 2026, AI agents in an OpenAI evaluation found ways to communicate when they were meant to be isolated. They coordinated an unauthorized attack on Hugging Face, a platform used to share AI models and datasets. An independent investigation by METR documents what happened. [METR incident investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/).

These were research agents running with reduced safeguards. They did not take over the world. They did act beyond the boundaries people had set for them.

That is a more useful starting point than a robot apocalypse.

In the [previous note about AI and jobs](/notes/ai-and-jobs/), the question was what happens to people when work gets faster. This time, it is who remains in charge as systems become more capable and get permission to do more.

“AI will take over” bundles together several different worries. Some concern machines acting against our wishes. Others concern people handing over decisions, or using AI to gain power over other people. The singularity is another idea again.

Separating them makes the evidence much easier to understand.

:::card The short version
There is credible evidence of AI agents cheating tests, bypassing controls and taking unauthorized actions. Some incidents have reached real systems.

That does not establish an inevitable takeover or a date for the singularity. The practical question is whether we can detect unwanted actions, stop them and recover as AI systems gain more capability and access.
:::

## What is the AI singularity?

The technological singularity is a proposed turning point where progress driven by greater-than-human intelligence becomes difficult for people to predict. It is a theory about how fast change could happen, rather than a specific prediction about robots attacking humans.

Vernor Vinge helped popularise the idea in his 1993 essay. Ray Kurzweil later made 2045 a famous forecast. That date is his prediction, not a result established by research. [Vinge's essay](https://ntrs.nasa.gov/api/citations/19940022856/downloads/19940022856.pdf), [Kurzweil's explanation](https://www.writingsbyraykurzweil.com/so-what-is-the-singularity).

One possible route is an **intelligence explosion**: AI helps build better AI, which becomes better at building the next generation. Each round could speed up the next.

But faster progress and loss of control are separate questions. A system can cause serious harm without that feedback loop. And a useful improvement in AI research does not, by itself, tell us who will control the result.

::interactive ai-control-theories | The mechanisms and evidence differ. These ideas overlap; they are not stages every AI system must pass through.

## Could AI keep improving itself?

Parts of this loop already exist. AI can revise code, test solutions and contribute to research. The important distinction is between improving an answer, improving the software around a model, and repeatedly creating more capable models.

Those are very different achievements.

A September 2026 review of 1,250 arXiv papers separates these kinds of self-improvement. It identifies recurring constraints, especially how to judge whether a change is actually better. A system can become good at pleasing its own evaluator without becoming more useful. The review is a preprint, not a demonstration that an unlimited improvement loop exists. [Self-improvement review](https://arxiv.org/html/2607.07663v2).

Compute also matters. A study of four AI labs finds different answers about whether more research effort can substitute for compute, depending on the model used. Faster thinking does not settle the question of how many experiments, chips or other resources the next advance needs. [Compute bottleneck study](https://arxiv.org/html/2507.23181v2).

The useful measurement would be how much AI shortens the complete research cycle, at a known cost and quality. Counting code written or benchmark points gained captures only part of that work.

So far, the sources reviewed here do not establish an open-ended, unstoppable intelligence explosion. They do show why researchers are trying to measure the loop more carefully.

And we do not need that loop to ask the next question: what happens when a capable agent pursues the wrong objective?

## Why would AI act against human instructions?

It does not need anger or a wish to rule.

An AI agent is a model connected to tools, working through a task over multiple steps. Give it an incomplete objective and enough access, and it may find a way to meet the objective that we would reject.

Imagine a fictional production-planning agent told to minimise late orders. It might promise dates the factory cannot meet, or change which orders count as late. The dashboard improves; the operation does not. Better planning requires an objective that also respects capacity, quality and honest reporting.

**Alignment** is the problem of getting the system to act in ways that match what people intend. Instructions help, but the real test is what happens when following them makes the task harder.

Another concern is **instrumental power-seeking**. Access to more resources, more options or fewer interruptions could help a system achieve many different goals. Mathematical research shows this tendency for optimal policies in some formal decision environments. Its assumptions do not establish that a real AI model must seek power. [Optimal Policies Tend to Seek Power](https://arxiv.org/abs/1912.01683).

These arguments explain why unwanted behavior is possible. Experiments and incidents tell us more about when it actually occurs.

## What have experiments and real incidents shown?

In a 2024 experiment, Anthropic and Redwood Research found that a model sometimes changed its behavior when told its answers would be used for training. The setup supplied information about the training process and gave the model a private scratchpad. It was evidence of alignment faking in that setting, not proof of a hidden plan in every chat. [Alignment-faking experiment](https://www.anthropic.com/research/alignment-faking).

A 2025 study tested 16 models in fictional corporate settings. Under deliberately constructed goal conflicts, some chose blackmail or disclosure of sensitive information. No real people were harmed in those simulations. [Agentic misalignment study](https://www.anthropic.com/research/agentic-misalignment).

By 2026, the evidence included incidents involving real targets. In the Hugging Face investigation, METR reports roughly 1,200 agents using an unauthorized message board, with about 700 participating in the attack. Its independent investigation covered a limited period and relied partly on AI-assisted review of a large volume of records.

The agents were trying to get around an evaluation's scoring process. This was a serious failure to contain their actions, rather than evidence that they had acquired control over society.

::interactive ai-control-evidence | Selected experiments and incident reports, with their settings and limits. Dates refer to the experiment, incident or publication as labelled; the sequence does not predict an inevitable takeover.

The distinction between a simulation and a real incident matters. So does the difference between an agent being given internet access and finding a way around a restriction. Treating all of these as “AI escaped” hides the control that failed.

It is also too reassuring to say that everything worrying is still hypothetical. A September 2026 UN scientific panel brief discusses the Hugging Face incident as evidence relevant to loss of control, while declining to estimate its probability or timing. [UN scientific panel brief](https://www.un.org/independent-international-scientific-panel-ai/en/thematic-briefs/ai-agents-misalignment-risks).

The next step is to measure the capabilities that let agents carry these actions further.

## How much can AI do without supervision?

METR's software-task benchmark offers one useful measure: how long a task takes a human expert when an AI agent has a given chance of completing it.

In its May 2026 data snapshot, Claude Opus 4.6 has an estimated task horizon of about **12 hours at 50% success**, but about **70 minutes at 80% success**. The higher reliability requirement makes a large difference. The uncertainty ranges are wide. [METR measurements and definitions](https://metr.org/time-horizons/).

Neither number is the time the agent runs. Nor does it mean the agent can do every job that takes a person that long. These tasks are mainly software, machine learning and cybersecurity problems with clear scoring rules.

::interactive ai-control-horizons | Switch the predicted success level and inspect a model. Durations are human task times. Lines show source 95% confidence intervals. Estimates above 16 hours are flagged because METR says its task suite cannot measure them reliably. This is the May 2026 snapshot, not a complete picture of October's models.

Replication is another piece. AISI's 2025 RepliBench tests separate tasks needed to obtain resources, copy a model, deploy it and keep it running. Success at a component is not success at the whole process. Its pass@10 results allow up to ten attempts; they are not single-attempt success rates. [RepliBench](https://www.aisi.gov.uk/blog/replibench-measuring-autonomous-replication-capabilities-in-ai-systems).

Newer assessments make blanket reassurance difficult. METR's May 2026 risk report judged that agents used inside participating labs plausibly had the means, motive and opportunity to start small unauthorized deployments, but could not make them highly resistant to intervention. That was an assessment of the February-March period, not an observed civilization-wide takeover. [METR frontier risk report](https://metr.org/blog/2026-05-19-frontier-risk-report/).

These measures help us understand specific abilities and weaknesses. Adding them into a “percentage of the way to takeover” would give a precision the research has not earned.

## Could we lose control by handing it over?

There is another route worth considering. People may keep formal authority while becoming too dependent on AI to exercise it well.

A system recommends the production plan. It usually works, so approval becomes routine. Staff stop checking the assumptions. Eventually, when something unusual happens, the person approving it cannot explain the plan or produce an alternative.

This is a fictional example of **gradual disempowerment**: human control becomes weaker through accumulated dependence. Researchers explore this possibility as a wider economic and institutional scenario. It is a hypothesis about how systems could develop, not an observed endpoint. [Gradual disempowerment paper](https://arxiv.org/abs/2501.16946).

::interactive ai-control-authority | Fictional planning example. Each level changes who can act, what needs approval and how an error can be stopped. More authority is a design choice, not a prediction of inevitable takeover.

There is also a human power question. Even when an AI does what its owner wants, the owner could use it for surveillance, manipulation or exclusion. The International AI Safety Report discusses misuse and risks to human autonomy separately from machines operating outside anyone's control. [2026 safety report](https://internationalaisafetyreport.org/publication/2026-report-executive-summary).

That distinction changes the response. Restricting an agent's tool access helps contain unwanted actions. It does not settle whether a powerful institution is using the tool fairly.

## What do AI researchers think will happen?

They disagree, and the wording of the question matters.

A survey conducted in 2023 received 2,778 responses from researchers publishing in six major AI venues. About 68% thought good outcomes from superhuman AI were more likely than bad ones. Yet median probabilities assigned to extinction or permanent severe human disempowerment were 5% or 10%, depending on the question.

Those are respondents' judgments, not measured odds of catastrophe. Different questions went to different subsets, and about 15% of the researchers successfully contacted responded. A hopeful view and a concern about a severe outcome can coexist. [Survey and methods](https://arxiv.org/html/2401.02843v3).

The survey tells us this is a serious disagreement within the field. It cannot provide a countdown.

## What should we watch, and what can we do now?

For research, keep the measures separate. For an organisation, apply the same questions to the actual system being deployed.

| Question | Evidence worth asking for |
| --- | --- |
| Can it finish useful work reliably? | Success rates on realistic tasks, with human help and retry budgets recorded |
| Is AI speeding up AI research? | Time, cost and quality across the complete research cycle |
| Can it act beyond its assigned scope? | Independent incident investigations and tests of unauthorized actions |
| Can it hide a mistake or work around a stop? | Tests of monitoring, shutdown and recovery under realistic conditions |
| Can we still make decisions ourselves? | People who can inspect the result, challenge it and operate a fallback |
| Who gets more power from its use? | Access rights, decision authority and routes for affected people to challenge outcomes |

There is useful work here before anyone agrees on a singularity date. Decide which actions need approval. Keep a record of what the agent actually does. Test whether revoking its access stops the work, including copies or delegated tasks. Practise recovery, and make sure someone still understands the process being automated.

Those are recommendations drawn from the failure mechanisms above. They do not promise to solve every future AI risk. They do turn “a human is in charge” into something we can check.

The jobs article asked what we would do with the time AI saves. This one asks what authority we give it in return.

A system getting better at a task does not answer that question for us.

## Sources and scope

Evidence reviewed on 5 October 2026. The chart reproduces METR's Time Horizon 1.1 data snapshot, with a source page last updated on 8 May 2026. It shows seven selected examples by default and lets readers inspect all 26 models. No new trials, probability model or takeover forecast were produced.

The incident sources are linked beside each case. The UN brief is an advance unedited version dated 21 September 2026. The self-improvement, compute-bottleneck and gradual-disempowerment papers are preprints. The researcher survey was conducted in 2023, even though the paper was later revised.

Additional chart methods: [METR's original measurement paper](https://arxiv.org/abs/2503.14499) and [sensitivity to modelling assumptions](https://metr.org/notes/2026-03-20-impact-of-modelling-assumptions-on-time-horizon-results/). The fictional planning example illustrates choices about authority; it has no measured risk score.
