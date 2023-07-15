import { Component, OnInit, ViewChild } from '@angular/core';
import { iCardSelect } from '../../components/card-select/card-select.component';
import { SessionService } from '../../services/session/session.service';
import { GastosModel } from '../../models/gastos.model';
import { GastosService } from '../../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { UtilService } from 'src/app/services/utils/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaGastos: Array<iCardSelect>;

  public form: FormGroup;

  public inputDate: string;
  public datePicker: string;

  public openModal: boolean = false;
  public openPicker: boolean = false;
  public showInputDate: boolean = false;

  public selectedToday: boolean = false;
  public seletedYesterday: boolean = false;
  public chipSelected: number;
  public nameSelected: string;
  public monthlySelected: string;

  public disabledButtonSave: boolean = true;

  public isDebito: boolean = false;
  public isCredito: boolean = false;
  public isDinheiro: boolean = false;
  public isPix: boolean = false;
  public isOther: boolean = false;

  public nomeMeses = [
    { mes: '01', name: 'Janeiro' },
    { mes: '02', name: 'Fevereiro' },
    { mes: '03', name: 'Março' },
    { mes: '04', name: 'Abril' },
    { mes: '05', name: 'Maio' },
    { mes: '06', name: 'Junho' },
    { mes: '07', name: 'Julho' },
    { mes: '08', name: 'Agosto' },
    { mes: '09', name: 'Setembro' },
    { mes: '10', name: 'Outubro' },
    { mes: '11', name: 'Novembro' },
    { mes: '12', name: 'Dezembro' },
  ];

  constructor(
    private readonly _utils: UtilService,
    private readonly _session: SessionService,
    private readonly _formBuilder: FormBuilder,
    private readonly _gastosService: GastosService,
  ) { }

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  ngOnInit(): void {
    this.todosGastos();
    this.changeName(0);
    this.form = this._formBuilder.group({
      currency: [0, [Validators.required, Validators.min(1),]],
      description: ['', [Validators.required, Validators.min(1),]],
      datePicker: [
        '',
        [
          // Validators.required,
        ]
      ]
    });
    this.changeChip(0);
  }

  public isEnableSave(): boolean {
    return this.form.invalid;
  }

  public submitForm(): void {
    const { description, currency } = this.form.controls;
    const gasto: GastosModel = {
      monthly: this.inputDate.substring(3).replace('/', ''),
      date: this.inputDate,
      name: this.nameSelected,
      description: description.value as string,
      value: currency.value as number
    };
    this.publicarGastos(gasto);
  }

  public receiverAddButton(): void {
    this.openModal = true;
  }

  public closeModal(): void {
    this.openModal = false;
    this.ngOnInit();
  }

  public cardSelected(value: string): void {
    this.monthlySelected = value;
    this.filterMonthlySelected(value);
    this._utils.goToPage('statement');
  }

  public changeChip(value: number): void {
    this.chipSelected = value;
    switch (this.chipSelected) {
      case 0:
        this.selectedToday = true;
        this.seletedYesterday = false;
        this.showInputDate = false;
        this.inputDate = new Date().toLocaleDateString();
        break;
      case 1:
        this.selectedToday = false;
        this.seletedYesterday = true;
        this.showInputDate = false;
        const today = new Date();
        const yesterday = new Date();
        const date = yesterday.setDate(today.getDate() - 1)
        this.inputDate = new Date(date).toLocaleDateString();
        break;
      case 2:
        this.selectedToday = false;
        this.seletedYesterday = false;
        this.showInputDate = true;
        break;
      default:
        break;
    }
  }

  public changeName(value: number): void {

    switch (value) {
      case 0:
        this.isDebito = true;
        this.isCredito = false;
        this.isDinheiro = false;
        this.isPix = false;
        this.isOther = false;
        this.nameSelected = 'Débito';
        break;
      case 1:
        this.isDebito = false;
        this.isCredito = true;
        this.isDinheiro = false;
        this.isPix = false;
        this.isOther = false;
        this.nameSelected = 'Crédito';
        break;
      case 2:
        this.isDebito = false;
        this.isCredito = false;
        this.isDinheiro = true;
        this.isPix = false;
        this.isOther = false;
        this.nameSelected = 'Dinheiro';
        break;
      case 3:
        this.isDebito = false;
        this.isCredito = false;
        this.isDinheiro = false;
        this.isPix = true;
        this.isOther = false;
        this.nameSelected = 'PIX';
        break;
      case 4:
        this.isDebito = false;
        this.isCredito = false;
        this.isDinheiro = false;
        this.isPix = false;
        this.isOther = true;
        this.nameSelected = 'Outro';
        break;
      default:
        break;
    }
  }

  public modelChanged(): void {
    const date = new Date(this.datePicker);
    const today = date.setDate(date.getDate() + 1)
    this.inputDate = new Date(today).toLocaleDateString();
  }

  private convertMonthlyToMonth(monthly: string): string {
    const mes = monthly.substring(0, 2);
    return this.nomeMeses.find(value => value.mes === mes).name;
  }

  private toSumArrayValues(array: Array<any>): number {
    return Number(array.reduce((soma, i) => soma + i).toFixed(2));
  }

  private isEqualMonth(month: string): boolean {
    const value = this.listaGastos.find(value => value.title === month);
    return value && value.title === month;
  }

  private todosGastos(): void {
    this.listaGastos = new Array<iCardSelect>();
    this._gastosService.todosGastos()
      .subscribe((success: any) => {
        this._session.allExpenses = success;
        if (this.monthlySelected) this.filterMonthlySelected(this.monthlySelected);
        success.forEach(gasto => {
          this._session.idDataBase = gasto.id + 1;
          const month = this.convertMonthlyToMonth(gasto.monthly);
          (this.listaGastos.length > 0 && this.isEqualMonth(month))
            ? this.somaGastoDoMesmoMes(month, gasto)
            : this.adicionaGasto(gasto);

        console.log('listaGastos', this.listaGastos.sort((a, b) => (Number(a.monthly.substring(0, 2) ) - Number(b.monthly.substring(0, 2)))));
        this.listaGastos = this.changePositionMonths(this.listaGastos);
        
        });

      }, error => {
        console.log('error');
      });
  }

  private adicionaGasto(gasto: any): void {
    this.listaGastos.push({
      id: gasto.id,
      monthly: gasto.monthly,
      title: this.convertMonthlyToMonth(gasto.monthly),
      subTitle: {
        name: 'Gasto total',
        value: gasto.value
      },
      key: gasto.key
    });
  }

  private somaGastoDoMesmoMes(month: string, gasto: any): void {
    this.listaGastos.find(value => value.title === month).subTitle.value += gasto.value;
  }

  private filterMonthlySelected(value: string): void {
    this._session.monthlySelected = this._session.allExpenses.filter(gasto => gasto.monthly === value);
  }

  private publicarGastos(value: GastosModel): void {
    this._gastosService.publicarGastos(value)
      .subscribe(success => {
        this.closeModal();
      }, error => {
        this.closeModal();
      });
  }

  private changePositionMonths(listaGastos: Array<iCardSelect>): Array<iCardSelect> {
    return this.listaGastos.sort((a, b) => (Number(a.monthly.substring(0, 2) ) - Number(b.monthly.substring(0, 2))));
};

}
