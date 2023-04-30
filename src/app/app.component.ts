import {Component} from '@angular/core';

interface TabNavigationTab {
  routerLink: any[];
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tabs: TabNavigationTab[] = [
    {
      routerLink: ['/multiple-dataset'],
      label: 'Multiple Dataset'
    }, {
      routerLink: ['/single-dataset'],
      label: 'Single Dataset'
    }
  ];
}
