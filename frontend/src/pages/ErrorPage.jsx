import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let errorTitle = `${error?.status || "Unknown"} Error`;
  let errorMessage = `${
    error?.response?.data?.error || "Something went wrong"
  } `;
  console.error(error);

  return (
    <div
      style={{
        display: "flex ",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{errorTitle}</p>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorPage;
