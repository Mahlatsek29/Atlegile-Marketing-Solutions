import React, { useEffect } from "react";
import Routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import linking from "./linking";


function App() {

  return (
    <NavigationContainer linking={linking}>
      <Routes />
    </NavigationContainer>
  );
}

export default App;
