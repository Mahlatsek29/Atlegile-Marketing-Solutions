import React, { useState } from "react";
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
            style={{ height: "5vh", width: "25vw" }}
            {...getInputProps({ placeholder: "Type address" })}
          />
          <View>
            {loading && <Typography>Loading...</Typography>}
            {suggestions.map((suggestion) => (
              <View
                style={{ width: "25vw" }}
                {...getSuggestionItemProps(suggestion)}
                key={suggestion.placeId}
              >
                <Typography
                  style={{
                    width: "25vw",
                    display: "flex",
                    flexWrap: "wrap",
                    color: "white",
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
