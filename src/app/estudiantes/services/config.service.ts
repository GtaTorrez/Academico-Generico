// Libraries
import { Injectable } from '@angular/core';

import { Global } from '../../config/global'

@Injectable()
export class ConfigService {
  public static APP_NAME = 'auth';
  public static CLIENT = {
    clientId     : '7dd41969-dc45-4900-b8b3-89603b06dba7',
    clientSecret : 'ssh-kjh345hgf8735hj5489rkj23rfd098sj'
  }
  public static BASE_URL = `${Global.BASE_URL}:${Global.port}`
  public static AUTHORIZATION = {
    url : `${ConfigService.BASE_URL}`,
    api : `${ConfigService.BASE_URL}/api/v1`,

    cuentaURL          : `${ConfigService.BASE_URL}/auth/autentificacion`,
    logOutURL          : `${ConfigService.BASE_URL}/auth/salir`,
    cambiarPasswordURL : `${ConfigService.BASE_URL}/usuario/cambiarPassword`,

    obtenerhistorialEstudianteURL      : `${ConfigService.BASE_URL}/asistencia/historial_alumno`,
    obtenerhistorialEstudianteTutorURL : `${ConfigService.BASE_URL}/asistencia/historial_por_tutor`,
    obtenerhistorialDocenteURL         : `${ConfigService.BASE_URL}/asistencia/historial_docente`,
    obtenerhistorialAdministrativoURL  : `${ConfigService.BASE_URL}/asistencia/historial_administrativo`,

    habilitarCuentaURL     : `${ConfigService.BASE_URL}/account/habilitar`,
    deshabilitarCuentaURL  : `${ConfigService.BASE_URL}/account/deshabilitar`,

    obtenerTokenURL   : `${ConfigService.BASE_URL}/auth/token`,
    verificarTokenURL : `${ConfigService.BASE_URL}/auth/token/info`,
    refrescarTokenURL : `${ConfigService.BASE_URL}/auth/token/refrescar`,

    codigoInfoPasswordURL : `${ConfigService.BASE_URL}/auth/pass/codigo/info`,
    recordarPasswordURL   : `${ConfigService.BASE_URL}/auth/pass/recordar`,
    recuperarPasswordURL  : `${ConfigService.BASE_URL}/auth/pass/recuperar`,

    resetURL : `${ConfigService.BASE_URL}/resetPassword`
  }
}
