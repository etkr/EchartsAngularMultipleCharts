import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {delay, forkJoin, map, Observable, of, tap} from 'rxjs';
import {Humidity} from "./humidity";
import {WindSpeed} from "./wind-speed";
import {DataArray} from "./data-array";
import {MeanTemp} from './meantemp';
import {MeanPressure} from './meanpressure';
import {zrender_d} from "echarts/types/dist/shared";


@Component({
  selector: 'app-multiple-dataset',
  templateUrl: './multiple-dataset.component.html',
  styleUrls: ['./multiple-dataset.component.scss'],
})
export class MultipleDatasetComponent implements OnInit {

  readonly gap: number = 64;
  readonly height: number = 128;

  init: zrender_d.ZRenderInitOpt = {
    devicePixelRatio: 1,
    height: 4 * this.gap + 3 * this.height,
    renderer: 'svg'
  };

  chartOption: EChartsOption = {
    title: {text: 'Weather Data', left: 'center'},
    legend: [
      {
        top: .5 * this.gap,
        data: [{name: 'Mean Temperature'}]
      },
      {
        top: 1.5 * this.gap + this.height,
        data: [{name: 'Humidity'}]
      }, {
        top: 2.5 * this.gap + 2 * this.height,
        data: [{name: 'Mean Pressure'}]
      }
    ],
    grid: [
      {top: this.gap, height: this.height},
      {top: 2 * this.gap + this.height, height: this.height},
      {top: 3 * this.gap + 2 * this.height, height: this.height}
    ],
    axisPointer: {link: [{xAxisIndex: 'all'}]},
    tooltip: {trigger: 'axis', axisPointer: {}},
    yAxis: [{gridIndex: 0}, {gridIndex: 1}, {gridIndex: 2}],
    xAxis: [
      {type: 'time', gridIndex: 0},
      {type: 'time', gridIndex: 1},
      {type: 'time', gridIndex: 2}
    ],
    series: [
      {
        type: 'line',
        datasetIndex: 0,
        name: 'Mean Temperature',
        xAxisIndex: 0,
        yAxisIndex: 0,
        showSymbol: false,
      },
      {
        type: 'line',
        datasetIndex: 1,
        name: 'Humidity',
        xAxisIndex: 1,
        yAxisIndex: 1,
        showSymbol: false,
      }, {
        type: 'line',
        datasetIndex: 2,
        name: 'Mean Pressure',
        xAxisIndex: 2,
        yAxisIndex: 2,
        showSymbol: false,
      },
    ],
  };

  chartLoading = true;
  dynamicData$: Observable<EChartsOption> = of({});

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.dynamicData$ = forkJoin({
      meantemp: this.httpClient.get<MeanTemp[]>('assets/meantemp.json'),
      humidity: this.httpClient.get<Humidity[]>('assets/humidity.json'),
      meanpressure: this.httpClient.get<MeanPressure[]>('assets/meanpressure.json'),
      wind_speed: this.httpClient.get<WindSpeed[]>('assets/wind_speed.json'),
    })
      .pipe(delay(1000))
      .pipe(tap((_) => (this.chartLoading = false)))
      .pipe(map(this.createDataset));
  }

  private createDataset = ({meantemp, humidity, meanpressure, wind_speed}: DataArray): EChartsOption => ({
    dataset: [
      {
        dimensions: ['date', 'meantemp'],
        // @ts-ignore
        source: meantemp,
      },
      {
        dimensions: ['date', 'humidity'],
        // @ts-ignore
        source: humidity,
      },
      {
        dimensions: ['date', 'meanpressure'],
        // @ts-ignore
        source: meanpressure,
      },
      {
        dimensions: ['date', 'wind_speed'],
        // @ts-ignore
        source: wind_speed,
      },
    ],
  });
}
