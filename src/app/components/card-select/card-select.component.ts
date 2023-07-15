import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export interface iCardSelect {
  id: number;
  title: string;
  monthly: string;
  subTitle: iSubTitle,
  key: string
}
export interface iSubTitle {
  name: string;
  value: number;
}

@Component({
  selector: 'card-select',
  templateUrl: './card-select.component.html',
  styleUrls: ['./card-select.component.css']
})
export class CardSelectComponent {

  @Input() public content: iCardSelect;

  @Output() public selected: EventEmitter<any> = new EventEmitter();

}
