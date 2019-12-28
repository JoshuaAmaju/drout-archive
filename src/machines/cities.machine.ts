import { weatherMachine } from "./weather.machine";
import { Machine, assign, spawn } from "xstate";

let uuid: number = 1;

interface CitiesStateSchema {
  states: {
    idle: {};
    added: {};
  };
}

interface CitiesContext {
  error?: any;
  cities: object;
}

type CitiesEvents =
  | { type: "ADD"; latitude: number; longitude: number }
  | { type: "RETRY" };

export const citiesMachine = Machine<
  CitiesContext,
  CitiesStateSchema,
  CitiesEvents
>({
  id: "cities-machine",
  context: {
    cities: {}
  },
  on: {
    ADD: {
      target: "added",
      actions: assign((ctx: any, ev: any) => {
        let { latitude, longitude } = ev;
        let city = spawn(weatherMachine.withContext({ latitude, longitude }));

        return {
          cities: {
            ...ctx.cities,
            city
          }
        };
      })
    }
  },
  states: {
    idle: {},
    added: {}
  }
});
