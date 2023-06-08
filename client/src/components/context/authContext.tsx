import axios from "axios";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { User } from "./chatInfo";
import { AuthContext } from "./context";

const getMe = async (): Promise<boolean | User | string> => {
  try {
    const response = await axios.get(`${constants.apiUrl}/users/me`, {
      withCredentials: true,
    });

    return response.status == 200 ? response.data : false;
  } catch (error: any) {
    console.log({ msg: error.message, error });
    return error.response.status == 429 ? "reqLimitation" : false;
  }
};

const LogContext = createContext<AuthContext>({
  hitLim: false,
  setHitLim: () => false,
  loading: true,
  logged: async (): Promise<boolean | User | string> => await getMe(),
  setLogged: () => false,
});

export default function LogProvider(props: any) {
  const [loading, setLoading] = useState(true);
  const [hitLim, setHitLim] = useState(false);
  const [logged, setLogged] = useState(async () => await getMe());
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
