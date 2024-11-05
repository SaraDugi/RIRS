import React, { useEffect, useState } from "react";
import { getAllLeaves } from "../api/requestApi";
import LeavesTable from "../components/LeavesTable";
import ApprovalChart from "../components/ApprovalChart";

const LeavesTablePage = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLeaves();
      setLeaves(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <LeavesTable leaves={leaves} />
      <ApprovalChart />
    </div>
  );
};

export default LeavesTablePage;
