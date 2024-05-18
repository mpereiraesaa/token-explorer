'use client';
import { useState } from 'react';
import { TableFooter, TableRow, TablePagination } from "@mui/material";

interface ListFooterProps {
  rows: any[]
}

export const ListFooter = (props: ListFooterProps) => {
  const { rows } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  return (
    <TableFooter>
    <TableRow>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
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
}
