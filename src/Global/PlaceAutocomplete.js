import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native-web';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [address, setAddress] = useState('');
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
      console.error('Geocoding error:', error);
      setError('Geocoding error. Please try again.'); // Set error state
    }
  };

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <View>
          <TextInput style={{ width: '25vw' }} {...getInputProps({ placeholder: 'Type address' })} />
          <View>
            {loading && <Text>Loading...</Text>}
            {suggestions.map((suggestion) => (
              <View {...getSuggestionItemProps(suggestion)} key={suggestion.placeId}>
                <Text>{suggestion.description}</Text>
              </View>
            ))}
          </View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutocomplete;
