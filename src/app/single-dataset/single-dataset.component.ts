import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Measurement } from './measurement';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-single-dataset',
  templateUrl: './single-dataset.component.html',
  styleUrls: ['./single-dataset.component.scss'],
})
export class SingleDatasetComponent implements OnInit {
  chartOption: EChartsOption = {
    title: { text: 'Daily Climate Delhi 2013 to 2017',      left: 'center',  },
    axisPointer: { link: [{ xAxisIndex: 'all' }] },
    tooltip: { trigger: 'axis', axisPointer: {} },
    dataset: {
      source: [],
      dimensions: [
        'date',
        'meantemp',
        'humidity',
        'wind_speed',
        'meanpressure',
      ],
    },
    xAxis: [
      { type: 'time', gridIndex: 0, splitLine: { show: true } },
      { type: 'time', gridIndex: 1, splitLine: { show: true } },
    ],
    grid: [{ bottom: '60%' }, { top: '60%' }],
    yAxis: [
      {
        gridIndex: 0,
        axisLine: { show: true },
        type: 'value',
        axisLabel: { formatter: '{value} C' },
        axisPointer: { snap: true },
        name: 'Temperature',
      },
      {
        gridIndex: 1,
        axisLine: { show: true },
        type: 'value',
        axisLabel: { formatter: '{value} %' },
        axisPointer: { snap: true },
        name: 'Humidity',
      },
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        xAxisIndex: 0,
        yAxisIndex: 0,
        encode: { x: 'date', y: 'meantemp' },
      },
      {
        type: 'line',
        showSymbol: false,
        xAxisIndex: 1,
        yAxisIndex: 1,
        encode: { x: 'date', y: 'humidity' },
      },
    ],
  };

  chartLoading = true;
  dynamicData: EChartsOption = {};

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<Measurement[]>('assets/data.json')
      .pipe(delay(1000))
      .pipe(tap((_) => (this.chartLoading = false)))
      .subscribe(
        // @ts-ignore
        (value) => (this.dynamicData = { dataset: { source: value } })
      );
  }
}
