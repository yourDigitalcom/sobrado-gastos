import { Injectable } from '@angular/core';
import { GastosModel } from '../../models/gastos.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private _idDataBase: number;
  private _monthlySelected: Array<GastosModel>;
  private _allExpenses: Array<GastosModel>;

  public set idDataBase(id: number) {
    this._idDataBase = id;
  }

  public get idDataBase(): number {
    return this._idDataBase;
  }
  

  public set monthlySelected(monthly: Array<GastosModel>) {
    this._monthlySelected = monthly;
  }

  public get monthlySelected(): Array<GastosModel> {
    return this._monthlySelected;
  }

  public set allExpenses(monthly: Array<GastosModel>) {
    this._allExpenses = monthly;
  }

  public get allExpenses(): Array<GastosModel> {
    return this._allExpenses;
  }

}
