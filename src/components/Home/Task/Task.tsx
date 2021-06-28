import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { KanbanItem } from "../../../utils/consts";

interface Props {
    task: KanbanItem;
    index: number;
}

const Task = ({ task, index }: Props) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{marginBottom:"5"}}
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
