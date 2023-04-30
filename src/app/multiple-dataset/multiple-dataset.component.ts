import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {EChartsOption} from 'echarts';
import {delay, forkJoin, map, Observable, of, tap} from 'rxjs';
import {Humidity} from "./humidity";
import {WindSpeed} from "./wind-speed";
import {DataArray} from "./data-array";
import { MeanTemp } from './meantemp';
import { MeanPressure } from './meanpressure';


@Component({
  selector: 'app-multiple-dataset',
  templateUrl: './multiple-dataset.component.html',
  styleUrls: ['./multiple-dataset.component.scss'],
})
export class MultipleDatasetComponent implements OnInit {
  chartOption: EChartsOption = {
    grid: [
      {name: 'Mean Temperature', top: '60%'},
      {name: 'Humidity', bottom: '60%'},
    ],
    axisPointer: {link: [{xAxisIndex: 'all'}]},
    tooltip: {trigger: 'axis', axisPointer: {}},
    yAxis: [{gridIndex: 0}, {gridIndex: 1}],

    xAxis: [
      {type: 'time', gridIndex: 0},
      {type: 'time', gridIndex: 1},
    ],
    series: [
      {
        type: 'line',
        datasetIndex: 0,
        name: 'series-1',
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        type: 'line',
        datasetIndex: 1,
        name: 'series-2',
        xAxisIndex: 1,
        yAxisIndex: 1,
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
