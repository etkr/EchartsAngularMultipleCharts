import { Component } from '@angular/core';

interface Option {
  name:string
}


@Component({
  selector: 'app-select-dataset',
  templateUrl: './select-dataset.component.html',
  styleUrls: ['./select-dataset.component.scss']
})
export class SelectDatasetComponent {
    
  datasets: Option[]=  [{name: 'Mean Temperature'},{name:'Humidity'},{name:'Mean Pressure'},{name:'Wind Speed'}]
    
}
