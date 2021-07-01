import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { KanbanItem } from "../../../utils/consts";
import { Task } from "../";

const useStyles = makeStyles({
    isDraggingOver: {
        backgroundColor: "purple",
        transition: "200ms ease-in-out",
    },
});
export interface Props {
    title: string;
    id: number | string;
    tasks: Array<KanbanItem>;
}

// Converted to a pure component to prevent unnecessary redrawing
class TaskList extends React.PureComponent<Props> {
    render() {
        return this.props.tasks.map((item, index) => (
            <Task
                index={index}
                task={item}
                key={`task${item.id}${item.name}`}
            />
        ));
    }
}

const TaskColumn = ({ title, tasks, id }: Props) => {
    const dynamicStyles = useStyles();

    return (
        <Droppable droppableId={id.toString()}>
            {(provided, snapshot) => (
                <Card
                    {...provided.droppableProps}
                    key={`col${title}`}
                    ref={provided.innerRef}
                >
                    <CardContent>
                        <Typography variant="h6">{title}</Typography>
                    </CardContent>
                    <CardContent
                        className={
                            snapshot.isDraggingOver
                                ? dynamicStyles.isDraggingOver
                                : ""
                        }
                    >
                        <TaskList id={id} tasks={tasks} title={title} />

                        {provided.placeholder}
                    </CardContent>
                </Card>
            )}
        </Droppable>
    );
};

export default TaskColumn;
