'use client';
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { ListFooter, ListContainer as Container } from ".";

export const List = () => {
    const rows: any[] = [];
    return (
        <Container component='section'>
            <TableContainer component={Paper}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <Typography sx={{ flex: "1 1 100%" }} variant="h3" component="div">
                        Balances
                    </Typography>
                </Toolbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Token</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="right">
                                Symbol
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="right">
                                Balance
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                        <ListFooter rows={rows}/>
                </Table>
            </TableContainer>
        </Container>
    );
};
