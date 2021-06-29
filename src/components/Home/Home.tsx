import React, { useState } from "react";
import { tasks } from "../../utils/consts";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskColumn } from "./";
import { Grid } from "@material-ui/core";


const Home = () => {
    const [currTasks, setTasks] = useState(tasks);
    const handleDragEnd = (result: DropResult) => {
        const destination = result.destination?.droppableId;
        const source = result.source.droppableId;
        if (!destination) {
            return;
        }

        const newSourceTasks = Array.from(currTasks.columns[source].tasks);
        const newDestTasks = Array.from(currTasks.columns[destination].tasks);
        const task = newSourceTasks.find(
            (task) => task.id.toString() === result.draggableId
        );

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

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Grid container spacing={3} justify="center">
                {Object.entries(currTasks.columns).map(([id, column]) => (
                    <Grid item xs={6} sm={4} md={3} key={`col${id}`}>
                        <TaskColumn
                            title={column.title}
                            id={column.id}
                            tasks={column.tasks}
                        />
                    </Grid>
                ))}
            </Grid>
        </DragDropContext>
    );
};

export default Home;
