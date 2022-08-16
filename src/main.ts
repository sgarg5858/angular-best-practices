import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(()=>{
    let containerElement = document.getElementById('initialContainer');

    if(containerElement)
    {
      containerElement.remove();
    }
  })
  .catch(err =>
    {
      console.log(err);
      let intialElement = document.getElementById('initialView');
      console.log(intialElement)
    if(intialElement)
    {
      intialElement.textContent="Coudln't reach our servers, please try again :)";
      intialElement.classList.add('red-border');
    }
    });
