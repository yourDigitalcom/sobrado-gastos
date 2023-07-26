import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/service.service';
import { UtilService } from 'src/app/services/utils/util.service';
import { GastosModel } from '../../models/gastos.model';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  public isAll: boolean = false;
  public isDebito: boolean = false;
  public isCredito: boolean = false;
  public isDinheiro: boolean = false;
  public isPix: boolean = false;

  public labelValueSelected: string;

  private _totalValueSelected: number;

  // public listStatement: Array<GastosModel>;

  private _monthlySelected: Array<GastosModel>;

  constructor(
    private readonly _session: SessionService,
    private readonly _gastosService: GastosService,
    private readonly _utils: UtilService
  ) {

  }

  public ngOnInit(): void {
    this.changeName(0);
    this.monthlySelected = this.ordernedListStatement();

    const teste = this.monthlySelected.map(value => value.value).reduce((value, curr) => (value + curr));

    console.log('teste', teste);
    

    // const teste = this.monthlySelected.reduce((value, curr) => (value.value + curr.value))
  }



  public set monthlySelected(value) {
    this._monthlySelected = value;
  }

  public get monthlySelected(): Array<GastosModel> {
    return this._monthlySelected;
  }

  public set totalValueSelected(value) {
    this._totalValueSelected = value;
  }

  public get totalValueSelected(): number {
    return this.monthlySelected.map(value => value.value).reduce((value, curr) => (value + curr));
  }

  public deleteGasto(key: string): void {
    this._gastosService.deletarGasto(key);
  }

  public goBack(): void {
    this._utils.goToPage('home');
  }

  public ordernedListStatement(): Array<GastosModel> {
    return this._session.monthlySelected.sort((a, b) => (Number(a.date.substring(0, 2).replace('/', '')) - Number(b.date.substring(0, 2).replace('/', '')))).reverse();
  }

  // public sumTotalSelected(): number {

  // }

  public changeName(value: number): void {

    switch (value) {
      case 0:
        this.isAll = true;
        this.isDebito = false;
        this.isCredito = false;
        this.isDinheiro = false;
        this.isPix = false;
        this.monthlySelected = this.ordernedListStatement();
        this.labelValueSelected = 'Total';
        break;
      case 1:
        this.isAll = false;
        this.isDebito = true;
        this.isCredito = false;
        this.isDinheiro = false;
        this.isPix = false;
        this.monthlySelected = this.ordernedListStatement();
        this.monthlySelected = this._monthlySelected.filter(value => value.name === 'Débito');
        this.labelValueSelected = 'Total em Débito';
        break;
      case 2:
        this.isAll = false;
        this.isDebito = false;
        this.isCredito = true;
        this.isDinheiro = false;
        this.isPix = false;
        this.monthlySelected = this.ordernedListStatement();
        this.monthlySelected = this._monthlySelected.filter(value => value.name === 'Crédito');
        this.labelValueSelected = 'Total em Crédito';
        break;
      case 3:
        this.isAll = false;
        this.isDebito = false;
        this.isCredito = false;
        this.isDinheiro = true;
        this.isPix = false;
        this.monthlySelected = this.ordernedListStatement();
        this.monthlySelected = this._monthlySelected.filter(value => value.name === 'Dinheiro');
        this.labelValueSelected = 'Total em Dinheiro';
        break;
      case 4:
        this.isAll = false;
        this.isDebito = false;
        this.isCredito = false;
        this.isDinheiro = false;
        this.isPix = true;
        this.monthlySelected = this.ordernedListStatement();
        this.monthlySelected = this._monthlySelected.filter(value => value.name === 'PIX');
        this.labelValueSelected = 'Total em Pix';
        break;
      default:
        break;
    }
  }

}