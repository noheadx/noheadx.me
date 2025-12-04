---
title: "The Leadership Failures Creating Bad Software at Scale"
subtitle: "Why most technical debt is created long before a single line of code is written"
date: "2025-12-04"
series: ["What is good software?"]
part: 2
summary: "Bad software is rarely the result of weak engineers. It is the result of weak management decisions."
categories: ['What is good software?', 'Tech', '2025']
draft: true
---
## Introduction
Bad software does not appear out of nowhere. It is not primarily caused by inexperienced engineers, rushed sprints, or a shortage of talent. In modern organizations, poor software is often created by management decisions that prioritize speed over clarity, output over understanding, and optimism over discipline.

Most managers outside the development department still assume that technical debt is a technical problem. It’s created by engineers, fixed by engineers, and occurs only within the development organization. But this view ignores what actually shapes outcomes.

The largest drivers of poor software are unclear priorities, undefined problems, unrealistic timelines, architectural shortcuts, and unstable metrics, and these are created well before any developer writes a single line of code. They originate in board rooms where pressure outweighs context and assumptions replace structured discovery.

This article explains how management habits (not technology, btw) can create subpar software at scale, even as generative AI exacerbates the issue.

{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_LeadershipFailure.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Leadership decisions propagate downward into technical debt</strong> ∙ 04 December 2025
        </span>
    </p>
{{< /unsafe >}}

## The First Failure: Skipping the Problem
Many CTOs and product leaders claim to follow structured approaches to discovery. They reference frameworks like the Double Diamond, but in practice, only half of it is used. The diverging first phase, problem discovery, is skipped entirely, replaced by solution discussions that start too early and end too late.

As the [**British Design Council's Double Diamond Framework (2005)**](https://www.designcouncil.org.uk/our-resources/framework-for-innovation-double-diamond/) clearly states: effective solutions come from first understanding the problem, then exploring options, and only then converging on the right answer.

However, most product teams operate as if the first diamond does not exist. They frame “problems” through internal assumptions, incomplete anecdotes, or pressure from stakeholders. The result is predictable:

* Teams solve symptoms instead of causes
* Designs reflect guesses rather than evidence
* Solutions scale the wrong behavior
* Technical debt accumulates because the wrong system is built quickly

This failure is not theoretical. McKinsey’s research on structured decision-making shows that organizations using disciplined problem-first approaches deliver **up to 40 percent faster** because they avoid rework and misalignment.

When leaders skip the first diamond, they force teams into blind execution. Velocity increases temporarily. Debt increases permanently.


### Treating Symptoms Instead of Causes
One scenario appears across industries: a performance issue emerges, a spike in incidents occurs, or a critical workflow becomes unreliable. Tech or product leads often responds by mandating fixes without inquiring into the root cause of the problem.

A recurring pattern unfolds:
1. Teams patch the failure.
2. Symptoms improve temporarily.
3. The system becomes more fragile.
4. The underlying cause remains untouched.

Treating symptoms is easier than reframing the entire system, especially under pressure. But surface fixes rarely solve systemic issues. They only postpone them.

[My article “The Enforcement Trap”](https://www.noheadx.me/posts/2025-10-09-responsibility_of_few/) illustrates this dynamic perfectly. The executive saw symptoms and demanded immediate solutions. Only after deeper involvement did they realize the underlying problem was organizational alignment, not engineering competence.

When leadership treats symptoms rather than causes, technical debt is not a side effect. It becomes the organizational strategy.


##  The Second Failure: AI as an Excuse for Speed
Generative AI has reshaped how engineers write code, but interpretations of its leadership implications vary widely. Many organizations treat AI as an accelerator that justifies cutting corners.

But the reality looks slightly different.

[**GitClear’s 2024–2025 analysis**](https://www.gitclear.com/ai_assistant_code_quality_2025_research) of 153 million lines of AI-assisted code revealed an **4× increase in code duplication**, a collapse in refactoring, and a surge in low-quality code fragments.

This is not because developers are careless. It is because management encourages speed and uses AI as validation for unrealistic timelines. The mindset changes subtly:
* “We can deliver more now that we have AI.”
* “Quality gates can be delayed! We need to ship.”
* “AI writes the boilerplate; we only need to fix the rest.”

AI accelerates the production of functional code, but it does not strengthen architectural reasoning. It does not enforce boundaries. It does not handle complexity. It does not differentiate between what works and what lasts.

Executive teams that assume “AI will close the gaps” often end up creating systems that appear productive but become impossible to maintain.


### The “Army of Juniors” Problem
One of the most telling analyses comes from [Ox Security’s “Army of Juniors: The AI Code Security Crisis”](https://www.ox.security/wp-content/uploads/2025/10/Army-of-Juniors-The-AI-Code-Security-Crisis.pdf) report (2025).

The report highlights a sharp increase in code that is:
* functional but context-ignorant
* syntactically correct but structurally weak
* composed of fragments that violate architectural rules
* insecure due to hallucinated dependencies and flawed assumptions

AI-assisted development does not create senior-level judgment. It amplifies the lack of it.

When organizations rely heavily on AI without compensating for governance, they effectively turn their engineering departments into “armies of juniors”. These are teams capable of producing large amounts of code quickly but lacking the architectural oversight needed to keep systems stable.

This phenomenon explains why many companies see increasing output while stability, security, and maintainability deteriorate.

The cause is not AI. The cause is management that confuses democratization with readiness.


### Management’s Blind Spot: Misaligned Metrics
Another major source of organizational fragility is the continued reliance on outdated or superficial metrics. Management celebrates numbers that have little correlation with actual quality:
* feature adoption
* velocity
* story points
* releases per month
* deployment frequency
* number of AI-generated tasks closed

These metrics say nothing about structural integrity. They measure motion, not progress.

Meanwhile, technical debt compounds quietly. Integrations get brittle. Ownership becomes unclear. AI-generated code adds silent duplication. Architectural boundaries blur. Review quality decreases as workloads increase.

Leaders rarely see this until a crisis occurs. And when the crisis hits, they often conclude the engineering team is the problem.

But the real issue is that the managers measured the wrong things.


## The Third Failure: Confusing Democratization with Capability
The rise of no-code tools, AI code assistants, and developer automation creates a powerful illusion: that building software is becoming easier. It is becoming faster, certainly. But ease is not the same as capability.

Democratization enables more people to create functional tools. It does not equip them to create maintainable, secure, scalable, or long-lived systems.

Management often assumes:

* “If everyone can build, everyone can build well.”
* “If tools generate code, expertise matters less.”
* “If AI writes the boilerplate, we can move faster safely.”

None of these assumptions holds true.

Tools extend capability, but they do not replace judgment. They accelerate output, not understanding. They amplify both strengths and weaknesses.

Management teams that mistake democratization for competence routinely approve systems that work on day one but collapse on day 180.


### The HeartFlow Lesson: Catastrophic Failure Comes From Above
A telling example of management-induced failure comes from [**HeartFlow’s microservices migration**](https://www.infoq.com/news/2025/11/heartflow-migration-recovery/), documented in an InfoQ case study.

HeartFlow attempted a large-scale migration without proper architectural governance, correct sequencing, or alignment. The result:
* migration failure
* multi-quarter delays
* compounding defects
* instability
* growing operational risk

What saved the initiative was not rewriting code. It was reframing leadership expectations, re-establishing governance, and aligning incentives around quality and sequencing rather than speed.

The case demonstrates that catastrophic failures originate not from “bad engineers” but from management misjudgment, misalignment, and pressure without context.


### Why Management Decisions Carry More Weight Today
In earlier eras, engineering teams had more control over quality. Today, the environment is more brittle:
* systems are interconnected
* Regulatory pressure has increased
* security threats are constant
* AI generates volume without understanding
* teams are globally distributed
* product cycles are faster
* reliability expectations are higher
* data volumes are massive

This means management decisions are magnified. A single misaligned directive can generate exponential downstream cost.

Examples include:
* launching features without architectural reviews
* setting deadlines before understanding complexity
* allowing AI-generated code without governance
* undervaluing refactoring because it “produces nothing visible.”
* praising speed without evaluating consequences
* ignoring debt until it reaches crisis level

Technical missteps are rarely engineering failures. They are organizational ones.

## The Fourth Failure: The Absence of Guardrails
CEOs often treats governance as a slowdown. In reality, guardrails increase delivery speed because they eliminate ambiguity and prevent architectural drift.

Leading companies apply consistent guardrails such as:

* [Problem Briefs before solution discussions](https://ctosub.com/p/the-ctos-double-diamond)
* Architectural review as a standard, not an exception
* Clear definitions of ownership
* Non-negotiable security norms
* Quality gates for AI-generated code
* Metrics that track system health, not just activity

When these guardrails are absent, teams rely on intuition, negotiation, and improvisation to guide their decision. This works for small prototypes, not for enterprise systems.

Organizations without guardrails do not fail quickly. They fail silently. Until the system grows large enough to reveal the accumulated damage.


### Management Creates Technical Bankruptcy When It Measures the Wrong Things
Two opposing worlds exist inside most companies:
* the world management believes exists
* the world engineering actually sees

Leaders see dashboards full of green lights, features shipped, and forecasts met. Engineers often encounter duplicated logic, brittle integrations, unrealistic timelines, and escalating maintenance costs.

When a CEO insists on measuring only growth and output, he encourages teams to hide the true state of the system. This is how technical bankruptcy occurs.

Technical bankruptcy is not a sudden event. It is the cumulative effect of decisions made without understanding the system they influence.

{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_SymptomRoot.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Not fixing the root causes will end up in a symptom loop</strong> ∙ 04 December 2025
        </span>
    </p>
{{< /unsafe >}}

## Summary
Bad software does not appear because engineers lack the necessary skill. It appears because their management prioritizes speed over clarity, optimism over evidence, and metrics over outcomes. Modern systems are too interconnected, too rapidly changing, and too exposed to support traditional patterns of decision-making.

Leadership failures create:
* misaligned incentives
* premature solutioning
* debt-friendly environments
* mislabeled systems
* rushed architectural decisions
* misplaced trust in automation
* unrealistic timelines
* blind spots in measurement

When management fails to take responsibility for quality, technical debt becomes the standard operating model.

The next article will examine the technical realities of building quality when AI writes most of the code and why discipline on management level is more important now than at any time in the past two decades.