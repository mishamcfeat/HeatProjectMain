import { SideBar, Header, RestaurantCreate } from "../components";

import React, { useState } from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <RestaurantCreate />
    </div>
  );
};

export default HomePage;
