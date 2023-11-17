import React from "react";
import {Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import TableHeadCell from "./TableHeadCell";

function createData(label: string, attribution: string, status : string, edit : string = "EDIT") {
    return {label, attribution, status, edit};
}

const rows = [
    createData(" ecfnzbrz    gzg", "zfezef", "efzef"),
    createData("zzfgzegzg", "zfezef", "efzef"),
    createData("zzfgzegzg", "zfezef", "efzef"),
    createData("zzfgzegzg", "zfezef", "efzef"),
    createData("zzfgzegzg", "zfezef", "efzef"),
]

const TasksTable: React.FC = () => {
    return (<Box mt={3}>
        <Container>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell text={"Libellé"} width={"70%"}></TableHeadCell>
                            <TableHeadCell text={"Attribution"}></TableHeadCell>
                            <TableHeadCell text={"Status"}></TableHeadCell>
                            <TableHeadCell text={"Actions"}></TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (<TableRow key={index}>
                            <TableCell>{row.label}</TableCell>
                            <TableCell>{row.attribution}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.edit}</TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </Box>);
}
export default TasksTable;