# Conceptual Wireflows & State Diagrams: CohortCircle

> **Governance Category:** Visual Interaction Modeling & State Transitions  
> **Status:** **FIVE INTERACTION WIREFLOWS SPECIFIED (WITH COMPLETE ERROR PATHS)**  
> **Integrity Notice:** These are conceptual interaction wireflows designed to validate error handling, decision forks, and recovery paths. They precede the low-fidelity interactive prototype scheduled for Module 05.

---

## Wireflow 01: Learner Profile & Study Preferences (`FLOW-01`)

```mermaid
flowchart TD
    Start01(["User Enters Profile / Preferences"]) --> CheckProfile{"Has Existing<br/>Profile?"}
    
    CheckProfile -- Yes --> LoadForm["Load Saved Profile Data<br/>(Display Name, Bio, Topics, Grid)"]
    CheckProfile -- No --> EmptyForm["Render Empty Profile Form<br/>(Prompt for Topics & Grid)"]
    
    LoadForm --> EditInput["User Enters / Modifies Bio,<br/>Topics, Styles, Grid, Modality"]
    EmptyForm --> EditInput
    
    EditInput --> ClickSave["Click 'Save Preferences'"]
    ClickSave --> ValidateProfile{"Validation Check<br/>(Name? Topics >= 1?)"}
    
    ValidateProfile -- Invalid --> ShowValErr["Display Inline Errors:<br/>'Add at least 1 topic'<br/>Focus to Invalid Field"]
    ShowValErr --> EditInput
    
    ValidateProfile -- Valid --> PersistData["Persist to LocalStorage<br/>(storageAdapter.saveProfile)"]
    PersistData --> SuccessToast["Display Success Toast:<br/>'Preferences Saved'"]
    SuccessToast --> ExploreRedirect["Redirect to Explore Directory<br/>with Active Compatibility Scoring"]
    ExploreRedirect --> End01(["End: Preferences Active"])
```

---

## Wireflow 02: Explore Directory & Multi-Criteria Filtering (`FLOW-02`)

```mermaid
flowchart TD
    Start02(["User Navigates to /explore"]) --> FetchCatalog["Fetch Active Circles from Local State"]
    FetchCatalog --> RenderGrid["Render Circle Grid<br/>Cards with Style, Schedule, Match Score"]
    
    RenderGrid --> UserAction{"User Interaction Type"}
    
    UserAction -- Text Search --> TypeQuery["Enter Keyword Query<br/>(e.g., 'Algorithms')"]
    UserAction -- Filter Pill --> SelectFilter["Select Filters:<br/>Subject, Day, Style, Open Status"]
    UserAction -- Sort Change --> ChangeSort["Select Sort:<br/>Match Score / Soonest / Newest"]
    
    TypeQuery --> ApplyFilterLogic["Apply Logical AND Across All Active Filters"]
    SelectFilter --> ApplyFilterLogic
    ChangeSort --> ApplyFilterLogic
    
    ApplyFilterLogic --> CheckMatches{"Any Matches Found?"}
    
    CheckMatches -- Yes --> UpdateCards["Render Filtered Results<br/>Update Count: 'Showing X of Y'"]
    UpdateCards --> ClickCard["Click Card to View Details"]
    ClickCard --> End02A(["Proceed to Circle Detail"])
    
    CheckMatches -- No --> ShowEmpty["Render Empty State Container:<br/>'No circles match your filters'"]
    ShowEmpty --> ResetCTA["Display 'Reset All Filters' Button"]
    ResetCTA --> ClickReset["User Clicks 'Reset All Filters'"]
    ClickReset --> ClearState["Clear All Pills & Search Inputs"]
    ClearState --> RenderGrid
```

---

## Wireflow 03: Compatibility Inspection & Join / Request Workflows (`FLOW-03`)

```mermaid
flowchart TD
    Start03(["User Enters Circle View /circle/:id"]) --> RenderCircle["Render Circle Profile<br/>Goals, Schedule, Rules, Roster"]
    
    RenderCircle --> InspectChoice{"User Action"}
    
    InspectChoice -- Click Match Badge --> OpenModal["Open Compatibility Breakdown Modal<br/>Subject 35%, Sched 25%, Style 20%"]
    OpenModal --> CloseModal["Close Modal & Return to Circle"]
    CloseModal --> RenderCircle
    
    InspectChoice -- Click Join Action --> CheckCapacity{"Is Circle Full?<br/>(Members == MaxCap)"}
    
    CheckCapacity -- Full --> DisableJoin["Render Disabled 'Circle Full' Badge<br/>Show 'Browse Similar Circles' Link"]
    DisableJoin --> End03A(["Blocked: Capacity Cap"])
    
    CheckCapacity -- Open Seats --> CheckPolicy{"Circle Join Policy"}
    
    CheckPolicy -- Open Policy --> DirectJoin["Click 'Join Circle'"]
    DirectJoin --> CreateMember["Create Membership Record<br/>Increment Active Member Counter"]
    CreateMember --> ShowJoined["Display Success Alert<br/>Unlock Member Session List"]
    ShowJoined --> End03B(["Success: Direct Enrolled"])
    
    CheckPolicy -- Approval Required --> CheckExisting{"Prior Request<br/>Exists?"}
    CheckExisting -- Yes --> ShowPending["Render Disabled Badge:<br/>'Request Pending Host Review'"]
    ShowPending --> End03C(["Blocked: Request Pending"])
    
    CheckExisting -- No --> OpenRequestModal["Open Join Request Modal<br/>Prompt for Introductory Note"]
    OpenRequestModal --> SubmitNote["Enter Note & Click 'Submit'"]
    SubmitNote --> ValidateNote{"Note Provided?"}
    ValidateNote -- Empty --> ShowNoteErr["Inline Error:<br/>'Please provide a 1-sentence note'"]
    ShowNoteErr --> OpenRequestModal
    
    ValidateNote -- Valid --> CreateRequest["Instantiate JoinRequest (status: pending)<br/>Log to Personal Dashboard"]
    CreateRequest --> ConfirmRequest["Display Confirmation Toast<br/>Button updates to 'Request Pending'"]
    ConfirmRequest --> End03D(["Success: Application Submitted"])
```

