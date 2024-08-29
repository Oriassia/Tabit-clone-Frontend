import { useUserContext } from "@/context/UserContext";
import { availabileTablesByRestaurant, IRestaurant } from "@/types/restaurant";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { GoogleApi } from "../../../../config";
interface IProps {
  restaurants: IRestaurant[] | availabileTablesByRestaurant[];
  onClickFun: (restId: number) => void;
}

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const libraries: "places"[] = ["places"];

function Map({ restaurants, onClickFun }: IProps) {
  const { usersLocation } = useUserContext();

  const [clickedId, setClickedId] = useState<number | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GoogleApi, // Replace with your actual Google Maps API key
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 }); // Initial center set to Tel Aviv

  useEffect(() => {
    // Update center only if usersLocation is available
    if (usersLocation) {
      setCenter({ lat: usersLocation.lat, lng: usersLocation.lng });
    }
  }, [usersLocation]);

  function isClicked(id: number): boolean {
    return clickedId === id;
  }

  // Return a loading indicator or error message if Google Maps is not loaded or fails to load
  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded || !usersLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <GoogleMap
      center={center} // Use the center state for controlling the center of the map
      zoom={14} // Set an initial zoom level
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        setMap(map);
        map.setOptions({
          clickableIcons: false,
        });
      }}
      options={{
        disableDefaultUI: true, // Disable all default UI
        zoomControl: true, // Enable zoom control
        scrollwheel: true, // Enable zoom on scroll
        fullscreenControl: false, // Disable the fullscreen control
        streetViewControl: false, // Disable the street view control
        mapTypeControl: false, // Disable the map type control
      }}
      onClick={() => {
        setClickedId(null); // Reset clicked state when clicking elsewhere on the map
      }}
    >
      {/* Render the user's location marker */}
      <MarkerF
        position={new google.maps.LatLng(usersLocation.lat, usersLocation.lng)}
        icon={{
          url: "https://tabitisrael.co.il/assets/images/map-pin-me.png?v=4_11_2",
          scaledSize: new google.maps.Size(40, 45), // Set a consistent size for all pins
        }}
      />

      {/* Render restaurant markers */}
      {restaurants.map(
        (restaurant: IRestaurant | availabileTablesByRestaurant) => (
          <MarkerF
            key={restaurant.restId}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            icon={{
              url: isClicked(restaurant.restId)
                ? "https://tabitisrael.co.il/assets/images/map-pin-pressed.png?v=4_11_2"
                : "https://tabitisrael.co.il/assets/images/map-pin.png?v=4_11_2",
              scaledSize: new google.maps.Size(40, 45),
            }}
            onClick={() => {
              if (isClicked(restaurant.restId)) {
                // If the restaurant is already clicked, unselect it
                setClickedId(null);
              } else {
                // Otherwise, select the restaurant and scroll to it
                setClickedId(restaurant.restId);
                onClickFun(restaurant.restId); // Call the function to scroll
              }
            }}
          />
        )
      )}
    </GoogleMap>
  );
}

export default Map;
