import { Routes, Route } from "react-router-dom";

import config from "~/config";
import ProfileDetails from "./ProfileDetails";
import DefaultLayout2 from "~/components/DefaultLayout/DefaultLayout2";

function Settings() {
  return (
    <Routes>
      <Route element={<DefaultLayout2 />}>
        <Route path={config.routes.default} element={<ProfileDetails />} />
        <Route
          path={config.settingsRoutes.profile}
          element={<ProfileDetails />}
        />
        <Route path={config.routes.other} element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default Settings;