---

## Wireflow 04: Host Circle Creation & Membership Moderation (`FLOW-04`)

```mermaid
flowchart TD
    Start04(["Host Navigates to /host/create-circle"]) --> Step1["Wizard Step 1: Basics<br/>Title, Subject Domain, Description"]
    Step1 --> Step2["Wizard Step 2: Charter<br/>Syllabus Goals, Pacing Expectations"]
    Step2 --> Step3["Wizard Step 3: Style & Modality<br/>Study Style, Format, Venue / URL"]
    Step3 --> Step4["Wizard Step 4: Logistics<br/>Day/Time, Cap (2-8), Join Policy"]
    
    Step4 --> ClickPublish["Click 'Publish Study Circle'"]
    ClickPublish --> ValidateWizard{"Form Valid?<br/>(Title? Cap in 2..8?)"}
    
    ValidateWizard -- Invalid --> ShowStepErr["Highlight Invalid Step & Input<br/>'Cap must be between 2 and 8'"]
    ShowStepErr --> Step4
    
    ValidateWizard -- Valid --> CreateCircleRec["Instantiate StudyCircle & Host Membership<br/>Persist to LocalStorage"]
    CreateCircleRec --> OpenHostHub["Redirect to Circle Management Console"]
    
    OpenHostHub --> HostModAction{"Host Review Action"}
    
    HostModAction -- Receive Applicant --> OpenQueue["Open Membership Requests Queue"]
    OpenQueue --> ReviewApp["Inspect Applicant Card<br/>Profile, Match %, Intro Note"]
    ReviewApp --> Decision{"Host Decision"}
    
    Decision -- Approve --> ApproveApp["Transition JoinRequest to 'approved'<br/>Create Active Membership<br/>Increment Member Counter"]
    ApproveApp --> CloseCard["Notify Applicant on Dashboard<br/>Update Capacity Status"]
    
    Decision -- Decline --> DeclineApp["Transition JoinRequest to 'rejected'<br/>Optional Feedback Note Recorded"]
    DeclineApp --> PreserveCap["Preserve Circle Seat<br/>Notify Applicant of Decision"]
    
    CloseCard --> End04(["End: Roster Managed"])
    PreserveCap --> End04
```

---

## Wireflow 05: Session Scheduling, RSVP Tracking & Dashboard (`FLOW-05`)

```mermaid
flowchart TD
    Start05(["Host or Member Opens System"]) --> UserRole{"Action Context"}
    
    UserRole -- Host: Schedule Session --> OpenSchedModal["Open 'Schedule Session' Modal"]
    OpenSchedModal --> FillSession["Enter Title, Date, Time, Duration,<br/>Venue/URL, Structured Agenda"]
    FillSession --> ValidateDate{"Date in Future?"}
    ValidateDate -- Past Date --> ShowDateErr["Inline Error:<br/>'Session date must be in future'"]
    ShowDateErr --> FillSession
    
    ValidateDate -- Future Date --> PersistSession["Instantiate StudySession Entity<br/>Host RSVP Set to 'attending'"]
    PersistSession --> PublishAlert["Publish Session to Circle Calendar<br/>Index on Member Dashboards"]
    PublishAlert --> End05A(["Session Scheduled"])
    
    UserRole -- Member: Open Dashboard --> CheckUserCircles{"Has Joined<br/>Circles?"}
    
    CheckUserCircles -- No --> RenderEmptyDash["Render Empty Dashboard State<br/>Show 'Explore Circles' CTA"]
    RenderEmptyDash --> ClickExploreCTA["Click 'Explore Circles' &rarr; /explore"]
    
    CheckUserCircles -- Yes --> RenderFullDash["Render Personal Dashboard<br/>Active Circles, Pending Requests,<br/>Upcoming Sessions Timeline"]
    RenderFullDash --> InspectSessionCard["Inspect Upcoming Session Card<br/>Countdown, Venue, Full Agenda"]
    InspectSessionCard --> ToggleRSVP{"RSVP Action"}
    
    ToggleRSVP -- Click Attending --> MarkAttending["Update RSVP to 'attending'<br/>Increment Confirmed Attendee Count"]
    ToggleRSVP -- Click Declined --> MarkDeclined["Update RSVP to 'declined'<br/>Decrement Attendee Count"]
    
    MarkAttending --> RealTimeSync["Reflect Confirmed Status on Host View"]
    MarkDeclined --> RealTimeSync
    RealTimeSync --> End05B(["RSVP State Synced"])
```
