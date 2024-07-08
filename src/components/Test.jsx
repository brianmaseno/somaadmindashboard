import React, { useEffect } from "react";
import axios from "axios";


const Test = () => {
  return useEffect(() => {
    axios
      .get("http://localhost:5000/test_cors")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
};

export default Test;
