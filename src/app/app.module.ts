import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import 'echarts/theme/roma.js';
import { SingleDatasetComponent } from './single-dataset/single-dataset.component';
import { MultipleDatasetComponent } from './multiple-dataset/multiple-dataset.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SingleDatasetComponent,
    MultipleDatasetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
