import React, { useEffect, useRef } from "react";
import PageWrapper from "../components/PageWrapper"; // Your page wrapper component
import AirplaneScene from "../components/AirplaneScene"; // Importing the Airplane scene

const Home = () => {
  return (
    <PageWrapper title="HomePage" description="Home page with airplane animation">
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* The Three.js Scene with the airplane animation */}
        <AirplaneScene />
        
        {/* Main content overlay */}
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <h1 style={{ color: "#fff", fontSize: "3rem" }}>✈️ Welcome to the Sky!</h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
