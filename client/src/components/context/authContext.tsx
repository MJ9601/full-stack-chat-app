import axios from "axios";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import constants from "../../constants";
import { useNavigate } from "react-router-dom";
import { User } from "./chatInfo";

interface Context {
  logged?: string | boolean | (() => Promise<boolean | User>);
  setLogged: (input: boolean) => void;
  loading: boolean;
  hitLim: boolean;
  setHitLim: (input: boolean) => void;
}

const LogContext = createContext<Context>({
  hitLim: false,
  setHitLim: () => false,
  loading: true,
  logged: async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${constants.apiUrl}/users/me`, {
        withCredentials: true,
      });

      return response.status == 200 ? response.data : false;
    } catch (error: any) {
      console.log({ msg: error.message, error });
      return false;
    }
  },
  setLogged: () => false,
});

export default function LogProvider(props: any) {
  const [loading, setLoading] = useState(true);
  const [hitLim, setHitLim] = useState(false);
  const [logged, setLogged] = useState(async () => {
    try {
      const response = await axios.get(`${constants.apiUrl}/users/me`, {
        withCredentials: true,
      });

      if (response.status === 200) return response.data;
    } catch (error: any) {
      console.log({ msg: error.message, error });
      return error.response.status == 429 ? "reqLimitation" : false;
    }
  });
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const setRoute = async () => {
      if (!(await logged)) navigate("/login");
      else if ((await logged) == "reqLimitation") {
        setHitLim(true);
      } else navigate("/");

      setLoading(false);
    };
    setRoute();
  }, [logged]);
  return (
    <LogContext.Provider
      value={{ loading, logged, setLogged, hitLim, setHitLim }}
      {...props}
    />
  );
}

export const useAuth = () => useContext(LogContext);
