export type WeatherResponseType = {
  current_weather: {
    temperature: number,
    time: string,
    weathercode: number,
    winddirection: number,
    windspeed: number,
  },
  elevation: number,
  generationtime_ms: number,
  latitude: number,
  longitude: number,
  state_name: string,
  timezone: string,
  timezone_abbreviation: string,
  utc_offset_seconds: number,
}

// temperature_unit	Unit: celsius
// windspeed_unit	Unit: kmh	
// precipitation_unit	Unit: mm