import { SideBar, Header, Restaurant } from "../components";

import React, { useState } from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <Restaurant />
    </div>
  );
};

export default HomePage;
