import React from "react";
import {TableCell, Typography} from "@mui/material";

const TableHeadCell: React.FC<{ text: string, width? : number | string }> = ({text, width}) => {
    return (<TableCell align={"center"} width={width}>
        <Typography fontWeight={"bold"} color={"secondary"} variant={"h6"}>{text}</Typography>
    </TableCell>)
}

export default TableHeadCell;