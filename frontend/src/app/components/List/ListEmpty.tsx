import { TableRow, TableCell } from "@mui/material";

export const ListEmpty = () => {
    return (
        <TableRow>
            <TableCell colSpan={3} align="center">
                No data available
            </TableCell>
        </TableRow>
    );
};
