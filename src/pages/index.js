import React from "react";
import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";

import loginPage from "./login-page";
import userPage from "./user-page";
import partnersPage from "./partners-page";
import MainLayout from "../layout/mainLayout";

const appRoutes = [{ ...loginPage }, { ...userPage }, { ...partnersPage }];

const RenderRoutes = () => (
  <Routes>
    {appRoutes.map((route, i) => {
      if (route.sider) {
        return (
          <Route
            path={route.path}
            element={<MainLayout>{route.element}</MainLayout>}
            key={i}
          />
        );
      }
      return <Route {...route} key={i} />;
    })}
  </Routes>
);

export default RenderRoutes;
