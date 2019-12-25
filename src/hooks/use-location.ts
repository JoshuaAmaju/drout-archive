import { useEffect, useState } from "react";

export function useLocation() {
  let [error, setError] = useState();
  let [state, setState] = useState();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLoading(false);
          setState(position.coords);
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
