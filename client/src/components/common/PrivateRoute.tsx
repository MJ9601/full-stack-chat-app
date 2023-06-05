import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import constants from "../../constants";

export default function PrivateRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const getMe = async () => {
      const response = await axios.get(`${constants.apiUrl}/users/me`, {
        withCredentials: true,
      });
      if (response.status !== 200) navigate("/login");
    };
    getMe();
  }, []);
  return <Outlet />;
}
