"use client";
import { TableFooter, TableRow, TablePagination } from "@mui/material";

interface ListFooterProps {
  rowsLength: number;
  maxCount: number;
  page: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ListFooter = (props: ListFooterProps) => {
    const { rowsLength, maxCount, page, handleChangePage, handleChangeRowsPerPage } = props;

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={rowsLength}
                    rowsPerPage={maxCount}
                    page={page}
                    slotProps={{
                        select: {
                            inputProps: {
                                "aria-label": "rows per page",
                            },
                            native: true,
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter>
    );
};
