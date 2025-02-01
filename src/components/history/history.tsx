import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  locationSelector,
  Location,
  removeLocation,
} from "../../store/slices/location/locationSlice";
import styles from "./history.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  locationContext,
  LocationContextType,
} from "../../context/locationContext";

const History = () => {
  const [locations, setLocations] = useState<Array<Location>>([]);
  const selectedLocations = useAppSelector(locationSelector);
  const { setShowHistory, setLocation } = useContext(
    locationContext
  ) as LocationContextType;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocations(selectedLocations);
    console.log(selectedLocations);
  }, [selectedLocations]);

  const handleRemoveLocation = (id: string) => {
    dispatch(removeLocation(id));
  };

  const handleSelectedLocation = (location: Location) => {
    setLocation(location);
    setShowHistory(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Recently searched</h1>
        <IconButton
          aria-label="close"
          size="small"
          color="secondary"
          style={{ padding: 0 }}
          onClick={() => setShowHistory(false)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      {locations.length === 0 ? (
        <div className={styles.empty}>
          <p>search history not available</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {locations.map((location) => (
            <li
              key={location.id}
              className={styles.listItem}
              onClick={() => handleSelectedLocation(location)}
            >
              <p className={styles.listItemText}>{location.address}</p>
              <IconButton
                aria-label="delete"
                size="small"
                style={{ padding: 0 }}
                onClick={() => handleRemoveLocation(location.id)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
