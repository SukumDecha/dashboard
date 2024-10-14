import { useState, useEffect, useTransition } from "react";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(url);
        setData(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    startTransition(() => {
      fetchData();
    });
  }, [url]);

  return { data, error, isPending };
};
