import React from "react";
import MainNavigation from "../Navigation/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

function RootLayout() {
  const navigation = useNavigation();
  return (
    <div>
      <MainNavigation />
      {navigation.state === "loading" ? <p>Loading...</p> : <Outlet />}
    </div>
  );
}

export default RootLayout;
