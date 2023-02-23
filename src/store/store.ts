import {
    Action,
    configureStore,
    getDefaultMiddleware,
    ThunkAction
} from "@reduxjs/toolkit";
import weatherReducer from "../reducers/weather.slice";

  export const store = configureStore({
    reducer: {
      weather: weatherReducer,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

  export type AppDispatch = typeof store.dispatch;

  export type RootState = ReturnType<typeof store.getState>;

  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;



