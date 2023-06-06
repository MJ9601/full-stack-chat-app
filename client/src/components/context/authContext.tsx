import axios from "axios";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import constants from "../../constants";
import { useNavigate } from "react-router-dom";

interface Context {
  logged?: string | boolean | (() => Promise<boolean>);
  setLogged: (input: boolean) => void;
}

const LogContext = createContext<Context>({
  logged: async (): Promise<boolean> => {
    try {
      const response = await axios.get(`${constants.apiUrl}/users/me`, {
        withCredentials: true,
      });

      return response.status == 200 ? true : false;
    } catch (error: any) {
      console.log({ msg: error.message, error });
      return false;
    }
  },
  setLogged: () => false,
});

export default function LogProvider(props: any) {
  const [logged, setLogged] = useState(async () => {
    try {
      const response = await axios.get(`${constants.apiUrl}/users/me`, {
        withCredentials: true,
      });

      if (response.status === 200) return true;
    } catch (error: any) {
      console.log({ msg: error.message, error });
      return error.response.status == 429 ? "reqLimitation" : false;
    }
  });
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const setRoute = async () => {
      if (!(await logged)) navigate("/login");
      else if ((await logged) == "reqLimitation")
        alert("Too Many Request!!, Try again after a short time");
      else navigate("/");
    };
    setRoute();
  }, [logged]);
  return <LogContext.Provider value={{ logged, setLogged }} {...props} />;
}

export const useAuth = () => useContext(LogContext);
