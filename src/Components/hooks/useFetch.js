import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(queryKey, endPoint) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: getPost,
    select: (data) => data.data,
  });
  console.log("data", data);

  async function getPost() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/${endPoint}`, {
      headers: { token: localStorage.getItem("token") },
    });
  }

  return { data, isLoading, isError, error };
}
