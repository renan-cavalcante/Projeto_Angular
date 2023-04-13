import { Component } from '@angular/core';
import { ICliente } from 'src/app/interface/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  clientes: ICliente[] = [];
  constructor(private clientesService: ClientesService){}

  ngOnInit() {
    this.clientesService.buscarTodosClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    });
  }

  deletar(cpf: number){

    Swal.fire({
      title: 'Deseja mesmo deletar?',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Produto excluído com sucesso.');


        this.clientesService.deletarCliente(cpf).subscribe(
          resultado => {
            console.log('Produto excluído com sucesso.');


          },
          erro => {
            if(erro.status == 404) {
              console.log('Produto não localizado.');
            }
          }
        );
        this.ngOnInit();

      }
    })





  }
}
