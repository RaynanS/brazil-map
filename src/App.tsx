import React, { useEffect } from 'react';
import './App.css';
import MapChart from './components/mapChart';
import { selectWeather } from './reducers/weather.slice';
import { useAppSelector } from './store/hooks';
import { BACKGROUND_COLOR } from './utils/colors';

const App = () => {
	const { weather, loading } = useAppSelector(selectWeather);

  return (
    <div className="app" style={{backgroundColor: BACKGROUND_COLOR}}>
      <div className="map">
        <MapChart />
      </div>
      <div className="infoContainer">
        {loading 
          ? <>
            <p>Carregando...</p>
          </>
          : weather && <div className="weather">
            <p>Estado: {weather?.state_name}</p>
            <p>Horario: {weather?.current_weather.time}</p>
            <p>Temperatura: {weather?.current_weather.temperature} °C</p>
            <p>Velocidade do Vento: {weather?.current_weather.windspeed} Km/s</p>
          </div>
        }
      </div>
    </div>
  )
}

export default App;
