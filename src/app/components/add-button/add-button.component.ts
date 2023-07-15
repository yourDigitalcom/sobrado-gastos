import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {

  @Output() public clicked: EventEmitter<any> = new EventEmitter();
  
  @Input() public fontSize: number;

}
