import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";

interface Props {
    logs: Array<string>;
    setLogs: React.Dispatch<React.SetStateAction<string[]>>;
}

const Logs: React.FC<Props> = (props) => {
    const { logs, setLogs } = props;
    const [index, setIndex] = useState(0);
    const handleClick = () => {
        setLogs([...logs, `log ${index}`]);
        setIndex((prev) => prev + 1);
    };
    return (
        <div>
            <Typography variant="h6">Third page</Typography>
            {logs &&
                logs.map((log, index) => (
                    <Typography key={index} variant="body1">
                        {log}
                    </Typography>
                ))}
            <Button onClick={handleClick} variant="contained">
                Add a log
            </Button>
        </div>
    );
};

export default Logs;
