import LocationProvider from "./context/locationContext";
import HomePage from "./pages/homePage";

const App = () => {
  return (
    <LocationProvider>
      <HomePage />
    </LocationProvider>
  );
};

export default App;
