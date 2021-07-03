import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { TaskData } from "../../../utils/kanban";
import { Task } from "../";
import styles from "./TaskColumn.module.css";

const useStyles = makeStyles({
    isDraggingOver: {
        backgroundColor: "purple",
        transition: "200ms ease-in-out",
    },
});
export interface Props {
    title: string;
    id: number | string;
    tasks: TaskData[];
}

// Converted to a pure component to prevent unnecessary redrawing
class TaskList extends React.PureComponent<Props> {
    render() {
        return this.props.tasks.map((item, index) => (
            <Task
                index={index}
                task={item}
                key={`task${item.id}`}
            />
        ));
    }
}

const TaskColumn = ({ title, tasks, id }: Props) => {
    const classes = useStyles();

    return (
        <Droppable droppableId={id.toString()}>
            {(provided, snapshot) => (
                <Paper
                    {...provided.droppableProps}
                    key={`col${title}`}
                    ref={provided.innerRef}
                    className={styles.colContainer}
                >
                    <Typography variant="h6">{title}</Typography>
                    <Paper
                        className={
                            snapshot.isDraggingOver
                                ? classes.isDraggingOver
                                : ""
                        }
                    >
                        <TaskList id={id} tasks={tasks} title={title} />
                        {provided.placeholder}
                    </Paper>
                </Paper>
            )}
        </Droppable>
    );
};

export default TaskColumn;
