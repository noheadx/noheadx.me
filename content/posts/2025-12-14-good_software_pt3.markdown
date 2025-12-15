---
title: "Building Quality When AI Writes Most of Your Code"
subtitle: "Why AI accelerates technical debt, and how leadership must respond"
date: "2025-12-14T06:00:00"
series: ["What is good software?"]
part: 3
summary: "AI accelerates output but not judgment. Quality must be engineered deliberately in an era where most code is machine-generated."
categories: ['What is good software?', 'Tech', '2025']
draft: true
---

## Introduction
AI has revolutionized the fundamental principles of software development. What once required teams of experienced engineers can now be generated in minutes by a single individual, prompting the development of large models. Code volume has exploded. Delivery cycles have accelerated. Barriers to entry have shrunk.

But one thing has not changed: **software systems still require architectural integrity, maintainability, and operational resilience.**

And AI does not understand any of those things.

Models generate code based on pattern probability, not system intent. They produce plausible implementations, not aligned designs. They optimize for completing tasks, not for preserving long-term integrity. And because AI operates at a machine scale, while organizations operate at a human scale, the mismatch creates exponential debt.

Leadership (mindset, responsibility, strategic clarity) must recognize that AI does not remove the need for engineering discipline. It increases it. Managers may push for speed, but leadership must ensure the system can survive that speed.

This article examines the technical mechanisms underlying AI-driven debt, the exponential nature of that curve, the importance of quality enforcement, and how leadership—not tooling—determines whether AI becomes an asset or a liability.## The Scale Mismatch: AI Generates More Than Organizations Can Absorb
Historically, code volume scaled linearly with team size. That natural constraint limited architectural drift and duplication. AI removes that constraint entirely.

