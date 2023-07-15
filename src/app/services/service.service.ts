import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlConfig } from '../config/url.config';
import { GastosModel } from '../models/gastos.model';
import { environment } from 'src/environments/environment';

import { AngularFireDatabase } from '@angular/fire/database';

import { map } from 'rxjs/operators';

// import { map } from 'rxjs/'

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private readonly URL = environment.API;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly _db: AngularFireDatabase
    ) { }
  
  public todosGastos(): Observable<any> {
    return this._db.list('gastos')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
        })
      )
  }

  public publicarGastos(request: GastosModel): Observable<any> {
    return new Observable(observer => {
      this._db.list('gastos').push(request)
      .then((result: any) => {
        observer.next(result);
      })
    }) 
  }

  public editartGasto(request): Observable<any> {
    return this.httpClient.put(this.URL, request);
  }

  public deletarGasto(key) {
    this._db.object(`gastos/${key}`).remove();
  }

}
