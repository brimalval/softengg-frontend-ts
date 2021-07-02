import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ProjectData } from "../../../utils/kanban";
import styles from './Task.module.css';

interface Props {
    task: ProjectData;
    index: number;
}

const Task: React.FC<Props> = ({ task, index }) => {
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
                        <Typography variant="h6">{task.name}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Lead: {task.lead}
                        </Typography>
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