According to [**GitClear’s AI Code Quality Report (2024–2025)**](https://www.gitclear.com/ai_assistant_code_quality_2025_research), based on 153 million lines of code:
* Code duplication increased **4×**
* Refactoring sharply decreased
* Moved code (a proxy for structural improvement) hit an all-time low
* “Fractal duplication” emerged—similar logic copied across unrelated components

The cause is straightforward:

> **AI generates functional code without understanding the system it joins.**

Where engineers previously invested time in understanding the context before coding, AI inserts code instantly, bypassing the most critical step: interpreting the system architecture and intent.### Key Effect: Volume Exceeds Review Capacity
AI increases:
* Code lines
* New functions
* New dependencies
* Branch complexity
* Edge-case permutations

Meanwhile, review bandwidth remains limited by human capacity.

Quality doesn’t degrade because engineers are sloppy.

It degrades because **AI produces more code than the organization can meaningfully evaluate**.

## Three Vectors of AI-Accelerated Technical Debt
AI-driven debt is not simply “more bad code.” It emerges from three distinct vectors that interact and amplify each other.

These vectors are:
1. **Model Version Drift**
2. **Code Generation Bloat**
3. **Organizational Fragmentation**

Combined, they produce exponential growth.
{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_pt3_diagram_A.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Three Vectors of AI Technical Debt</strong> ∙ 05 December 2025
        </span>
    </p>
{{< /unsafe >}}
Let’s examine each vector in depth.

## 1. Model Version Drift
Large models evolve constantly. Each new version changes:
* abstraction patterns
* control flow tendencies
* naming conventions
* library preferences
* error-handling styles

This causes the codebase to **fracture by generation**.
The code produced in March 2024 does not resemble the code produced in November 2025.

Over time, the system develops geological strata:
* inconsistent styles
* incompatible abstractions
* divergent dependency sets
* unpredictable behavior in refactors

Technical consequences:
* onboarding becomes slower
* readability decreases
* architectural drift increases
* tooling struggles to enforce consistent rules

AI can create code faster than leadership can establish and synchronize standards.
Without structural intent, drift becomes inevitable.

## 2. Code Generation Bloat
AI does not write minimal code. It writes **maximal, statistically safe** code.

Why?
* Verbosity reduces the risk of missing an edge case
* Large completions “feel” more correct to the model
* The reward structure favors elaboration, not elegance

This leads to:
* unnecessary abstraction layers
* deeply nested conditionals
* verbose error handling
* repeated helper utilities
* redundant boilerplate

This bloat increases:
* cyclomatic complexity
* testing surface area
* change risk
* merge conflicts
* long-term operational cost

Even when the code “works,” it imposes **future cost the moment it is generated**.

## 3. Organizational Fragmentation
AI is not used uniformly across teams.

Different groups:
* use different models
* use different prompting styles
* apply different review rules
* hold different quality expectations

The result?

**Architecture fragments.**

Example pattern:
* Team A uses GPT-5, generating functional-style patterns
* Team B uses Claude with heavy OOP patterns
* Team C uses Copilot with mixed local-context conventions
In three months, the codebase will resemble that of three separate companies.

This is not a tooling failure.
It is a **governance failure**.
Without leadership-defined constraints, AI accelerates divergence.

Divergence accelerates entropy. Entropy accelerates debt.

## Why AI-Induced Technical Debt Is Exponential
Traditional (human-generated) technical debt is linear:
> One shortcut → one future cost.

AI-generated debt is exponential:
> One prompt → 30–200 lines of code → multiple clones → replicated flaws → expanded maintenance surface → cascading architectural risk.

To visualize this:
{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_pt3_diagram_B.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Exponential growth of technical debt</strong> ∙ 05 December 2025
        </span>
    </p>
{{< /unsafe >}}

The curve rises because:
1. **Duplication amplifies defects**
2. **New complexity layers multiply review effort**
3. **Model drift keeps generating incompatible shapes**
4. **AI replicates its own mistakes**
5. **Human reviewers cannot scale with machine output**

AI does not create “bad code.”

It creates **more code than your governance model can safely absorb**.

## “Vibe Then Verify”: Modern Quality Gates
[S&P Global](https://securityboulevard.com/2025/09/quality-assurance-in-the-ai-era-a-leadership-imperative/) describes the new paradigm clearly:
> *AI generates plausible output; humans must create the true output.*

This requires a heavier emphasis on:
* context validation
* dependency validation
* architectural boundary checks
* hallucination detection
* duplication scanning
* complexity scoring

### Quality must be front-loaded.
Refactoring must be scheduled.
Review must shift from “bug detection” to **“architectural drift prevention.”**
These needs form the basis for a new operating model:
{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_pt3_diagram_C.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Three Vectors of AI Technical Debt</strong> ∙ 05 December 2025
        </span>
    </p>
{{< /unsafe >}}
AI writes drafts.

Leadership defines standards.

Quality emerges from the combination.

## The Ownership Paradox: When Everyone Can Generate Code
AI creates a new, subtle kind of risk: **ownership dilution**.

Historically:
* Engineers wrote code
* Engineers understood code
* Engineers maintained code

With AI:
* Code appears without deep author comprehension
* Ownership becomes blurred
* Large subsystems are generated without institutional memory

The true danger is *unowned complexity*.

This is most evident in:
* microservice ecosystems
* large internal platforms
* integration-heavy domains
* data transformation pipelines

My earlier article [*“Leaders vs. Managers”*](https://www.noheadx.me/leadership/2024/05/02/how-to-tell-a-leader-from-a-manager.html) explains this dynamic well:
* Leadership provides clarity of purpose and ownership; management coordinates work.
* AI destabilizes this distinction by flooding the system with code faster than ownership can form.

## The Stripe & Airbnb Benchmark: Quality Requires Human Intent
Systems known for resilience—Stripe, Airbnb—deliver consistency for one reason:
> **They are designed intentionally, not accumulated accidentally.**
Examples:
* Stripe’s zero-downtime data movement platform achieves [**99.9995% availability**](https://www.infoq.com/news/2025/11/stripe-data-movement-platform/)
* [Airbnb’s adaptive traffic control system](https://www.infoq.com/news/2025/11/airbnb-adaptive-traffic-control/)
 enforces runtime architectural boundaries

These teams do not rely on AI to define quality.

They rely on:
* leadership clarity
* architectural boundaries
* strict review culture
* investment in resilience
* intentional system evolution
AI may help build components.

But **human leadership determines the system’s integrity**.

## Leadership Responsibilities in an AI-Driven Organization
Leadership is about setting intent, standards, and guardrails—not controlling tasks.
To maintain quality when AI generates code, leadership must:
### 1. **Define architectural intent**
Without intent, AI amplifies ambiguity.
### 2. **Enforce one standard for AI and human code**
No exceptions. No “temporary AI shortcuts.”
### 3. **Mandate quality gates**
Security, duplication, boundaries, complexity.
### 4. **Classify work**
Some areas are safe for AI. Others require human reasoning.
### 5. **Fund refactoring**
Debt compounds faster than before.
### 6. **Prevent fragmentation**
Consistent models, conventions, constraints, and review rules.
### 7. **Create psychological safety for slowing down**
Teams must be able to say:

*“AI generated something wrong. We need time.”*

If leadership creates pressure that discourages this, AI becomes a liability.

## Summary
AI does not redefine what “good software” is.

It simply **accelerates the consequences of unclear leadership**.
The three vectors—model drift, generation bloat, organizational fragmentation—create exponential technical debt that no team can resolve through effort alone. The only effective countermeasure is intentional leadership that defines boundaries, standards, and expectations.
Quality now depends less on writing code and more on **reviewing, validating, governing, and owning it**.
Leadership provides direction and intent.

Management coordinates tasks.

AI produces drafts.

Engineering assembles systems.

Quality emerges when all four align.