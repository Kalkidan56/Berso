import * as React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"

export default function SearchBusinessScreen() {

  const [ pin, setPin ] = React.useState({
    latitude: 9.0100,
    longitude: 38.7469,
	})
  const [ region, setRegion ] = React.useState({
    latitude: 9.0100,
    longitude: 38.7469,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })
  return (
    <View style={{ marginTop: 10, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          })
				}}
				query={{
					key: "AIzaSyBlU-9WLvRJYZaiJXgygBsHPX3m6S3ysJs",
					language: "en",
					components: "country:ethiopia",
					types: "business",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>

  
      <MapView style={styles.map} 
       initialRegion={{
        latitude: 9.0100,
        longitude: 38.7469,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      provider="google"
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})
    