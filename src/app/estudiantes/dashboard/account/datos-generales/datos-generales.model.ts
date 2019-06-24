export class DatosGeneralesModel {
  id  : number = 0
  rol : string = ''
  persona = {
    nombre              : '',
    primer_apellido     : '',
    segundo_apellido    : '',
    documento_identidad : '',
    email               : '',
    direccion           : '',
    telefono            : ''
  }

  constructor () {}
}
