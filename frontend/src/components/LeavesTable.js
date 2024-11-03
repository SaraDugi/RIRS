import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const LeavesTable = ({ leaves }) => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table aria-label="leave requests table" stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Surname</strong>
              </TableCell>
              <TableCell>
                <strong>Type of leave</strong>
              </TableCell>
              <TableCell>
                <strong>Start date</strong>
              </TableCell>
              <TableCell>
                <strong>End date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave, index) => (
              <TableRow
                key={index}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}
              >
                <TableCell>{leave.ime}</TableCell>
                <TableCell>{leave.priimek}</TableCell>
                <TableCell>{leave.tip_dopusta}</TableCell>
                <TableCell>
                  {new Date(leave.zacetek).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(leave.konec).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeavesTable;
