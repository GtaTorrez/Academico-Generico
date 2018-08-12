export class UsuarioFormModel {
  id_usuario: number = 0
  persona = {
    nombre              : '',
    primer_apellido     : '',
    segundo_apellido    : '',
    documento_identidad : '',
    email               : '',
    direccion           : '',
    telefono            : ''
  }
  administrador = {
    cargo: ''
  }
  roles : number[] = []

  constructor () {}
}
