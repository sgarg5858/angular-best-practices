import { InjectionToken } from "@angular/core";

export const DELAY = new InjectionToken<number>('delay',{
    providedIn:'root',
    factory:()=>1000
})