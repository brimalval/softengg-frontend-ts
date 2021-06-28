interface Column {
    id: string;
    tasks: Array<KanbanItem>;
    title: string;
}

enum Status {
    IN_PROGRESS = "inprogress",
    FINISHED = "finished",
}

export interface KanbanItem {
    id: number;
    lead: string;
    date: string;
    status: Status;
    name: string;
}

interface TaskData {
    columns: Record<string, Column>;
    columnOrder: Array<string>;
}

export const tasks: TaskData = {
    columns: {
        backlog: {
            title: "Back Log",
            id: "backlog",
            tasks: [
                {
                    id: 0,
                    lead: "John Doe",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Workers United",
                },
                {
                    id: 1,
                    lead: "Jill Doe",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Into the Void",
                },
                {
                    id: 4,
                    lead: "Jane Doe",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Sisters",
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
                    date: Date(),
                    status: Status.IN_PROGRESS,
                    name: "XYZ Company",
                },
                {
                    id: 5,
                    lead: "Kale Brock",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Earth, Wind, Fire",
                },
                {
                    id: 6,
                    lead: "Eyes Misty",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Down Below",
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
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Google",
                },
                {
                    id: 8,
                    lead: "Cindy Looper",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Green Day",
                },
                {
                    id: 9,
                    lead: "Tyler Kutchner",
                    date: Date(),
                    status: Status.FINISHED,
                    name: "Good Project",
                },
            ],
        },
    },
    columnOrder: [],
};
