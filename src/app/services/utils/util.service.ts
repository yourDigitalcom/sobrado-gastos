import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private readonly _router: Router,
    private readonly _location: Location
  ) { }

  public goToPage(route: string): void {
    this._router.navigate([route]);
  }

  public onBackPage(): void {
    this._location.back();
  }
}
