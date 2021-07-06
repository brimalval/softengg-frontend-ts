import React, { useState } from "react";
import { Grid, Paper, Theme } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/styles";
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

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            fontWeight: "bold",
        },
        body: {
            fontSize: 14,
        },
    })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)(TableRow);
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
        <StyledTableCell align={alignment ?? "right"}>
            <TableSortLabel
                active={currentSortIndex === id}
                onClick={() => handler(id)}
                direction={currentSortIndex === id ? sortDirection : undefined}
            >
                {label}
            </TableSortLabel>
        </StyledTableCell>
    );
};

const Dashboard: React.FC<Props> = (props) => {
    const [sortStates, setSortStates] = useState<{
        sortKey: string;
        sortDirection: "asc" | "desc";
    }>({
        sortKey: "name",
        sortDirection: "asc",
    });
    const { projects, setProjects } = props;
    const [sortedProjects, setSortedProjects] = useState(projects);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /** Handler function for setting the sorting criteria
     *
     * @function handleSort
     * @param field string that denotes the property that will be sorted according to
     */
    const handleSort = (field: string) => {
        if (field === sortStates.sortKey) {
            const currDirection = sortStates.sortDirection;
            setSortStates({
                ...sortStates,
                sortDirection: currDirection === "asc" ? "desc" : "asc",
            });
            return;
        }
        setSortStates({
            sortKey: field,
            sortDirection: "asc",
        });
    };

    /**
     * Handler function for changing the page number
     *
     * @function handleChangePage
     * @param event
     * @param newVal new value of the page number
     */
    const handleChangePage = (event: unknown, newVal: number) => {
        setPage(newVal);
    };

    /**
     * Handler function for changing the number of rows per page
     *
     * @function handleChangeRowsPerPage
     * @param event React.ChangeEvent<HTMLInputElement>
     */
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    /** Comparator for string objects
     * Results in -1 if the first string comes first in lexical order, 1 if second, 0 otherwise
     * the result gets multiplied by -1 if the user wants to sort in descending order
     *
     * @param strA first string being compared
     * @param strB second string being compared
     * @param order either "asc" or "desc"
     * @returns 1 | 0 | -1
     */
    const stringComparator = (
        strA: string,
        strB: string,
        order: "asc" | "desc"
    ) => {
        const strALower = strA.toLowerCase();
        const strBLower = strB.toLowerCase();
        if (strALower < strBLower) {
            return order === "asc" ? -1 : 1;
        }
        if (strALower > strBLower) {
            return order === "asc" ? 1 : -1;
        }
        return 0;
    };

    /** Comparator for date objects
     * Results in -1 if the first date is earlier, 1 if larger, 0 otherwise
     * the result gets multiplied by -1 if the user wants to sort in descending order
     *
     * @param dateA Date being compared
     * @param dateB Date being compared
     * @param order either "asc" or "desc"
     * @returns 1 | 0 | -1
     */
    const dateComparator = (
        dateA: Date,
        dateB: Date,
        order: "asc" | "desc"
    ) => {
        const timeDiff = dateA.getTime() - dateB.getTime();
        return timeDiff * (order === "asc" ? 1 : -1);
    };

    /** Function that sorts the parameter ProjectData array according to the
     * sorting criteria defined by sortStates.sortKey. It goes in ascending order
     * or descending order depending on the value of sortStates.sortDirection.
     *
     * @function getSortedProjects
     * @param p array of ProjectData
     * @returns sorted ProjectData[]
     */
    const getSortedProjects = (p: ProjectData[]) => {
        const sortKey = sortStates.sortKey as keyof ProjectData;
        if (!sortKey) {
            return sortedProjects;
        }
        /** Use the string comparator for all keys except date and deadline */
        if (sortKey !== "date" && sortKey !== "deadline") {
            return p.sort((projectA, projectB) => {
                return stringComparator(
                    projectA[sortKey],
                    projectB[sortKey],
                    sortStates.sortDirection
                );
            });
        } else {
            return p.sort((projectA, projectB) => {
                const order = sortStates.sortDirection;
                /**
                 * I swear this is the FizzBuzz problem but I'm too tired to think right now
                 *
                 * First case sorts by ID if both projects have a deadline of "ASAP"
                 */
                if (
                    projectA[sortKey] === projectB[sortKey] &&
                    (typeof projectA[sortKey] === "undefined" ||
                        typeof projectA[sortKey] === "string")
                ) {
                    /**
                     * Ensure that "id" is read as a property of ProjectData
                     * then ensure that the value you get back is a string
                     *
                     * Typescript is strict about what you pass into functions
                     */
                    return stringComparator(
                        projectA["id" as keyof ProjectData] as string,
                        projectB["id" as keyof ProjectData] as string,
                        sortStates.sortDirection
                    );
                }
                if (
                    projectA[sortKey] === "ASAP" ||
                    projectB[sortKey] === undefined
                ) {
                    return -1 * (order === "asc" ? 1 : -1);
                }
                if (
                    projectB[sortKey] === "ASAP" ||
                    projectA[sortKey] === undefined
                ) {
                    return 1 * (order === "asc" ? 1 : -1);
                }
                return dateComparator(
                    projectA[sortKey] as Date,
                    projectB[sortKey] as Date,
                    sortStates.sortDirection
                );
            });
        }
    };

    /**
     * Helper function for returning a table header with all the necessary props
     *
     * @function getHeaderItem
     * @return TableHeaderItem react component
     */
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
        <Grid container justify="center" alignItems="center" style={{width: "100%", padding: 0, margin:0}}>
            <Grid item xs={12} sm={10}>
                <Paper className={styles.tblPaper} >
                    <TableContainer className={styles.tblContainer}>
                        <Table stickyHeader className={styles.tbl}>
                            <TableHead>
                                <TableRow>
                                    {getHeaderItem("id", "ID", "right")}
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
                                    getSortedProjects(sortedProjects)
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((project, index) => {
                                            const { date, deadline } = project;
                                            return (
                                                <StyledTableRow key={index}>
                                                    <TableCell align="right">
                                                        {project.id}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {project.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {getDateString(date)}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {typeof deadline ===
                                                        "object"
                                                            ? getDateString(
                                                                  deadline
                                                              )
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
                                                </StyledTableRow>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={10}>
                <Paper>
                    <TablePagination
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        count={projects.length}
                        component="div"
                        page={page}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
