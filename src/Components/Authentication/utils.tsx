import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUserStore from "../../store";

export const CheckForLogin = () => {
  const { userName, fetched } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName && fetched) navigate("/");
  }, [fetched, userName]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
