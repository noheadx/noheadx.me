---
title: "Team Dynamics When Your 'Team' Might Be One Person and an AI"
subtitle: "How AI reshapes collaboration, trust, and architectural integrity in modern engineering teams"
date: "2025-12-19T06:00:00"
series: ["What is good software?"]
part: 4
summary: "AI changes how teams work, learn, and make decisions. Leadership must understand these shifts to maintain quality and coherence in complex systems."
categories: ['What is good software?', 'Tech', '2025']
draft: false
---
## Introduction

AI-assisted development has transformed team structures. A single engineer can now accomplish tasks that once required multiple contributors. Tools like Lovable and modern copilots allow individuals to deliver features, scaffolding, and internal tools without waiting for coordination. While this increases flexibility and speed, it also leads to uneven knowledge distribution, fragmented architectural decisions, and the risk that junior developers may not learn essential fundamentals.
Leadership must both understand these dynamics and take concrete steps to address them effectively. While management schedules and assigns work, leadership must deliberately foster system stability, guide skill development, and ensure predictable outcomes. Leaders should articulate clear expectations, define collaborative processes, and actively maintain a shared technical understanding as AI shifts the boundaries of how teams work together.
This article explores how AI is transforming team structures, identifies where collaboration remains essential, and explains why leadership must actively guide team dynamics to prevent fragmented systems and shallow technical growth.

## The Shift From Collective Reasoning to Individual Acceleration
Teams have always been more than a set of individuals. Collective judgment is what protects systems from poor decisions that slip through the gaps of a single perspective. This is especially true in complex environments.
AI changes the dynamic. A single engineer can now:
* generate a multi-file feature in minutes
* scaffold infrastructure code from a brief description
* create integration layers without deep system knowledge
* resolve tasks without pair programming or team alignment

This accelerates throughput, but reduces conversational checkpoints where reasoning is challenged. Traditionally, unclear decisions surface during planning, review, or design discussions. When one person and an AI handle a task end-to-end, fewer of these friction points occur.
AI removes some of the necessary friction that leads to better decisions.

It also removes the feedback loops that prevent bad ones from occurring.
This is not a failure of the individual. It is the result of shifting from collective reasoning toward accelerated independent production.
Leadership must ensure that speed gained from AI does not come at the expense of team alignment and overall system coherence. Leaders should regularly check that rapid production does not bypass shared standards or architectural principles.

