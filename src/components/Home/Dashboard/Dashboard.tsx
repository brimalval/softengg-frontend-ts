import React, { useEffect, useState } from "react";
import { Button, Paper, Toolbar, Typography } from "@material-ui/core";
import styles from "./Dashboard.module.css";
/** Table imports */
import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableSortLabel,
} from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import {
    Engagement,
    Phase,
    Priority,
    ProjectData,
    Status,
} from "../../../utils/kanban";

interface Props {
    projects: Array<ProjectData>;
    setProjects: React.Dispatch<React.SetStateAction<ProjectData[]>>;
}
const getDateString = (date: Date) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return `${date.getFullYear()}, ${
        months[date.getUTCMonth()]
    } ${date.getDate()}`;
};

interface TableHeaderItemProps {
    alignment?: "left" | "right" | "center";
    id: string;
    label: string;
    currentSortIndex: string;
    sortDirection: "asc" | "desc";
    handler: (field: string) => void;
}

const TableHeaderItem: React.FC<TableHeaderItemProps> = (props) => {
    const { alignment, id, label, currentSortIndex, sortDirection, handler } =
        props;

    return (
        <TableCell align={alignment ?? "right"}>
            <TableSortLabel
                active={currentSortIndex === id}
                onClick={() => handler(id)}
                direction={currentSortIndex === id ? sortDirection : undefined}
            >
                {label}
            </TableSortLabel>
        </TableCell>
    );
};

const Dashboard: React.FC<Props> = (props) => {
    const [sortStates, setSortStates] = useState<{
        sortKey: string;
        sortDirection: "asc" | "desc";
    }>({
        sortKey: "",
        sortDirection: "desc",
    });
    const { projects, setProjects } = props;
    const [sortedProjects, setSortedProjects] = useState(projects);

    const handleSort = (field: string) => {
        if (field === sortStates.sortKey) {
            const currDirection = sortStates.sortDirection;
            setSortStates({
                ...sortStates,
                sortDirection: currDirection === "asc" ? "desc" : "asc",
            });
            return;
        }
        console.log(field);
        setSortStates({
            sortKey: field,
            sortDirection: "asc",
        });
    };

    const stringComparator = (
        strA: string,
        strB: string,
        order: "asc" | "desc"
    ) => {
        const strALower = strA.toLowerCase();
        const strBLower = strB.toLowerCase();
        if (strALower < strBLower) {
            return order === "desc" ? -1 : 1;
        }
        if (strALower > strBLower) {
            return order === "desc" ? 1 : -1;
        }
        return 0;
    };

    /** Sorting the projects */
    useEffect(() => {
        const sortKey = sortStates.sortKey as keyof ProjectData;
        if (!sortKey) {
            return;
        }
        console.log(sortKey, sortStates);
        /** Use the string comparator for all keys except date and deadline */
        if (sortKey !== "date" && sortKey !== "deadline") {
            setSortedProjects(
                projects.sort((projectA, projectB) => {
                    return stringComparator(
                        projectA[sortKey],
                        projectB[sortKey],
                        sortStates.sortDirection
                    );
                })
            );
        }
    }, [sortStates]);

    const getHeaderItem = (
        id: string,
        label: string,
        alignment?: "left" | "right" | "center"
    ) => {
        return (
            <TableHeaderItem
                currentSortIndex={sortStates.sortKey}
                handler={handleSort}
                id={id}
                label={label}
                sortDirection={sortStates.sortDirection}
                alignment={alignment}
            />
        );
    };

    return (
        <div className={styles.tblContainer}>
            <TableContainer component={Paper}>
                <Table className={styles.tbl}>
                    <TableHead>
                        <TableRow>
                            {getHeaderItem("id", "ID", "center")}
                            {getHeaderItem("name", "Name")}
                            {getHeaderItem("date", "Date")}
                            {getHeaderItem("deadline", "Deadline")}
                            {getHeaderItem("engagement", "Engagement")}
                            {getHeaderItem("lead", "Lead")}
                            {getHeaderItem("priority", "Priority")}
                            {getHeaderItem("phase", "Phase")}
                            {getHeaderItem("status", "Status")}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects &&
                            sortedProjects.map((project, index) => {
                                const { date, deadline } = project;
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="center">
                                            {project.id}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {getDateString(date)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {typeof deadline === "object"
                                                ? getDateString(deadline)
                                                : deadline}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.engagement.toString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.lead}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.priority.toString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.phase.toString()}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.status.toString()}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Dashboard;
