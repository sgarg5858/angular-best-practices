import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

export interface Config{
  baseUrl:string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient:HttpClient) { }

  private configBehaviorSubject = new BehaviorSubject<Config|null>(null);

  public readonly config$ = this.configBehaviorSubject.asObservable()
  .pipe(
    filter((config)=>config!==null)
    );

  getConfigFile()
  {
    //we can store this url in environment file & then access environment
    // variables via Injection TOken
    this.httpClient.get<Config>('../../assets/config.json').subscribe({
      next:(config:Config)=>{
        this.configBehaviorSubject.next(config)
      },
      error: (error)=>{
        
        this.configBehaviorSubject.error(error);
      }
    })
  }
}
