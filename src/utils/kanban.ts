interface Column {
    id: string;
    tasks: Array<ProjectData>;
    title: string;
}

enum Status {
    IN_PROGRESS = "in_progress",
    COMPLETE = "complete",
    NOT_STARTED = "not_started",
    ON_HOLD = "on_hold",
    OVERDUE = "overdue",
}

enum Phase {
    NEGOTIATION = "negotiation",
    SCHEMATIC = "schematic",
    DESIGN_DEV = "design_development",
    CONTRACT_DOCU = "contract_documentation",
    CONSTRUCTION = "construction",
    POST_CONSTRUCTION = "post_construction",
    BIDDING = "bidding",
}

enum Priority {
    LOW = "low",
    MED = "medium",
    HIGH = "high",
}

enum Engagement {
    NEGOTIATION = "negotiation",
    SCHEMATIC = "schematic",
    DESIGN_DEVELOPMENT = "design_development",
    CONTRACT_DOCUMENTATION = "contract_documentation",
    CONSTRUCTION = "construction",
    POST_CONSTRUCTION = "post_construction",
    BIDDING = "bidding",
    CONSULTANCY = "consultancy",
    PROJECT_MANAGEMENT = "project_management",
}

/**
 * Used to represent individual projects as per the projects tracker spreadsheet
 * NOTE: Change this according to how the model will look in the back-end later
 * 
 * @interface ProjectData
 */
export interface ProjectData {
    id: number;
    lead: string;
    date: Date;
    status: Status;
    name: string;
    phase: Phase;
    priority: Priority;
    deadline: Date | "ASAP";
    engagement: Engagement;
}

/**
 * An interface used to describe the structure of the Kanban board's data
 * 
 * @interface BoardData
 * @member Record<string, Column> columns - describes column data contained in the board
 * @member Array<string> columnOrder - UNUSED, can be used later on to also reorder the individual columns
 */
interface BoardData {
    columns: Record<string, Column>;
    columnOrder: Array<string>;
}
export const tasks: BoardData = {
    columns: {
        backlog: {
            title: "Back Log",
            id: "backlog",
            tasks: [
                {
                    id: 0,
                    lead: "John Doe",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Workers United",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
                {
                    id: 1,
                    lead: "Jill Doe",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Into the Void",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
                {
                    id: 4,
                    lead: "Jane Doe",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Sisters",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
            ],
        },
        thisWeek: {
            title: "This Week",
            id: "thisWeek",
            tasks: [
                {
                    id: 3,
                    lead: "Eric Son",
                    date: new Date(),
                    status: Status.IN_PROGRESS,
                    name: "XYZ Company",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
                {
                    id: 5,
                    lead: "Kale Brock",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Earth, Wind, Fire",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
                {
                    id: 6,
                    lead: "Eyes Misty",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Down Below",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
            ],
        },
        archived: {
            title: "Archived",
            id: "archived",
            tasks: [
                {
                    id: 7,
                    lead: "Eric Son",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Google",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
                {
                    id: 8,
                    lead: "Cindy Looper",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Green Day",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
                {
                    id: 9,
                    lead: "Tyler Kutchner",
                    date: new Date(),
                    status: Status.COMPLETE,
                    name: "Good Project",
                    phase: Phase.POST_CONSTRUCTION,
                    priority: Priority.MED,
                    deadline: "ASAP",
                    engagement: Engagement.BIDDING,
                },
            ],
        },
    },
    columnOrder: [],
};
