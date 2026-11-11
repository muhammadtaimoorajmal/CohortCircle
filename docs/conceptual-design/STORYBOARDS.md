# Visual Narrative Storyboards: CohortCircle

> **Governance Category:** Scenario Exploration & Behavioral Interaction  
> **Status:** **FOUR STORYBOARD SEQUENCES SPECIFIED (6 FRAMES EACH)**  
> **Integrity Notice:** Storyboards illustrate how representative users interact with the proposed Unified Workspace interface to solve core pain points. No synthetic participant quotations or fake personas are used.

---

## Storyboard A: Learner Discovers and Joins a Compatible Circle

* **User Archetype:** `PROTO-LEARN-01` (Independent Focused Problem-Solver)
* **Initial Situation:** Struggling with solo problem sets in a rigorous computing course; wants a focused study partner.
* **Context:** Commuter student working from a laptop in the campus library before an evening transit commute.

```text
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 1: Initial Need             │ │ Frame 2: Exploring Directory      │ │ Frame 3: Multi-Filter Refinement  │
│                                   │ │                                   │ │                                   │
│ Learner opens CohortCircle on     │ │ Learner navigates to "Explore     │ │ Applies filter pills:             │
│ laptop. Realizes individual study │ │ Circles". Directory displays 12   │ │ [Computer Science]                │
│ on Algorithms is stalling.        │ │ active campus study circles.      │ │ [Silent Co-Study] [Thursdays]     │
│ Goal: Find a focused micro-group. │ │ Action: Types "Algorithms" in     │ │ Interface Response: Directory     │
│                                   │ │ search input. Instant filtering.  │ │ narrows to 2 highly focused cards.│
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 4: Inspecting Circle View   │ │ Frame 5: Direct Join Action       │ │ Frame 6: Dashboard Confirmation   │
│                                   │ │                                   │ │                                   │
│ Clicks "Algorithms Problem Set".  │ │ Notices group status: "Open" with │ │ System displays success banner.   │
│ Reviews charter, 4-member cap,    │ │ 3/4 seats filled.                 │ │ Circle immediately appears on     │
│ and Thursday 18:00 meeting time.  │ │ Action: Clicks "Join Circle".     │ │ "Personal Dashboard" with the    │
│ Decision: Perfect fit for commute.│ │ System: Confirms membership add.  │ │ next upcoming study session card. │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
```

* **Outcome:** Learner joins a high-fit study group in under 90 seconds without broadcast messaging or social awkwardness (`FR-005`–`FR-007`, `FR-013`, `FR-022`).

---

## Storyboard B: Learner Checks Explainable Compatibility Before Joining

* **User Archetype:** `PROTO-LEARN-02` (Conceptual Discussion Seeker)
* **Initial Situation:** Enrolled in a 300-student lecture; hesitant to join groups without knowing whether they discuss concepts or work in silence.
* **Context:** Using a tablet in a campus lounge between morning and afternoon lectures.

```text
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 1: Profile Preferences Set  │ │ Frame 2: Recommended Match Feed   │ │ Frame 3: Triggering Explanation   │
│                                   │ │                                   │ │                                   │
│ Learner sets study preferences:   │ │ Enters Explore directory. Sorts   │ │ Learner notices an "Algorithms    │
│ [Discussion-Based] [Afternoons]   │ │ by "Compatibility". High match    │ │ & Society" circle with a green    │
│ [Max Group Size: 5 members].      │ │ cards surface to the top of feed. │ │ badge: "92% Compatibility Match". │
│ Goal: Find a vocal debate circle. │ │ Goal: Understand why it matches.  │ │ Action: Clicks compatibility tag. │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 4: Inspecting Breakdown     │ │ Frame 5: Request With Note        │ │ Frame 6: Reassurance & Tracking   │
│                                   │ │                                   │ │                                   │
│ Modal appears showing exact breakdown:│ Circle requires host approval.  │ │ System registers pending request. │
│ - Topic Alignment: 100%           │ Action: Fills short intro note:     │ │ Learner feels reassured: group is │
│ - Study Style: Exact Match (Disc) │ "Excited to debate lecture essays!" │ curated and expectations are shared.│
│ - Schedule Overlap: Thursday PM   │ Clicks "Submit Join Request".       │ Dashboard tracks pending status.    │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
```

