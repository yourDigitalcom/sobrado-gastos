import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  public itens: Array<any> = new Array<any>();

  constructor() { }

  ngOnInit(): void {
    this.itens.push({marca: 'skol', logo: '' ,color: 'yellow'});
    this.itens.push({marca: 'heineken', logo: '' ,color: 'yellow'});
    this.itens.push({marca: 'brahma', logo: '' ,color: 'red'});
    this.itens.push({marca: 'antarctica', logo: '' ,color: 'blue'});
    this.itens.push({marca: 'nova-schin', logo: '' ,color: 'white'});
    this.itens.push({marca: 'itaipava', logo: '' ,color: 'white'});
    this.itens.push({marca: 'kaiser', logo: '' ,color: 'red'});
    this.itens.push({marca: 'crystal', logo: '' ,color: 'yellow'});
    this.itens.push({marca: 'bohemia', logo: '' ,color: 'white'});
    this.itens.push({marca: 'bavaria', logo: '' ,color: 'green'});
    this.itens.push({marca: 'chopp-brahma', logo: '' ,color: 'red'});
  }

}
