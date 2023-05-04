import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Option} from "../option";


@Component({
  selector: 'app-select-dataset',
  templateUrl: './select-dataset.component.html',
  styleUrls: ['./select-dataset.component.scss']
})
export class SelectDatasetComponent {

  @Input()
  options: Option[] = []

  @Input()
  selectedOptions: Option[] = []

  @Output()
  selectedOptionsChange = new EventEmitter<Option[]>();

  onValChange(options: Option[]) {
    this.selectedOptionsChange.emit(options)
  }

}
