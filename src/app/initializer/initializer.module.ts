import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { take } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:APP_INITIALIZER,
      multi:true,
      useFactory:(configService:ConfigService)=>{
        return ()=>{
          configService.getConfigFile();
          return configService.config$.pipe(take(1));
        }
      },
      deps:[ConfigService]
    }
  ]
})
export class InitializerModule { }
