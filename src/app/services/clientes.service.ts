import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from 'src/app/interface/cliente';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = 'clientes'
  api = environment.api;
  constructor(private http: HttpClient) { }

  buscarTodosClientes(){
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`);
  }

  cadastrarCliente(cliente: ICliente) {
    return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }

  editarCliente(cpf:number, cliente: ICliente){
    return this.http.put(`${this.api}/${this.endpoint}/${cpf}`, cliente);
  }

  buscarClientePorCpf(cpf : number){
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`);
  }

  temClienteComCpf(cpf:number):
    Observable<boolean>{
      return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`).pipe(
        map((response) => {
          return response !== null;
        }),
        catchError((error) => {
          if(error.status === 404){
            return of(false);
          }else{
            throw error;
          }
        }),
        map((exist) => {
          return exist as boolean;
        })
      );
    }




  deletarCliente(cpf : number){
    return this.http.delete(`${this.api}/${this.endpoint}/${cpf}`);

  }
}
