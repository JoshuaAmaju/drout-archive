import { Machine, assign } from "xstate";
import { formatWeatherData } from "../utils/utils";

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

type WeatherEvents = { type: "FETCH" } | { type: "RETRY" };

export const weatherMachine = Machine<
  WeatherContext,
  WeatherStateSchema,
  WeatherEvents
>(
  {
    initial: "loading",
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
        onEntry: assign((ctx, ev: any) => {
          let { latitude, longitude } = ev;
          return { latitude, longitude };
        }),
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
          return formatWeatherData(ev.data);
        }
      })
    }
  }
);
