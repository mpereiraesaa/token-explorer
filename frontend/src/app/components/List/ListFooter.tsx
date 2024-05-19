"use client";
import { TableFooter, TableRow, TablePagination } from "@mui/material";

interface ListFooterProps {
  maxCount: number;
  page: number;
  isNextButtonDisabled: boolean;
  isPreviousButtonDisabled: boolean;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ListFooter = (props: ListFooterProps) => {
    const {
      isNextButtonDisabled,
      isPreviousButtonDisabled,
      maxCount,
      page,
      handleChangePage,
      handleChangeRowsPerPage
    } = props;

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25]}
                    colSpan={3}
                    count={-1}
                    rowsPerPage={maxCount}
                    page={page}
                    slotProps={{
                        actions: {
                            nextButton: {
                                disabled: isNextButtonDisabled,
                            },
                            previousButton: {
                                disabled: isPreviousButtonDisabled,
                            },
                        },
                        select: {
                            inputProps: {
                                "aria-label": "rows per page",
                            },
                            native: true,
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={() => ''} // disable label
                />
            </TableRow>
        </TableFooter>
    );
};
