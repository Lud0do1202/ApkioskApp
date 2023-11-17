import React from "react";
import {Box} from "@mui/material";
import TasksTable from "../components/TasksTable";

const TasksPage : React.FC = () => {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <TasksTable/>
        </Box>
    )
}

export default TasksPage;