import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { User } from "./chatInfo";
import { AuthContext } from "./context";

const getMe = async (): Promise<boolean | User | "reqLimitation"> => {
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
  logged: false,
  setLogged: () => false,
});

export default function LogProvider(props: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hitLim, setHitLim] = useState(false);
  const [logged, setLogged] = useState<"reqLimitation" | User | boolean>(false);
  useEffect(() => {
    const getLogged = async () => {
      const _logged = await getMe();
      if (!_logged) {
        navigate("/login");
      } else if (_logged == "reqLimitation") {
        setHitLim(true);
      } else {
        setLogged(_logged);
        navigate("/");
      }

      setLoading(false);
    };

    getLogged();
  }, [logged]);
  return (
    <LogContext.Provider
      value={{ loading, logged, setLogged, hitLim, setHitLim }}
      {...props}
    />
  );
}

export const useAuth = () => useContext(LogContext);
