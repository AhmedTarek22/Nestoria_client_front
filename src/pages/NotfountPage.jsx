import React from "react";
import { Typography, Button } from "@mui/material";

const PageNotFound = () => {
  const backgroundImage = "/images/home/2.jpg";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        margin: 0,
      }}
    >
      <Typography variant="h1" style={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/"
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Go Back to Home
      </Button>
    </div>
  );
};

export default PageNotFound;
