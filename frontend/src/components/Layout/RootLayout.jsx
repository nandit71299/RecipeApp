import React from "react";
import MainNavigation from "../Navigation/MainNavigation";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <MainNavigation />
      <Outlet />
    </div>
  );
}

export default RootLayout;
