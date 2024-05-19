"use client";
import { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { ListFooter, ListContainer as Container, ListContent } from ".";
import { useTokensBalance } from "@/app/hooks/useTokensBalance";
import { useErrorStore } from "@/app/stores/error";

export const List = () => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pageKeys, setPageKeys] = useState(['']); // no page key for first page
    const [maxCount, setMaxCount] = useState(10);
    const { showNotification } = useErrorStore((state) => state);

    const pageKey = pageKeys[currentPageIndex];
    const { tokens, pageKey: newPageKey, error, isLoading } = useTokensBalance(pageKey, maxCount);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      if (newPage < currentPageIndex && currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
      } else {
        const newPageKeys = [...pageKeys];
        if (currentPageIndex === newPageKeys.length - 1) {
          newPageKeys.push(newPageKey);
        }
        setPageKeys(newPageKeys);
        setCurrentPageIndex(currentPageIndex + 1);
      }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMaxCount(parseInt(event.target.value, 10));
        setCurrentPageIndex(0);
        setPageKeys(['']);
    };

    useEffect(() => {
        if (error) {
            showNotification('Error', error.message, 'error');
        }
    }, [error, showNotification]);

    return (
        <Container component="section">
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
                    <ListContent tokens={tokens} isLoading={isLoading} />
                    <ListFooter
                        maxCount={maxCount}
                        page={currentPageIndex}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        isNextButtonDisabled={newPageKey === undefined}
                        isPreviousButtonDisabled={currentPageIndex === 0}
                    />
                </Table>
            </TableContainer>
        </Container>
    );
};
