import { Machine } from "xstate";

interface WeatherStateSchema {
  states: {
    idle: {};
    error: {};
    loading: {};
  };
}

interface WeatherContext {
  data?: object;
  latitude?: number;
  longitude?: number;
}

type WeatherEvents = { type: "FETCH" } | { type: "RETRY" };

export const weatherMachine = Machine<
  WeatherContext,
  WeatherStateSchema,
  WeatherEvents
>({
  initial: "loading",
  id: "weather-machine",
  context: {
    data: undefined,
    latitude: undefined,
    longitude: undefined
  },
  states: {
    idle: {
      on: {
        FETCH: "loading"
      }
    },
    loading: {
      invoke: {
        src: "fetch"
      }
    },
    error: {
      on: {
        RETRY: "loading"
      }
    }
  }
});
