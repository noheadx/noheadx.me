---
draft: true
categories: ['Leadership', 'Tech', '2025']
date: "2025-11-11T00:00:00Z"
title: 'Multi-AZ Is Not Enough: Leadership Lessons from 12 Hours of AWS Darkness'
summary: "Draft article on multi-az problems"
---

**On October 20, 2025, at 12:11 AM Pacific time, AWS began investigating "increased error rates" in US-EAST-1. By the time services fully recovered at 3:01 PM that afternoon, the internet had been effectively broken for nearly 15 hours.**

Signal couldn't send messages. Atlassian's services were down. Docker Hub was unreachable. Apple services faltered. Perplexity AI went dark. Even AWS's own internal support systems failed, leaving engineers unable to open tickets about the outage they were experiencing.

The root cause? A DNS race condition in DynamoDB's automated management system. A single empty DNS record made DynamoDB disappear from the internet. And because DynamoDB underpins much of AWS's infrastructure, 113 services cascaded into failure.

Here's what should terrify every CTO: many of those affected services were running in multi-AZ configurations. They followed the playbook. They deployed across availability zones. They checked the resilience boxes.

And they went down anyway.

## The Multi-AZ Illusion

Multi-AZ deployment has become infrastructure orthodoxy. Deploy across multiple availability zones, the guidance says, and you're protected against data center failures. It's in every AWS Well-Architected Framework review. It's in every compliance checklist. It's what consultants recommend and auditors look for.

And it's woefully insufficient.

The AWS outage exposed a uncomfortable truth: **multi-AZ protects against facility-level failures, not service-level failures**. When DynamoDB's DNS failed, it didn't matter that your EC2 instances were spread across three availability zones. DynamoDB couldn't be reached from any of them.

Werner Vogels, Amazon's CTO, famously said "everything fails, all the time." What he didn't say, but this outage demonstrated, is that sometimes everything fails all at once, across all your carefully separated zones.

The cascading failures told the real story:

**Phase 1 (11:49 PM - 2:24 AM)**: DynamoDB DNS failure causes immediate service disruption across US-EAST-1. Applications can't resolve `dynamodb.us-east-1.amazonaws.com` to IP addresses. DynamoDB effectively disappears.

**Phase 2 (2:24 AM - 5:28 AM)**: After DynamoDB DNS is fixed, EC2's DropletWorkflow Manager attempts to re-establish leases across the entire EC2 fleet simultaneously. The scale is so massive that leases time out before completion, causing "congestive collapse" requiring manual intervention.

**Phase 3 (5:28 AM - 3:01 PM)**: Network Manager propagates a huge backlog of delayed network configurations. New EC2 instances experience connectivity issues. Network Load Balancers fail health checks. Lambda, ECS, CloudWatch all remain impaired.

**Total recovery time: nearly 15 hours.** For services that were supposed to be highly available. That were deployed across multiple zones. That had followed best practices.

## When "Too Big to Backup" Means "Ready to Fail"

While AWS was recovering from DNS failures, South Korea was confronting something worse: permanent data loss at national scale.

On September 26, 2025, a fire broke out at South Korea's National Information Resources Service (NIRS) data center in Daejeon. A lithium-ion battery exploded during maintenance, triggering a blaze that destroyed 858 terabytes of government data on the G-Drive cloud storage system.

The damage was catastrophic. Business registrations gone. Visa applications lost. Food safety certifications erased. Eight years of work from 125,000 government employees. Permanently. Unrecoverably.

The reason? **No backups.** None.

An unnamed government official explained to The Chosun: "The G-Drive couldn't have a backup system due to its large capacity."

Read that again. 858 terabytes was considered "too large" to backup. For context, that's roughly $5,150 per month for redundant cloud storage. Less than the cost of a single mid-level engineer. For a government operating a national cloud infrastructure serving three-quarters of a million civil servants.

This wasn't a technical constraint. Amazon Glacier could have backed it up for $1,013 monthly. A rack of 50 Ironwolf Pro drives could have provided petabyte-scale local backup for under $25,000 one-time. The cost was trivial compared to the consequences.

This was an organizational failure. Leadership that didn't understand the risk. Budgets that prioritized convenience over resilience. A culture where "large-capacity" became an excuse rather than a requirement for more robust disaster recovery.

## The Leadership Blind Spot

Both incidents, wildly different in cause and context, reveal the same fundamental problem: **CTOs and executives confuse compliance with resilience**.

Multi-AZ deployment checks a box. It satisfies auditors. It looks good in architecture reviews. But it doesn't answer the question: "What happens when our dependencies fail?"

