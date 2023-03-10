import { Routes, Route, Navigate } from "react-router-dom";

import config from "~/config";
import ProfileDetails from "./ProfileDetails";
import DefaultLayout2 from "~/components/DefaultLayout/DefaultLayout2";
import CustomWrapper from "~/components/CustomWrapper";

function Settings() {
  return (
    <Routes>
      <Route element={<DefaultLayout2 />}>
        <Route
          path={config.routes.default}
          element={<Navigate to={config.routes.profile} />}
        />
        <Route
          path={config.settingsRoutes.profile}
          element={
            <CustomWrapper>
              <ProfileDetails />
            </CustomWrapper>
          }
        />
        <Route path={config.routes.other} element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default Settings;
