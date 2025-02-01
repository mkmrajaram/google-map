import React, { createContext } from "react";

export interface Location {
  id: string;
  address: string;
  lat: number;
  lng: number;
}

export type showHistory = boolean;

export interface LocationContextType {
  location: Location | null;
  showHistory: showHistory;
  setLocation: (location: Location) => void;
  clearLocation: () => void;
  setShowHistory: (showHistory: showHistory) => void;
}

export const locationContext = createContext<LocationContextType | null>(null);

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = React.useState<Location | null>(null);
  const [showHistory, setShowHistory] = React.useState<showHistory>(false);

  const clearLocation = () => {
    setLocation(null);
  };

  return (
    <locationContext.Provider
      value={{
        location,
        setLocation,
        clearLocation,
        showHistory,
        setShowHistory,
      }}
    >
      {children}
    </locationContext.Provider>
  );
};

export default LocationProvider;
