export class DatosGeneralesModel {
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
  rol : ''

  constructor () {}
}
