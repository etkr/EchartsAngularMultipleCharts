import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SingleDatasetComponent} from './single-dataset/single-dataset.component';
import {MultipleDatasetComponent} from './multiple-dataset/multiple-dataset.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';

import 'echarts/theme/dark-digerati.js';
import { DynamicSeriesComponent } from './dynamic-series/dynamic-series.component'

@NgModule({
  declarations: [
    AppComponent,
    SingleDatasetComponent,
    MultipleDatasetComponent,
    DynamicSeriesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
