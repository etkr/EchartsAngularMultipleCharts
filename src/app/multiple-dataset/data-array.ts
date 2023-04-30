import {Humidity} from "./humidity";
import {MeanPressure} from "./meanpressure";
import {MeanTemp} from "./meantemp";
import {WindSpeed} from "./wind-speed";

export interface DataArray {
  meantemp: MeanTemp[];
  humidity: Humidity[];
  meanpressure: MeanPressure[];
  wind_speed: WindSpeed[];
}