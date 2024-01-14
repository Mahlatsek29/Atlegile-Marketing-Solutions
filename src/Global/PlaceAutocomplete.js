import React, { useState,useEffect } from "react";
import { View, TextInput, Text } from "react-native-web";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  MenuItem,
  Box,
} from "@mui/material";
import ReactDOM from "react-dom";
import App from "../../App";
const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      // console.log('Selected place:', results[0]);
      // console.log('Latitude and Longitude:', latLng);
      setError(null); // Reset error state

      // Pass the selected place details to the callback function
      onPlaceSelect({
        place: results[0],
        latLng: latLng,
      });
    } catch (error) {
      console.error("Geocoding error:", error);
      setError("Geocoding error. Please try again."); // Set error state
    }
  };
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMth0dboixZRgwUPycpuqH9Gibyy-iAjs&libraries=places";
  //   script.defer = true;

  //   const handleScriptLoad = () => {
  //     const root = ReactDOM.createRoot(document.getElementById("root"));
  //     root.render(<App />);
  //   };

  //   script.onload = handleScriptLoad;

  //   // Check if the script is already present to avoid re-adding it
  //   if (!document.querySelector(`script[src="${script.src}"]`)) {
  //     document.head.appendChild(script);
  //   }

  //   return () => {
  //     // Clean up if needed
  //     document.head.removeChild(script);
  //   };
  // }, []);
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <View>
          <TextField
            variant="standard"
            fullWidth
            style={{ height: "auto", width: "20vw" , backgroundColor:'white'}}
            {...getInputProps({ placeholder: "Type location" })}
          />
          <View>
            {loading && <Typography>Loading...</Typography>}
            {suggestions.map((suggestion) => (
              <View
                style={{ width: "20vw" }}
                {...getSuggestionItemProps(suggestion)}
                key={suggestion.placeId}
              >
                <Typography
                  style={{
                    width: "20vw",
                    display: "flex",
                    flexWrap: "wrap",
                    color: "gray",
                  }}
                >
                  {suggestion.description}
                </Typography>
              </View>
            ))}
          </View>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutocomplete;
