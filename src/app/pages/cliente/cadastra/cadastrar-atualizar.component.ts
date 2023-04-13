import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from 'src/app/interface/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar',
  templateUrl: './cadastrar-atualizar.component.html',
  styleUrls: ['./cadastrar-atualizar.component.css'],
})
export class CadastrarAtualizarComponent {
  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute
  ) {}

  clienteForm = new FormGroup({
    cpf: new FormControl(0, Validators.required),
    nome: new FormControl('', Validators.required),
    telefone: new FormControl(0, Validators.required),
    rendimentoMensal: new FormControl(0, Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl(0, Validators.required),
    cep: new FormControl(0, Validators.required),
  });

  clienteCpf = 0;
  ngOnInit() {
    this.clienteCpf = Number(this.route.snapshot.paramMap.get('cpf'));
    {
      this.clientesService
        .buscarClientePorCpf(this.clienteCpf)
        .subscribe((cliente: ICliente) => {
          this.clienteForm.setValue({
            cpf: cliente.cpf,
            nome: cliente.nome,
            telefone: cliente.telefone || 0,
            rendimentoMensal: cliente.rendimentoMensal || 0,
            rua: cliente.rua,
            numero: cliente.numero || 0,
            cep: cliente.cep,
          });
        });
    }
  }

  cadastrar() {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clientesService.temClienteComCpf(cliente.cpf).subscribe(
      (exist) =>{
        if (exist) {
          Swal.fire({
            title: 'Cliente cadastrado',
            text: "Cliente ja cadastrado, deseja atualiza?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Atualizar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.clientesService.editarCliente(cliente.cpf, cliente).subscribe(
                (result) => {
                  Swal.fire('Atualizado ', 'Cliente atualizado com sucesso', 'success');
                },
                (error) => {
                  console.error(error);
                }
              );
            }
          })
        }else{
          this.clientesService.cadastrarCliente(cliente).subscribe(
            (result) => {
              Swal.fire('Cadastrado ', 'Cliente cadastrado com sucesso', 'success');
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }
    )
  }
}
