import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Circle, Marker } from "react-native-maps"

const SearchBusinessScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({});

  const [region, setRegion] = React.useState({
    latitude: 9.0100,
    longitude: 38.7469,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handlePlaceSelect = async (data, details = null) => {
    try {
      if (details) {
        const { geometry, structured_formatting } = details;
        const location = geometry?.location || {
          lat: structured_formatting?.main_text_matched_substrings?.[0]?.offset,
          lng: structured_formatting?.secondary_text_matched_substrings?.[0]?.offset,
        };

        setSelectedPlace(location);
        setRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data.place_id}&key=AIzaSyCtDW4jRZWtvcOXLrG8jw-TxigqnS3wT4Q`
        );
        const placeDetails = await response.json();
        setPlaceDetails(placeDetails.result);
      } else {
        console.error('Invalid place details object:', details);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <View style={{ marginTop: 10, flex: 1, zIndex: 0 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handlePlaceSelect}
        query={{
          key: 'AIzaSyCtDW4jRZWtvcOXLrG8jw-TxigqnS3wT4Q',
          language: 'en',
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`,
          type: 'establishment', // Filter for Yelp-like places
        }}
        styles={{
          container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
          listView: { backgroundColor: 'white' },
          textInput: styles.input,
          listView: styles.listView,
          row: styles.row,
        }}
        renderRow={(rowData) => (
          <View style={styles.row}>
            <Text style={styles.text}>{rowData.description}</Text>
            {placeDetails[rowData.place_id] && (
              <View>
                <Text>Address: {placeDetails[rowData.place_id].formatted_address}</Text>
                <Text>Phone: {placeDetails[rowData.place_id].formatted_phone_number}</Text>
                <Text>Rating: {placeDetails[rowData.place_id].rating}</Text>
              </View>
            )}
          </View>
        )}
      />

      <MapView style={styles.map} zIndex={0} region={region} provider="google">
        {selectedPlace && (
          <Marker coordinate={{ latitude: selectedPlace.lat, longitude: selectedPlace.lng }}>
            <Callout>
              {placeDetails.formatted_address && (
                <Text>Address: {placeDetails.formatted_address}</Text>
              )}
              {placeDetails.formatted_phone_number && (
                <Text>Phone: {placeDetails.formatted_phone_number}</Text>
              )}
              {placeDetails.rating && (
                <Text>Rating: {placeDetails.rating}</Text>
              )}
            </Callout>
          </Marker>
        )}
      </MapView>

      {selectedPlace && (
        <View style={styles.selectedPlaceContainer}>
          <Text style={styles.selectedPlaceText}>
            Latitude: {selectedPlace.lat}, Longitude: {selectedPlace.lng}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  listView: {
    position: 'absolute',
    top: 50,
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    maxHeight: 200,
  },
  row: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  selectedPlaceContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  selectedPlaceText: {
    fontSize: 16,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

export default SearchBusinessScreen;