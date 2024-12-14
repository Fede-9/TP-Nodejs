import { ProductosService } from './../../../data/services/productos/productos.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  arrayProductosByCategorias: any;
  nombreCategoria: any;
  id_categoria: any;

  constructor(
    public globalText: GlobalText,
    public router: Router,
    public productosService: ProductosService
  ) {
    const navegabilidad = this.router.getCurrentNavigation();

    if (navegabilidad && navegabilidad.extras && navegabilidad.extras.state) {
      const data = navegabilidad.extras.state;
      this.id_categoria = data['id'];
      this.nombreCategoria = data['nombre'];
    }

    this.productosService.getProductosByCategoria(this.id_categoria).subscribe(result => {
      this.arrayProductosByCategorias = result;
    });
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe({
        next: () => {
          this.arrayProductosByCategorias = this.arrayProductosByCategorias.filter((producto: any) => producto.id !== id);
          alert('Producto eliminado con éxito');
        },
        error: (err) => {
          console.error('Error al eliminar el producto', err);
          alert('Hubo un error al eliminar el producto. Intenta nuevamente.');
        }
      });
    }
  }
}
