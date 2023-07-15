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

  // public listStatement: Array<GastosModel>;

  constructor(
    private readonly _session: SessionService,
    private readonly _gastosService: GastosService,
    private readonly _utils: UtilService
  ) {

  }

  public ngOnInit(): void {
    this.listStatement();
    const teste = this._session.monthlySelected.sort((a, b) => ( Number(a.date.substring(0, 2).replace('/', '')) - Number(b.date.substring(0, 2).replace('/', ''))));
    console.log('this._session.monthlySelected', teste);
    
  }

  public deleteGasto(key: string): void {
    console.log('key', key);
    
    this._gastosService.deletarGasto(key);
  }

  public goBack(): void {
    this._utils.goToPage('home');
  }

  public listStatement(): Array<GastosModel> {
    return this._session.monthlySelected.sort((a, b) => ( Number(a.date.substring(0, 2).replace('/', '')) - Number(b.date.substring(0, 2).replace('/', ''))));
  }

}