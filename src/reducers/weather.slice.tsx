import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherByLatLong } from "../api/api";
import { RootState } from "../store/store";
import { WeatherResponseType } from "./weather.model";

type InitialStateType = {
  weather: WeatherResponseType | undefined,
  loading: boolean
}

const initialState: InitialStateType = {
  weather: undefined,
  loading: false
}

export const getWeatherByLatLong = createAsyncThunk(
    "weather/getWeatherByLatLong",
    async ({name, lat, lon}: {name: string, lat: number, lon: number}) => {
        return await fetchWeatherByLatLong(name, lat, lon);
    }
);

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
      clearWeather: () => initialState,
      startFetching: (state) => {
        return {
          ...state,
          loading: true,
          weather: undefined
        };
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getWeatherByLatLong.fulfilled, (state, action) => {
          state.weather = action.payload;
          state.loading = false;
        })
        .addCase(getWeatherByLatLong.rejected, (state, action) => {
          state.loading=false;
        })
    },
  });



export const { clearWeather, startFetching } = weatherSlice.actions;

export const selectWeather = (state: RootState): InitialStateType => state.weather;

export default weatherSlice.reducer;
