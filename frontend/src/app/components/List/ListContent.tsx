import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CircularProgress from "@mui/material/CircularProgress";
import { ListEmpty } from ".";
import { TokenBalance } from "@/app/hooks/useTokensBalance";

interface TableContentProps {
    tokens: TokenBalance[];
    isLoading: boolean;
}

export const ListContent = ({ tokens, isLoading }: TableContentProps) => {
    if (isLoading) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={3} align="center">
                        <CircularProgress />
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    if (tokens.length === 0) {
        return (
            <TableBody>
                <ListEmpty />
            </TableBody>
        );
    }

    return (
        <TableBody>
            {tokens.map((tokenBalance) => (
                <TableRow key={tokenBalance.address} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                        {tokenBalance.name}
                    </TableCell>
                    <TableCell align="right">{tokenBalance.symbol}</TableCell>
                    <TableCell align="right">{tokenBalance.balance}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};
