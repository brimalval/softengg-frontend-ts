export interface Column {
    id: string;
    /** Array of IDs of the tasks */
    tasks: Array<string>;
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
    id: string;
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
 * Interface used to model the structure of a task
 *
 * @interface TaskData
 */
export interface TaskData {
    /** Unique identifier for the task */
    id: string;
    /** Project number is a foreign key referring to a project */
    project: string;
    /** Concisely describes what the task is */
    title: string;
    /** Goes further into what the task is */
    description: string;
    /** Comments? Purpose is not known yet, could just be similar to "remarks" */
    comments: string;
    /** Date the task entry was created */
    dateCreated: Date;
    /** Active tasks are placed on the Kanban board, archived tasks are placed in the Archive List */
    status: "ACTIVE" | "ARCHIVED";
}

/**
 * An interface used to describe the structure of the Kanban board's data
 *
 * @interface BoardData
 * @member Record<string, TaskData> allTasks - List of all the tasks and their look-up IDs as indices
 * @member Record<string, Column> columns - describes column data contained in the board
 * @member Array<string> columnOrder - UNUSED, can be used later on to also reorder the individual columns
 */
interface BoardData {
    allTasks: Record<string, TaskData>;
    columns: Record<string, Column>;
    columnOrder: Array<string>;
}
export const projects: Array<ProjectData> = [
    {
        id: "dfjka5",
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
        id: "afgl1",
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
        id: "3adfk",
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
        id: "123gj",
        lead: "Jane Doe",
        date: new Date(),
        status: Status.COMPLETE,
        name: "Sisters",
        phase: Phase.POST_CONSTRUCTION,
        priority: Priority.MED,
        deadline: "ASAP",
        engagement: Engagement.BIDDING,
    },
    {
        id: "adfs21",
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
        id: "fadj32",
        lead: "Eyes Misty",
        date: new Date(),
        status: Status.COMPLETE,
        name: "Down Below",
        phase: Phase.POST_CONSTRUCTION,
        priority: Priority.MED,
        deadline: "ASAP",
        engagement: Engagement.BIDDING,
    },
    {
        id: "fjk2bz",
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
        id: "fdhjs1",
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
        id: "123g9f",
        lead: "Tyler Kutchner",
        date: new Date(),
        status: Status.COMPLETE,
        name: "Good Project",
        phase: Phase.POST_CONSTRUCTION,
        priority: Priority.MED,
        deadline: "ASAP",
        engagement: Engagement.BIDDING,
    },
];

export const tasks: BoardData = {
    allTasks: {
        "fds123" : {
            id: "fds123",
            title: "Monitor",
            comments: "",
            dateCreated: new Date("2021/07/01"),
            description: "FADF",
            project: "123g9f",
            status: "ARCHIVED",
        },
        "dfsa12" : {
            id: "dfsa12",
            title: "Follow-up",
            description: "",
            dateCreated: new Date("2021/06/29"),
            comments: "",
            project: "fadj32",
            status: "ACTIVE",
        }
    },
    columns: {
        backlog: {
            title: "Back Log",
            id: "backlog",
            tasks: ["fds123"],
        },
        thisWeek: {
            title: "This Week",
            id: "thisWeek",
            tasks: [],
        },
        archived: {
            title: "Archived",
            id: "archived",
            tasks: ["dfsa12"],
        },
    },
    columnOrder: [],
};
