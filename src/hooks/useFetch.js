import { useState, useEffect } from "react";
import api from "../api/axios.js";

export function useFetch(url, params = {}) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);

    api.get(url, { params })
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, [url, JSON.stringify(params)]);

  return { data, loading, error };
}