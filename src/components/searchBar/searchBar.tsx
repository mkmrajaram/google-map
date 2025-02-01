import { useContext, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import styles from "./searchBar.module.css";
import { googleMapsApiKey, libraries } from "../../constants";
import { IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../store/hooks";
import {
  addLocation,
  Location,
} from "../../store/slices/location/locationSlice";
import {
  locationContext,
  LocationContextType,
} from "../../context/locationContext";

const SearchBar = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dispatch = useAppDispatch();
  const { setLocation, setShowHistory } = useContext(
    locationContext
  ) as LocationContextType;

  const onLoadAutoComplete = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    autoCompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current?.getPlace();
    console.log(place);
    const locationInfo: Location = {
      id: place?.place_id || nanoid(),
      address: place?.formatted_address || "",
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setLocation(locationInfo);
    dispatch(addLocation(locationInfo));
  };

  if (!isLoaded) {
    return <div className={styles.containerStyle}>loading...</div>;
  }

  return (
    <div className={styles.containerStyle}>
      <div className={styles.autoCompleteContainer}>
        <Autocomplete
          onLoad={onLoadAutoComplete}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search location"
          />
        </Autocomplete>
      </div>
      <div>
        <IconButton
          area-label="history"
          color="primary"
          onClick={() => setShowHistory(true)}
        >
          <HistoryIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchBar;
