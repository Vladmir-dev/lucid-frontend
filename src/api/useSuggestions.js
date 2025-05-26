import { useState, useEffect } from "react";

export const useSuggestions = (keyword) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!keyword) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete")
      .then((res) => res.json())
      .then((items) => {
        // Filter items by keyword in name (case insensitive)
        const filtered = items.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        );

        // Map to just names or whatever you want to show
        setData(filtered.map((item) => item.value));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [keyword]);

  return { data, loading, error };
};