The South Korean government mandated G-Drive storage for all work materials. They invested in centralized infrastructure. They probably reviewed disaster recovery plans. But no one asked: "What if the data center burns down?" Or if they did ask, someone answered "too expensive to backup" and that was accepted.

This is the trap. Leadership focuses on the visible metrics, the checkboxes, the compliance requirements. What's harder to see, harder to justify budget for, and harder to test is true resilience.

Consider what actually happened during the AWS outage:

Organizations with **multi-region architectures**, maintaining warm standby or active-active configurations in separate regions, were able to failover and maintain service. Their customers might have noticed latency increases but not outages.

Organizations with **multi-AZ within a single region** went dark. Their applications couldn't reach DynamoDB. Their monitoring couldn't reach CloudWatch. Their status pages couldn't update because they ran on affected infrastructure.

The architectural decisions that separated these two outcomes were invisible during normal operations. Both looked equally "highly available" on paper. The difference emerged only when core dependencies failed.

## What Multi-AZ Actually Protects Against

To be clear: **multi-AZ deployment is not useless**. It protects against real, common failure modes:

- **Power failures** at a single facility
- **Network connectivity issues** to one availability zone
- **Hardware failures** localized to specific data centers
- **Planned maintenance** requiring zone rotation
- **Facility-level disasters** like fires or floods affecting one location

These are significant risks. Multi-AZ is table stakes for production deployments.

But multi-AZ does **not** protect against:

- **Regional service outages** (like the DynamoDB DNS failure)
- **Control plane failures** affecting zone management
- **Shared service dependencies** (IAM, Route53, CloudWatch)
- **Network-level attacks** on regional infrastructure
- **Software bugs** in services spanning multiple zones
- **Capacity constraints** during large-scale recovery events

The distinction matters. When leadership believes multi-AZ equals "disaster recovery," they stop asking harder questions about dependencies, regional failures, and true isolation.

## The Real Cost of Downtime

The AWS outage's economic impact remains being calculated, but estimates suggest hundreds of billions of dollars in lost productivity, transactions, and trust.

South Korea's data loss cost extends beyond the immediate $5,000 monthly backup expense they avoided. **Operations are "practically at a standstill"** at affected agencies. Businesses can't prove registrations. Citizens can't complete visa applications. Product certifications are gone. The reputational damage to South Korea's digital government initiatives is immeasurable.

One data recovery specialist, dispatched to restore systems, died from the stress and overwork.

These aren't abstract technical failures. They're business failures with human consequences. When CTOs accept "too expensive to backup" or "multi-AZ is enough," they're not making technical trade-offs. They're accepting business risks that executives and boards likely don't fully understand.

## Evaluating True Resilience: A Framework

If multi-AZ isn't enough, what is? The answer depends on your risk tolerance, but here's a framework for evaluating true resilience:

### 1. Map Your Blast Radius

**Question:** If this dependency fails completely, what stops working?

For AWS users, the October outage revealed that DynamoDB had a blast radius including EC2, Lambda, ECS, CloudWatch, and hundreds of customer applications. That's a single point of failure masquerading as distributed infrastructure.

**Action:** Document every shared dependency. Not just your application's dependencies, but your cloud provider's internal dependencies. If DynamoDB goes down, can you still operate? If IAM fails, can users still authenticate? If Route53 is unreachable, can traffic still route?

### 2. Test Regional Failure Scenarios

**Question:** Have you actually failed over to your secondary region?

Most organizations test individual component failures. Few test complete regional outages. The AWS incident showed that recovery patterns matter—DWFM's congestive collapse wouldn't have been discovered without massive concurrent recovery attempts.

**Action:** Schedule quarterly chaos drills that simulate complete regional failure. Not just "fail over and check if it works," but sustained operations in secondary regions. Can you deploy new code? Can monitoring alert? Can your team access logging? Can customers complete transactions?

### 3. Understand Recovery Time vs Recovery Point

**Question:** What's the difference between your RTO and your RPO, and what causes that gap?

AWS documented two distinct phases: DNS recovery (RTO for connectivity) and state recovery (RTO for full operations). They're different problems requiring different solutions.

**Action:** Map out recovery phases for your own systems. Getting services online is different from getting them performant. Getting databases accessible is different from having consistent state. Each phase has different requirements, different complexity, and different costs.

### 4. Evaluate Backup Independence

**Question:** Are your backups truly independent of your primary infrastructure?

South Korea kept G-Drive backups... in the same data center. That's not a backup. That's a copy that burns with the original.

