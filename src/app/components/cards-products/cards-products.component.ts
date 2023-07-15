import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-products',
  templateUrl: './cards-products.component.html',
  styleUrls: ['./cards-products.component.scss']
})
export class CardsProductsComponent implements OnInit {

  private _products;

  @Input() public set products(val) {
    console.log("produtos em cards-list ->" ,val);
    
    this._products = val;
  }

  public get products() {
    return this._products;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
