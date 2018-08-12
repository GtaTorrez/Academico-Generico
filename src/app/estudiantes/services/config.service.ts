// Libraries
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public static APP_NAME = 'auth';
  public static CLIENT = {
    clientId     : '7dd41969-dc45-4900-b8b3-89603b06dba7',
    clientSecret : 'ssh-kjh345hgf8735hj5489rkj23rfd098sj'
  }
  public static AUTHORIZATION = {
    url                    : 'http://localhost:4000',
    api                    : 'http://localhost:4000/api/v1',

    cuentaURL              : 'http://localhost:4000/account',
    habilitarCuentaURL     : 'http://localhost:4000/account/habilitar',
    deshabilitarCuentaURL  : 'http://localhost:4000/account/deshabilitar',

    obtenerTokenURL        : 'http://localhost:4000/auth/token',
    verificarTokenURL      : 'http://localhost:4000/auth/token/info',
    refrescarTokenURL      : 'http://localhost:4000/auth/token/refrescar',

    cambiarPasswordURL     : 'http://localhost:4000/auth/pass/cambiar',
    codigoInfoPasswordURL  : 'http://localhost:4000/auth/pass/codigo/info',
    recordarPasswordURL    : 'http://localhost:4000/auth/pass/recordar',
    recuperarPasswordURL   : 'http://localhost:4000/auth/pass/recuperar',

    resetURL               : 'http://localhost:4200/resetPassword'
  }
}
