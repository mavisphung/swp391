import { Navigate } from "react-router-dom";

import config from "~/config";
import { useUserAuth } from "~/context/UserAuthContext";

const Protected = (props) => {
  const { getUser } = useUserAuth();
  const user = getUser();

  if (!user) {
    return <Navigate to={config.routes.login} replace={true} />;
  }
  return <div>{props.children}</div>;
};

export default Protected;
