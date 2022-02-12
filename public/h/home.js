import React from "react";
import Sidebar from "./Sidebar";
import "./home.css";
import Feed from "./Feed";

function Home() {
  return (
    // BEM
    <div className="app">
      <Sidebar />
      <Feed />
     

     
      
    </div>
  );
}

export default Home;
