import { UserComponent } from "../components";
import Header from "../components/Header/Header";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <UserComponent />
    </div>
  );
};

export default HomePage;
