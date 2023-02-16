import { Navigate } from "react-router-dom";

import config from "~/config";
import { useUserAuth } from "~/context/UserAuthContext";

const Protected = (props) => {
  const { user } = useUserAuth();

  console.log("Protected: " + user);

  if (!user) {
    return <Navigate to={config.routes.login} replace={true} />;
  }
  return <div>{props.children}</div>;
};

export default Protected;
