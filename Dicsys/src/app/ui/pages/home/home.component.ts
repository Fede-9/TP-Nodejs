import { CategoriasService } from './../../../data/services/categorias/categorias.service';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalText } from './../../../data/text';
import { Component } from '@angular/core';
import { SliderComponent } from "../../components/slider/slider.component";
import { UrlNavigateService } from '../../../services/url-navigate.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { GlobalUrl } from '../../../data/url';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SliderComponent, FooterComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  arrayCategorias: any

  constructor(
    public globalText: GlobalText,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: GlobalUrl,
    public categoriasService: CategoriasService,
  ) {
    this.categoriasService.getCategorias().subscribe(result => {
      // console.log(result)
      this.arrayCategorias = result
    })

  }

  navigateProductsByCategory(id: number, nombre: string) {
    this.urlNavigateService.navigateToUrlWithData(this.globalUrl.products, {
      state: {
        id: id,
        nombre: nombre
      }
    });
  }
}