import React, { useEffect, useState } from "react";
import { tasks } from "../../utils/kanban";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskColumn } from "./";
import { AppBar, Grid, Tabs, Tab, Typography } from "@material-ui/core";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import ArchiveIcon from "@material-ui/icons/Archive";
interface ColumnListProps {
    tasks: typeof tasks;
}
// Converted to a pure component to prevent unnecessary re-drawing
class ColumnList extends React.PureComponent<ColumnListProps> {
    render() {
        const { tasks } = this.props;
        return Object.entries(tasks.columns).map(([id, column]) => (
            <Grid item xs={6} sm={4} md={3} key={`col${id}`}>
                <TaskColumn
                    title={column.title}
                    id={column.id}
                    tasks={column.tasks.map((taskId) => tasks.allTasks[taskId])}
                />
            </Grid>
        ));
    }
}

const getBaseURL = (location: { pathname: string }) => {
    return location.pathname.slice(0, location.pathname.lastIndexOf("/"));
};

const Home = () => {
    const location = useLocation();
    const { sub } = useParams<{ sub: string | undefined }>();

    const [currTasks, setTasks] = useState(tasks);
    const [tab, setTab] = useState(sub ? sub : "main");

    useEffect(() => {
        setTab(sub ? sub : "main");
    }, [sub]);

    const handleDragEnd = (result: DropResult) => {
        const destination = result.destination?.droppableId;
        const source = result.source.droppableId;
        if (!destination) {
            return;
        }

        const newSourceTasks = Array.from(currTasks.columns[source].tasks);
        const newDestTasks = Array.from(currTasks.columns[destination].tasks);
        const task = newSourceTasks.find((task) => task === result.draggableId);

        newSourceTasks.splice(result.source.index, 1);

        if (source !== destination) {
            newDestTasks.splice(result.destination!.index, 0, task!);
            const newDesCol = {
                ...currTasks.columns[destination],
                tasks: newDestTasks,
            };
            const newSourceCol = {
                ...currTasks.columns[source],
                tasks: newSourceTasks,
            };

            setTasks({
                ...currTasks,
                columns: {
                    ...currTasks.columns,
                    [destination]: newDesCol,
                    [source]: newSourceCol,
                },
            });
            return;
        }

        newSourceTasks.splice(result.destination!.index, 0, task!);
        const newSourceCol = {
            ...currTasks.columns[source],
            tasks: newSourceTasks,
        };

        setTasks({
            ...currTasks,
            columns: {
                ...currTasks.columns,
                [source]: newSourceCol,
            },
        });
    };

    const history = useHistory();
    const handleTabs = (event: React.ChangeEvent<{}>, newValue: string) => {
        history.push(getBaseURL(location) + "/" + newValue);
        setTab(newValue);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <AppBar
                position="relative"
                elevation={0}
                style={{ paddingBottom: "2px" }}
                color="primary"
            >
                <Tabs
                    onChange={handleTabs}
                    value={tab}
                    aria-label="tab selector"
                    centered
                    variant="fullWidth"
                    textColor="secondary"
                >
                    <Tab
                        value="main"
                        label="Kanban Board"
                        icon={<DashboardIcon />}
                    />
                    <Tab
                        value="other"
                        label="Project Dashboard"
                        icon={<ListIcon />}
                    />
                    <Tab
                        value="third"
                        label="Project Logs"
                        icon={<ArchiveIcon />}
                    />
                </Tabs>
            </AppBar>
            <Grid
                container
                spacing={3}
                justify="center"
                style={{ padding: "5px" }}
            >
                {tab === "main" && <ColumnList tasks={currTasks} />}
                {tab === "other" && (
                    <Typography variant="h6">Second Page</Typography>
                )}
                {tab === "third" && (
                    <Typography variant="h6">Third Page</Typography>
                )}
            </Grid>
        </DragDropContext>
    );
};

export default Home;
