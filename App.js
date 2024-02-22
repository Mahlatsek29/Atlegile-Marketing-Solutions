import React, { useEffect } from "react";
import Routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import linking from "./linking";



function App() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs&libraries=places";
    script.defer = true;
  
    const handleScriptLoad = () => {
      // Render your component or any other actions after the script is loaded
    };
  
    script.onload = handleScriptLoad;
  
    // Check if the script is already present to avoid re-adding it
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.head.appendChild(script);
    }
  
    return () => {
      // Clean up if needed
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <NavigationContainer linking={linking}>
     <Routes/>
    </NavigationContainer>
  );
}

export default App;
