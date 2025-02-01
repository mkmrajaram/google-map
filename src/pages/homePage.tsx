import { useContext } from "react";
import History from "../components/history/history";
import Map from "../components/map/map";
import SearchBar from "../components/searchBar/searchBar";
import styles from "./homePage.module.css";
import {
  locationContext,
  LocationContextType,
} from "../context/locationContext";

const HomePage = () => {
  const { showHistory } = useContext(locationContext) as LocationContextType;
  return (
    <div className={styles.container}>
      <SearchBar />
      {showHistory && <History />}
      <Map />
    </div>
  );
};

export default HomePage;
