import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const LeavesTable = ({ leaves }) => {
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("startDate");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.ime.toLowerCase().includes(filter.toLowerCase()) ||
      leave.priimek.toLowerCase().includes(filter.toLowerCase()) ||
      leave.tip_dopusta.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedLeaves = [...filteredLeaves].sort((a, b) => {
    if (sortType === "startDate") {
      return new Date(a.zacetek) - new Date(b.zacetek);
    } else if (sortType === "endDate") {
      return new Date(a.konec) - new Date(b.konec);
    } else if (sortType === "type") {
      return a.tip_dopusta.localeCompare(b.tip_dopusta);
    }
    return 0;
  });

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "40px",
      }}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 4 }} alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          sx={{ width: "70%" }}
        />
        <Button variant="outlined" sx={{ minWidth: "48px" }}>
          <SearchIcon />
        </Button>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortType} onChange={handleSortChange} label="Sort by">
            <MenuItem value="startDate">Start Date</MenuItem>
            <MenuItem value="type">Type of Leave</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table aria-label="leave requests table" stickyHeader>
          <TableHead>
            <TableRow>
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
            {sortedLeaves.map((leave, index) => (
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
