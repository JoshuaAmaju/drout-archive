import { useEffect, useState } from "react";

export function useLocation() {
  let [error, setError] = useState();
  let [state, setState] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setState(position.coords);
          setLoading(false);
        },
        error => {
          setError(error);
          setLoading(false);
        }
      );
    }
  }, []);

  return [state, loading, error];
}
