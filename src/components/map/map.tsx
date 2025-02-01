import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { styles } from "./map.styles";
import { googleMapsApiKey, libraries } from "../../constants";
import {
  locationContext,
  LocationContextType,
} from "../../context/locationContext";

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const [markerLocation, setMarkerLocation] = useState({
    lat: 7.2905715,
    lng: 80.6337262,
  });

  const { location } = useContext(locationContext) as LocationContextType;

  useEffect(() => {
    if (location) {
      setMarkerLocation({
        lat: location.lat,
        lng: location.lng,
      });
    }
  }, [location]);

  if (loadError) {
    return <div>Error</div>;
  }

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={styles.mapContainerStyle}
      zoom={13}
      center={markerLocation}
      options={{ fullscreenControl: false, streetViewControl: false }}
    >
      <Marker position={markerLocation} />
    </GoogleMap>
  );
};

export default Map;
