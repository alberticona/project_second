import axios from "axios";
import { useEffect, useState } from "react";
import WeatherDetail from "./components/WeatherDetail";

function App() {
  const [weather, setWeather] = useState(null);

  const success = (pos) => {
    const {
      coords: { latitude, longitude },
    } = pos;
  
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e96b21389441834ef28da824b1e49990&lang=sp&units=metric`)
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err));
    };

  const bgImages = {
    "04d":
      "bg-[url(/images/bg1.jpg)]",
    "01d":
      "bg-[url(/images/bg2.jpg)]",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <main className={`flex justify-center items-center h-screen bg-black text-white bg-[)] bg-cover ${bgImages[weather?.weather[0].icon]}`}>
      {weather ? <WeatherDetail weather={weather} /> : <span>Loading...</span>}
    </main>
  )
}
export default App;
