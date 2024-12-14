import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  constructor(private http: HttpClient) { }

  public getProductosByCategoria(id_categoria: number) {
    return this.http.get(`http://localhost:4000/api/categorias/${id_categoria}/productos`);
  }

  public deleteProducto(id: number) {
    return this.http.delete(`http://localhost:4000/api/productos/${id}`)
  }
}