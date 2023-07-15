import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'new-modal-share',
  templateUrl: './new-modal-share.component.html',
  styleUrls: ['./new-modal-share.component.scss'],
})

export class NewModalShareComponent implements OnInit, OnChanges {

  @ViewChild('bodyShare', { read: ElementRef, static: false }) public bodyShare: ElementRef;

  @Output() public readonly close: EventEmitter<boolean> = new EventEmitter();
  @Output() public readonly share: EventEmitter<void> = new EventEmitter();

  @Input() public title: string = null;
  @Input() public showHeader: boolean = true;

  @Input() public get open(): boolean {
    return this._open;
  }

  public set open(value: boolean) {    
    this._open ? this.toClose() : this._open = value;
  }

  public isClose: boolean;
  public userAgent = window.navigator.userAgent;
  public maxWidth = (window.innerWidth * 1.99) as number;

  private _open = false;
  private _idTimeout: ReturnType<typeof setTimeout>;
  

  private readonly ANIMATION_TIMEOUT_DEFAULT = 500;

  public ngOnInit(): void {
    this.maxWidth = this.userAgent.indexOf('Android') > -1 ? 500 : this.maxWidth;
  }
  
  public ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.open && changes.open.currentValue) window.scrollTo(0, 0);
  }
  
  public toClose(): void {
    this.isClose = true;

    if (this._idTimeout !== undefined) {
      clearTimeout(this._idTimeout);
    }

    this._idTimeout = setTimeout(() => {
      this._open = false;
      this.isClose = undefined;
      this.close.emit(this._open);
    }, this.ANIMATION_TIMEOUT_DEFAULT);
  }

}


