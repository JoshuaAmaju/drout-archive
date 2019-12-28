import { Machine, assign } from "xstate";
import { formatWeatherData } from "../utils/utils";
import { fetchCurrentData } from "../services/weather.service";

interface WeatherStateSchema {
  states: {
    idle: {};
    error: {};
    loading: {};
  };
}

interface WeatherContext {
  error?: any;
  data?: object;
  latitude: number;
  longitude: number;
}

type WeatherEvents =
  | { type: "FETCH"; latitude: number; longitude: number }
  | { type: "RETRY" };

export const weatherMachine = Machine<
  WeatherContext,
  WeatherStateSchema,
  WeatherEvents
>(
  {
    initial: "idle",
    id: "weather-machine",
    context: {
      latitude: 0,
      longitude: 0,
      data: undefined
    },
    states: {
      idle: {
        on: {
          FETCH: "loading"
        }
      },
      loading: {
        invoke: {
          src: "fetch",
          onDone: {
            target: "idle",
            actions: ["formatData"]
          },
          onError: {
            target: "error",
            actions: assign({
              error: (ctx, ev) => ev.data
            })
          }
        }
      },
      error: {
        on: {
          RETRY: "loading"
        }
      }
    }
  },
  {
    actions: {
      formatData: assign({
        data: (ctx, ev: { data: any }) => {
          console.log(ev.data);
          return formatWeatherData(ev.data);
        }
      })
    },
    services: {
      fetch: (ctx, ev) => {
        let { latitude, longitude } = ctx;
        return fetchCurrentData({ latitude, longitude });
      }
    }
  }
);
