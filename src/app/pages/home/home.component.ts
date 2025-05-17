import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { iCardSelect } from '../../components/card-select/card-select.component';
import { SessionService } from '../../services/session/session.service';
import { GastosModel } from '../../models/gastos.model';
import { GastosService } from '../../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { UtilService } from 'src/app/services/utils/util.service';

import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaGastos: Array<iCardSelect>;

  public listaTotal: Array<any>;

  public listaSelecionada: any;

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

  public monthMap: { [key: string]: number } = {
    "Janeiro": 1,
    "Fevereiro": 2,
    "Março": 3,
    "Abril": 4,
    "Maio": 5,
    "Junho": 6,
    "Julho": 7,
    "Agosto": 8,
    "Setembro": 9,
    "Outubro": 10,
    "Novembro": 11,
    "Dezembro": 12
  };

  public listSegment = [
    { name: 'Mercadoria', icon: 'trolley', selected: false },
    { name: 'Construção', icon: 'construction', selected: false },
    { name: 'Casa', icon: 'home', selected: false },
  ];

  public segmentName: string;
  public segmentIcon: string;

  public dateNow = new Date();

  public isDisabledNextMonth: boolean;
  public isDisabledBackMonth: boolean;

  public startY = 0;
  public threshold = 300; // Defina um limite para ativar o refresh

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
    this.selectedSegment(0);
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
      value: currency.value as number,
      segment: this.segmentName,
      iconSegment: this.segmentIcon
    };
    console.log('submitForm =>', gasto);

    this.publicarGastos(gasto);
  }

  public receiverAddButton(): void {
    this.openModal = true;
  }

  public closeModal(): void {
    this.openModal = false;
    this.ngOnInit();
  }

  public cardSelected(item: any): void {
    this.filterSegmentSelected(item);
    this._utils.goToPage('statement');
  }

  public filterSegmentSelected(item: any): void {
    this._session.statement = this.listaSelecionada.lancamentos.filter(lancamento => lancamento.iconSegment === item.segmentIcon);
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

  private isEqualSegment(segment: string): boolean {
    const value = this.listaGastos.find(value => value.segmentName === segment);
    return value && value.segmentName === segment;
  }

  private todosGastos(): void {
    this.listaTotal = new Array<any>();
    this._gastosService.todosGastos()
      .subscribe((success: any) => {
        this._session.allExpenses = success;
        if (this.monthlySelected) this.filterMonthlySelected(this.monthlySelected);
        success.forEach(gasto => {
          this._session.idDataBase = gasto.id + 1;
          console.log('TODOS GASTOS =>', gasto);

          const month = this.convertMonthlyToMonth(gasto.monthly);

          if (this.listaTotal.length > 0 && this.isEquaListaPorMes(this.listaTotal, month)) {
            this.listaTotal.find(value => value.monthName === month).lancamentos.push(gasto);
            this.listaTotal.find(value => value.monthName === month).total += gasto.value;
          } else {
            this.listaTotal.push({
              monthName: this.convertMonthlyToMonth(gasto.monthly),
              total: gasto.value,
              lancamentos: [gasto]
            });
          }
        });
        this.changePositionMonths();
        const monthly = moment(this.dateNow).format('DD/MM/YYYY').split('/');
        this.listaSelecionada = this.listaTotal.find(value => value.monthName === this.convertMonthlyToMonth(`${monthly[1]}${monthly[2]}`));

        // this.listaGastos = this.listaSelecionada.lancamentos;
        this.refreshList();
      }, error => {

      });
  }

  private isEquaListaPorMes(lista: Array<any>, month: any): boolean {
    const value = lista.find(value => value.monthName === month);
    return value && value.monthName === month;
  }

  private refreshList(): void {
    this.listaGastos = new Array<iCardSelect>();
    this.listaSelecionada.lancamentos.forEach(gasto => {
      if (this.listaGastos.length > 0 && this.isEqualSegment(gasto.segment)) {
        this.somaGastoDoMesmoSegment(gasto.segment, gasto)
      } else {
        this.adicionaGasto(gasto);
      }
      this.checkDisableMonth();
    });
  }

  public checkDisableMonth(): void {
    const monthly = moment(this.dateNow).format('DD/MM/YYYY').split('/')[1];
    const mesAtual = this.nomeMeses.find(value => value.mes === monthly).name;
    
    this.isDisabledNextMonth = mesAtual === this.listaSelecionada.monthName;
    this.isDisabledBackMonth = 'Janeiro' === this.listaSelecionada.monthName;
  }

  private adicionaGasto(gasto: any): void {
    this.listaGastos.push({
      id: gasto.id,
      monthly: gasto.monthly,
      title: '',
      subTitle: {
        name: 'Gasto total',
        value: gasto.value
      },
      key: gasto.key,
      segmentIcon: gasto.iconSegment,
      segmentName: gasto.segment
    });
  }

  private somaGastoDoMesmoSegment(segment: string, gasto: any): void {
    this.listaGastos.find(value => value.segmentName === segment).subTitle.value += gasto.value;
  }

  private filterMonthlySelected(value: string): void {
    this._session.monthlySelected = this._session.allExpenses.filter(gasto => gasto.monthly === value);
  }

  private publicarGastos(value: GastosModel): void {
    this._gastosService.publicarGastos(value)
      .subscribe(success => {
        this.closeModal();
        this.todosGastos();
      }, error => {
        this.closeModal();
      });
  }

  private changePositionMonths(): void {
    this.listaTotal.sort((a, b) => this.monthMap[a.monthName] - this.monthMap[b.monthName]);
  }

  public selectedSegment(index: number): void {
    this.listSegment.forEach((item, i) => {
      item.selected = i === index;
    });
    this.segmentName = this.listSegment[index].name;
    this.segmentIcon = this.listSegment[index].icon;
  }

  public backMonth(): void {

    const mesAnterior = String(this.monthMap[this.listaSelecionada.monthName] - 1);
    const mes = mesAnterior.length === 1 ? '0' + mesAnterior : mesAnterior;
    const mesFiltrado = this.nomeMeses.find(value => value.mes === mes).name;

    this.listaSelecionada = this.listaTotal.find(value => value.monthName === mesFiltrado);
    console.log('backMonth', this.listaSelecionada);
    this.refreshList();
  }

  public nextMonth(): void {
    const mesAnterior = String(this.monthMap[this.listaSelecionada.monthName] + 1);
    const mes = mesAnterior.length === 1 ? '0' + mesAnterior : mesAnterior;
    const mesFiltrado = this.nomeMeses.find(value => value.mes === mes).name;
    this.listaSelecionada = this.listaTotal.find(value => value.monthName === mesFiltrado);
    this.checkMesSelecionado(this.listaSelecionada, mesFiltrado);
    console.log('nextbackMonth', this.listaSelecionada);
  }

  private checkMesSelecionado(list: Array<any>, mes: string): void {
    if (list) {
      this.refreshList();
    } else {
      this.listaSelecionadaVazia(mes);
    }
  }

  private listaSelecionadaVazia(mes: string): void {
    this.listaSelecionada =
    {
      monthName: mes,
      total: 0,
      lancamentos: []
    }
      ;
    this.listaGastos = [];
    console.log('listaSelecionadaVazia', this.listaSelecionada && this.listaSelecionada.monthName);

  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const endY = event.changedTouches[0].clientY;

    if (endY - this.startY > this.threshold) {
      this.refreshApp();
    }
  }

  refreshApp() {
    location.reload(); // Recarrega a página
  }

}
