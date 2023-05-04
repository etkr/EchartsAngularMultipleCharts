import {Component} from '@angular/core';
import {Option} from "./option";

@Component({
  selector: 'app-dynamic-series',
  templateUrl: './dynamic-series.component.html',
  styleUrls: ['./dynamic-series.component.scss']
})
export class DynamicSeriesComponent {
  datasets: Option[] = [{name: 'Mean Temperature'}, {name: 'Humidity'}, {name: 'Mean Pressure'}, {name: 'Wind Speed'}]
  
  options: Option[] = []

  displayOptions(options: Option[]) {
    this.options = options
  }

}