* **Outcome:** The explainable compatibility breakdown removes uncertainty and builds trust before the student commits time (`FR-009`, `FR-010`, `FR-014`).

---

## Storyboard C: Host Creates and Organizes a Study Circle

* **User Archetype:** `PROTO-HOST-01` (Collaborative Cohort Facilitator)
* **Initial Situation:** Wants to lead a dedicated study group of 4 serious peers to work through weekly problem sets; tired of chaotic WhatsApp chats.
* **Context:** Desktop computer in dormitory room on Sunday evening planning the upcoming academic week.

```text
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 1: Initiating Circle        │ │ Frame 2: Defining Charter & Pacing│ │ Frame 3: Setting Rules & Cap      │
│                                   │ │                                   │ │                                   │
│ Host opens Host Operations on     │ │ Enters title: "Discrete Math Lab" │ │ Sets study style: Problem-Solving.│
│ CohortCircle.                     │ │ Specifies syllabus chapters,      │ │ Enforces hard cap: 4 members max. │
│ Action: Clicks "Create New Study  │ │ learning targets, and recurring   │ │ Sets join policy: "Approval Req." │
│ Circle" button.                   │ │ meeting day: Tuesday 16:30.       │ │ to prevent random group bloat.    │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 4: Reviewing Join Requests  │ │ Frame 5: Moderating Applicant     │ │ Frame 6: Circle Hub Live          │
│                                   │ │                                   │ │                                   │
│ Next day, host visits Host        │ │ Reads applicant's intro note:     │ │ Host clicks "Approve". Member is  │
│ Dashboard. Alert indicates:       │ │ shares exact problem set goals    │ │ added to roster; member counter   │
│ "1 Pending Membership Request".   │ │ and Tuesday afternoon availability│ │ updates to 2/4. Circle is active  │
│ Clicks to review application card.│ │ Decision: Compatible with cohort. │ │ and ready for session planning.   │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
```

* **Outcome:** Host launches a structured, capped learning group and curates members using intentional joining criteria (`FR-016`–`FR-019`).

---

## Storyboard D: Host Schedules a Session and Manages Attendance

* **User Archetype:** `PROTO-HOST-01` (Host) and `PROTO-LEARN-01` (Member)
* **Initial Situation:** Group is formed, but previous experiences in other tools resulted in members ghosting or showing up without preparation.
* **Context:** Laptop in study lounge, 3 days before the scheduled Tuesday meeting.

```text
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 1: Scheduling Session       │ │ Frame 2: Defining Concrete Agenda │ │ Frame 3: Member Receives Card     │
│                                   │ │                                   │ │                                   │
│ Host opens circle management view.│ │ Adds agenda:                      │ │ Member opens Personal Dashboard.  │
│ Action: Clicks "Schedule Session".│ │ - 16:30-17:15: Problems 1 to 3    │ │ Session card appears under        │
│ Sets date: Tuesday Nov 17, 16:30. │ │ - 17:15-18:00: Proof verification │ │ "Upcoming Study Sessions" with    │
│ Location: Library Study Room 302. │ Venue: Library Study Room 302.      │ full agenda and location details.   │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
┌───────────────────────────────────┐ ┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ Frame 4: One-Click RSVP Action    │ │ Frame 5: Real-Time Host Monitor   │ │ Frame 6: Accountable Study Time   │
│                                   │ │                                   │ │                                   │
│ Member inspects session agenda.   │ │ Host opens session console.       │ │ Group meets at Room 302 on Tuesday│
│ Action: Clicks "RSVP: Attending". │ Sees: "3 / 4 Members Attending".    │ Both members arrive prepared with   │
│ System updates attendee list and  │ Knows exactly who is coming and     │ problem sets in hand. Session runs  │
│ adds event to member calendar.    │ can hold the reserved room safely.  │ smoothly without coordination fuss. │
└───────────────────────────────────┘ └───────────────────────────────────┘ └───────────────────────────────────┘
```

* **Outcome:** Session coordination is transparent and accountable without chasing peers across multiple fragmented chat threads (`FR-020`–`FR-022`).