---
## Double Diamond as a Team Practice, Not an Individual Routine
The [Double Diamond framework](https://www.designcouncil.org.uk/our-resources/framework-for-innovation-double-diamond/) is often introduced as a model for innovation processes. It is better understood as a teamwork mechanism. The first diamond (problem discovery) and the second diamond (solution definition) require divergent and convergent thinking. Neither diamond is intended to be completed by one person working alone. They depend on conversations that expose blind spots.

AI enables individuals to quickly produce solutions, potentially skipping collective problem exploration and causing teams to converge too soon on seemingly complete answers.
This is one reason why teams using AI often experience architectural drift. The solution is generated quickly, but the problem framing is shallow. Without collective exploration, the system grows in inconsistent directions.
Leaders must take responsibility for ensuring team-wide participation in the discovery process. They should establish practices that bring the team together early in the process, reinforcing that initial exploration cannot be an individual activity if systems are to remain coherent.

## Psychological Safety and the Permission to Slow Down
The move toward AI-assisted development has revealed a new pressure: hesitation to challenge machine-generated output. Developers report uncertainty about when to slow down or question AI proposals. According to the [Qodo 2025 report](https://www.qodo.ai/reports/state-of-ai-code-quality):
* 75 percent of developers will not ship AI code without human review
* Only 3.8 percent fully trust AI output
* Teams with high trust in shared problem understanding report the highest satisfaction

Psychological safety has long been recognized as a factor in engineering effectiveness. In an AI environment, it becomes essential. Developers need explicit permission to:
* push back against AI generated suggestions
* ask for deeper problem framing
* slow down to validate assumptions
* surface uncertainty about architectural implications

Leadership sets this tone by making it clear that engineers are expected and encouraged to challenge AI output. While management can enforce schedules, leaders must build an environment where questioning and collective validation are normalized.
A team that feels pressure to accept AI proposals will accumulate unexamined decisions that eventually turn into structural weaknesses.

## The Trust Gap: Teams Still Do Not Trust AI to Make System-Level Decisions
AI models handle syntax but lack context awareness, such as system boundaries or long-term direction. Developers sense this, so the trust gap persists despite increased use.
This gap is healthy; trusting AI with system-level decisions would be irresponsible.

But mistrust introduces slower cycles unless leadership clarifies the boundaries of AI use.
Clear guidelines include:
* AI may generate code
* AI does not define architecture
* AI may propose patterns
* AI does not set conventions
* AI may assist in refactoring
* AI does not decide ownership boundaries

Without clear rules, teams self-regulate inconsistently, with some overusing AI and others avoiding it. This creates fragmentation.
Leadership must clearly define and communicate the scope of AI authority, specifying where AI can assist and where human oversight is required. Leaders should routinely revisit these boundaries as tools and team practices evolve.

Management cannot solve this issue because the challenge lies in intent, not coordination.

## Code Review Is Now Coaching Instead of Policing
Code review once served as a quality gate. Reviewers looked for defects, inconsistent patterns, or missed edge cases. With AI writing much of the code, review has shifted into a different activity.
Review now involves:
* validating architectural alignment
* detecting AI generated duplication
* identifying hallucinated dependencies
* assessing complexity inflation
* coaching developers on when to distrust AI output
* teaching prompting strategies for better results

This shift reveals a hidden issue. Many senior engineers were never trained to coach. They were trained to correct. AI forces a cultural shift. Teams require leaders who can teach judgment, not only enforce rules.
This is why my earlier post on team dynamics, [*“To Evolve and Mingle”*](https://www.noheadx.me/posts/2019-02-19-how_i_wanna_work_pt3-team/), is more relevant than ever. High-functioning teams evolve when individuals feel safe, share context, and grow through interaction. Teams weaken when collaboration becomes transactional.

Leadership must take deliberate action to foster a coaching culture, ensuring that code reviews prioritize team learning and growth over mere compliance. Leaders should model coaching behaviours and provide support for senior engineers to develop these skills.

## The Mentorship Crisis: Juniors Never Learn What AI Replaces
One of the most significant long-term risks introduced by AI is the erosion of foundational knowledge. Juniors who never write boilerplate or debugging code do not build:
* pattern recognition
* architectural instinct
* debugging intuition
* knowledge of failure modes
* system level reasoning
* understanding of implicit constraints

[MIT Sloan](https://sloanreview.mit.edu/article/the-hidden-costs-of-coding-with-generative-ai/) and [Microsoft Research](https://faculty.washington.edu/ajko/papers/Li2015GreatEngineers.pdf) have warned that overreliance on automation can reduce the depth of engineering judgment.

{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_pt4_mentor_gap.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Using AI in development can lead to a mentorship gap for juniors</strong> ∙ 04 December 2025
        </span>
    </p>
{{< /unsafe >}}

If junior engineers fail to develop these instincts as they evolve into senior roles, organizations will face a capability gap that is invisible today but catastrophic in the future.
Leadership must explicitly safeguard mentorship time by allocating time for knowledge transfer and growth. Leaders need to ensure junior engineers experience foundational learning opportunities that AI tools may bypass.

## Conway’s Law in the AI Era: Tooling Shapes Architecture as Much as Organization
Conway’s Law states that systems mirror the communication structures of the teams that build them. In the AI era, systems also mirror the behavior and biases of the tools used to generate them.
This creates a dual mirror effect:
1. Architecture reflects the organization
2. Architecture reflects the model’s preferred patterns

If teams use different models or prompting styles, the system fragments into stylistic regions. This increases complexity, weakens boundaries, and creates brittle integrations.

The sociotechnical nature of architecture becomes more visible. As reflected on [Duncan Grazier's podcast](https://www.infoq.com/podcasts/transforming-software-engineering-culture-leadership/) on transforming engineering teams: architecture is the result of human design and construction. AI adds a new layer to that structure.

{{< unsafe >}}
    <p style="">
        <img src="/assets/img/GoodSoftware_pt4_conways_law.png" style="width:70%;display: block;margin-left: auto;margin-right: auto;"/>
        <span style="font-size:0.5em;text-align: center;display: block;">
            <strong>Conway's law is no more guiding software developing with AI</strong> ∙ 04 December 2025
        </span>
    </p>
{{< /unsafe >}}

Leadership must recognize and actively address the ways AI modifies Conway’s Law. This includes monitoring how tooling and model choices impact both team communication and system architecture, and taking corrective action when unintended fragmentation emerges.

Without consistent guardrails, AI introduces a second organizational structure that teams never intended to create.

## When a “Team of One” Works and When It Does Not
The rise of platforms like Lovable demonstrates that individual creators can rapidly produce functional tools. This is perfectly appropriate for:
* prototypes
* MVPs
* internal utilities
* personal workflows
* experimental ideas

In these contexts, the “team of one plus AI” model is not only acceptable but efficient.
However, this model does not work for:
* enterprise platforms
* systems with longevity requirements
* integrations that cross multiple domains
* environments with strict security postures
* regulated industries
* mission critical workflows

These systems require collective reasoning, shared understanding, and slow thinking. They rely on teams, not individuals. AI cannot replace this.
Leadership must categorize work accordingly.

Management can assign tasks, but leadership must define boundaries.

## The One-Pizza-Team Still Matters
Research across engineering organizations consistently shows that the most effective team size for complex systems ranges from five to seven individuals. The size one New York pizza feeds. This size allows:
* diverse perspectives
* shared reasoning
* manageable communication overhead
* redundancy of knowledge
* collaboration without bureaucracy

AI does not change this.

It changes the distribution of work inside the team, not the importance of the team itself.
Teams remain the unit of architectural coherence.

Individuals working with AI remain the unit of execution.
Leadership must maintain the integrity of teams even as AI accelerates individual output.

## Summary
AI changes team dynamics profoundly. It accelerates individuals, alters collaboration patterns, weakens traditional feedback loops, and exposes gaps in mentorship and architectural governance. It does not reduce the need for teams, nor does it replace collective reasoning as a driver of system quality.
Leadership must:
* reinforce collective problem discovery
* set clear boundaries for AI usage
* protect mentorship time
* invest in review-as-coaching
* preserve psychological safety
* maintain architectural intent across teams
* ensure consistency of tools and conventions
* classify work correctly so that “team of one plus AI” is used only where appropriate

Management can coordinate tasks, but leadership must create the environment where teams make sound decisions despite the acceleration AI introduces.
Good software still requires good teams.

The definition of “team” may evolve, but the need for collective judgment does not.