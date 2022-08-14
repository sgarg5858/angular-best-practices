import { InjectionToken } from "@angular/core";


export const LOCAL_STORAGE = new InjectionToken(
    'localStorage',   
    {
        providedIn:'root',
        factory:()=> localStorage 
    }
)