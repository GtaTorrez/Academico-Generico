// Libraries
import { Headers, RequestOptions } from '@angular/http'
import { Injectable }              from '@angular/core'
// Services
import { ConfigService } from './config.service'

declare var Buffer : any

@Injectable()
export class DataService {

  public static setItem(name: string, value: string) : void {
    localStorage.setItem(`${ConfigService.APP_NAME}_${name}`, value)
  }

  public static getItem(name: string) : string {
    return localStorage.getItem(`${ConfigService.APP_NAME}_${name}`)
  }

  public static removeItem(name: string) : void {
    localStorage.removeItem(`${ConfigService.APP_NAME}_${name}`)
  }

  // public static getSession() : any {
  //   const sid = DataService.getItem('sid')
  //   return sid ? JSON.parse(Buffer.from(sid, 'base64').toString()) : undefined
  // }
  //
  // public static setSession(sessionData) : void {
  //   const sid = Buffer.from(JSON.stringify(sessionData)).toString('base64')
  //   DataService.setItem('sid', sid)
  // }

  public static getSession() : any {
    const sid = DataService.getItem('sid')
    return sid ? JSON.parse(sid) : undefined
  }

  public static setSession(sessionData) : void {
    const sid = JSON.stringify(sessionData)
    DataService.setItem('sid', sid)
  }

  public static removeSession() : void {
    DataService.removeItem('sid')
  }
}
