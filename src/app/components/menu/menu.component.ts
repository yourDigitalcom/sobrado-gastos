import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Output() public clickEmmiter: EventEmitter<any> = new EventEmitter();

  @Input() public name: string;

  ngOnInit(): void {
  }

  public emmiterClick(name: string): void {
    this.clickEmmiter.emit(name);
  }

}
