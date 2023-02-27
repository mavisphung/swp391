import { Breadcrumb } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

import config from "~/config";
import AppIcons from "~/assets/icons";

function getHistory(breadcrumb, index) {
  const tmp = breadcrumb.slice(0, index + 1);
  return tmp;
}

function AppTrace() {
  const navigate = useNavigate();
  const location = useLocation();
  let breadcrumb;
  if (location.state) {
    breadcrumb = location.state.breadcrumb;
  }

  return (
    <Breadcrumb
      className="app-breadcrumb"
      separator={<GoChevronRight color="black" />}
    >
      <Breadcrumb.Item
        href=""
        onClick={(e) => {
          e.preventDefault();
          navigate(config.routes.dashboard);
        }}
      >
        <img src={AppIcons.homeIcon} alt="Home icon" />
        <span>Trang chủ</span>
      </Breadcrumb.Item>
      {breadcrumb ? (
        breadcrumb.map((b, index) => (
          <Breadcrumb.Item
            key={index}
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigate(b.url, {
                preventScrollReset: false,
                state: {
                  breadcrumb: getHistory(breadcrumb, index),
                },
              });
            }}
          >
            <span>{b.name}</span>
          </Breadcrumb.Item>
        ))
      ) : (
        <Breadcrumb.Item></Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

export default AppTrace;
