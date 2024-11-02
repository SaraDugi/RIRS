import axios from "axios";

export const submitLeaveRequest = async (dopusti) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:23077/api/users/request",
      { dopusti },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};
