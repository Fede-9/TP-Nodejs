import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UrlNavigateService {
  constructor(private router: Router) { }

  // 1- Metodos para navegar sin datos
  navigateToUrl(url: string) {
    this.router.navigateByUrl(url);
  }


  // 2- Metodo para navegar con datos
  navigateToUrlWithData(url: string, params: any) {
    this.router.navigateByUrl(url, params);
  }

}
