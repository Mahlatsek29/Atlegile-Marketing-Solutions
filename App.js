import React, { useEffect } from "react";
import Routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import linking from "./linking";
import { useJsApiLoader } from "@react-google-maps/api";

// const MAP_LIBRARIES = ["places"];

function App() {
  // Move the hook call inside the component function
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs",
  //   libraries: MAP_LIBRARIES,
  // });

  // useEffect(() => {
  //   // Use isLoaded and loadError here if needed
  // }, [isLoaded, loadError]);

  return (
    <NavigationContainer linking={linking}>
      <Routes />
    </NavigationContainer>
  );
}

export default App;
