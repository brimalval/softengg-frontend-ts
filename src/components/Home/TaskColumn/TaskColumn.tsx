import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { KanbanItem } from "../../../utils/consts";
import { Task } from "../";

interface Props {
    title: string;
    id: number | string;
    tasks: Array<KanbanItem>;
}

const TaskColumn = ({ title, tasks, id }: Props) => {
    return (
        <Droppable droppableId={id.toString()}>
            {(provided) => (
                <Card
                    {...provided.droppableProps}
                    key={`col${title}`}
                    ref={provided.innerRef}
                >
                    <CardContent>
                        <Typography variant="h6">{title}</Typography>
                    </CardContent>
                    <CardContent>
                        {tasks.map((item, index) => (
                            <Task index={index} task={item} key={`task${item.id}${item.name}`}/>
                        ))}

                        {provided.placeholder}
                    </CardContent>
                </Card>
            )}
        </Droppable>
    );
};

export default TaskColumn;
