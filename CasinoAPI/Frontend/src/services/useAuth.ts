// src/hooks/useAuth.ts
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [userFName, setUserFName] = useState<string | null>(null);

  useEffect(() => {
    const fname = localStorage.getItem("loggedInUserFName");
    if (fname) {
      setUserFName(fname);
    }
  }, []);

  return { userFName };
};
