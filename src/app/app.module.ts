import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxEchartsModule} from 'ngx-echarts';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import 'echarts/theme/roma.js';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts: () => import('echarts')}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
