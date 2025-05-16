import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GastosModel } from '../models/gastos.model';
import { environment } from 'src/environments/environment';

import { Database, ref, push, remove, onValue } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private readonly URL = environment.API;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly database: Database // Injeta corretamente o Database
  ) {}

  public todosGastos(): Observable<any> {
    const gastosRef = ref(this.database, 'gastos'); // Referência ao caminho "gastos"

    return new Observable((observer) => {
      onValue(gastosRef, (snapshot) => {
        const gastos = [];
        snapshot.forEach((childSnapshot) => {
          gastos.push({ key: childSnapshot.key, ...childSnapshot.val() });
        });
        observer.next(gastos);
      });
    });
  }

  public publicarGastos(request: GastosModel): Observable<any> {
    const gastosRef = ref(this.database, 'gastos');

    return new Observable((observer) => {
      push(gastosRef, request)
        .then((result) => {
          observer.next(result);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public editarGasto(request: any): Observable<any> {
    return this.httpClient.put(this.URL, request);
  }

  public deletarGasto(key: string): void {
    const gastoRef = ref(this.database, `gastos/${key}`);
    remove(gastoRef)
      .then(() => {
        console.log('Gasto removido com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao remover gasto:', error);
      });
  }
}
