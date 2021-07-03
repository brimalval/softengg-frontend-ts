import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskData, projects } from "../../../utils/kanban";
import styles from './Task.module.css';

interface Props {
    task: TaskData;
    index: number;
}

const Task: React.FC<Props> = ({ task, index }) => {
    const project = projects.find((project) => project.id === task.project);
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <Card
                    className={styles.card}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardContent>
                        <Typography variant="h6">{project ? project.name : ""}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Task: {task.title}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body2">{task.description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button>Learn more</Button>
                    </CardActions>
                </Card>
            )}
        </Draggable>
    );
};

export default Task;