**Action:** Implement the 3-2-1-1 rule: 3 copies of data, on 2 different media types, with 1 copy offsite, and 1 copy immutable (ransomware-proof). And "offsite" means different region, different provider, or physical location—not just different availability zone.

### 5. Calculate the Real Cost of Resilience

**Question:** What would true resilience cost, and what does failure cost?

South Korea's government saved $5,150 monthly by not backing up 858TB. The recovery effort, lost productivity, and reputational damage will cost millions or billions.

**Action:** Model the business impact of different failure scenarios. Total regional outage for 15 hours. Permanent data loss. Week-long degraded performance. Then price solutions that prevent each. Present this to executives not as "infrastructure costs" but as "insurance against business-ending events."

### 6. Question Your Vendor's Architecture

**Question:** Does your cloud provider have single points of failure you're inheriting?

The AWS outage revealed that even with multi-AZ deployment, customers inherited AWS's internal architectural dependencies. DynamoDB DNS management became a regional single point of failure.

**Action:** Request architecture reviews from your cloud providers. Understand their control plane design. Know which services are truly independent and which share fate. Consider multi-cloud strategies for truly critical workloads—not because any single cloud is unreliable, but because control planes can fail.

## What Actually Works

Organizations that maintained service during the AWS outage shared common patterns:

**Active-active multi-region deployment**: Traffic routing automatically to healthy regions without manual intervention. Not warm standby—active. Production traffic flowing to multiple regions simultaneously.

**Service-level redundancy**: Critical paths didn't depend solely on regional services like DynamoDB. Some used multi-cloud approaches. Others had completely independent stacks per region.

**Graceful degradation**: Applications could operate in reduced functionality mode when dependencies failed. Not "everything works or nothing works," but tiered capabilities that degrade predictably.

**Observable and testable**: Comprehensive monitoring that itself didn't depend on affected infrastructure. Runbooks tested quarterly, not annually. Chaos engineering that proved failover actually worked.

**Executive understanding**: Leadership that understood the cost-benefit trade-offs and allocated budget for resilience, not just for features.

The common thread: **these organizations treated disaster recovery as a strategic capability, not a compliance checkbox**.

## The Path Forward

Here's what needs to change:

**For CTOs**: Stop accepting "multi-AZ" as the answer to "are we resilient?" Start asking "what happens when the entire region fails?" Model the cost of that failure and present it to executives as business risk, not technical concern.

**For architecture reviews**: Add "blast radius analysis" as a standard component. Every shared dependency should be evaluated: what fails if this fails? What's the recovery pattern? Have we tested it?

**For budgeting**: Frame disaster recovery investment as insurance premiums. A $50,000 monthly cost for active-active multi-region looks expensive until you model the cost of a 15-hour outage. South Korea's $5,150 monthly backup "expense" looks trivial compared to permanent data loss.

**For vendor relationships**: Demand architectural transparency from cloud providers. Understand their internal dependencies. Know their recovery patterns. Hold them accountable for regional failures that affect multi-AZ deployments.

**For organizational culture**: Make disaster recovery testable and tested. If you haven't failed over to your secondary region in the last quarter, you don't know if it works. If leadership hasn't participated in a disaster recovery drill, they don't understand the risks they're accepting.

## The Uncomfortable Truth

Multi-AZ is necessary. It's not sufficient.

The AWS outage proved that regional dependencies can negate multi-AZ resilience. South Korea's fire proved that "too expensive" disaster recovery planning leads to catastrophic, permanent failures.

The responsibility for understanding this distinction belongs to technical leadership. CTOs can't delegate this to cloud architects or compliance teams. When executives ask "are we protected?" the honest answer for most organizations is: "We're protected against common failures. We're vulnerable to catastrophic ones."

That's a business decision, not a technical one. The CTO's job is to make sure executives understand which risks they're accepting, what those risks actually cost in worst-case scenarios, and what true resilience would require.

The next regional cloud outage isn't a matter of if, but when. The next data center fire isn't theoretical. The question is whether your organization will be the one that stays online, or the one explaining to customers, boards, and regulators why multi-AZ wasn't enough.

Because it never was.

---

**Want to evaluate your own disaster recovery posture? Start with these questions:**

1. Have you successfully failed over to your secondary region in the last 90 days?
2. Can you quantify the business cost of being down for 15 hours? For 1 hour? For 1 week?
3. Do your backups live in a different region than your primary infrastructure?
4. Could your organization operate if your primary cloud provider had a control plane failure?
5. Does your executive team understand the difference between multi-AZ and multi-region?

If you answered "no" or "I'm not sure" to any of these, your disaster recovery plan is incomplete. And the gap between "compliance" and "resilience" is where catastrophic failures live.
