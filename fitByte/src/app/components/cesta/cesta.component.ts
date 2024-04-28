import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/fire.service'
import { FormsModule } from '@angular/forms';
import { TarjetaCestaComponent } from '../../components/tarjeta-cesta/tarjeta-cesta.component';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [TarjetaCestaComponent, FormsModule],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css', '../component.css']
})
export class CestaComponent {

  userId: string = '462f';
  cesta : any[] = [];
  descuento: number = 0;
  precio: number = 0;
  unidades: number = 0;
  promocionalCode: string = '';
  discountApplied: boolean = false;

  @Output() volver = new EventEmitter<void>();
  constructor(private authService: AuthService) {}



  /*Generador datos de compra*/
  generarDatos(): { fecha: string, id: string, numPedido: string } {
    const fecha = this.obtenerFecha();
    const id = this.generarID();
    const numPedido = this.generarNumeroPedido();

    return { fecha, id, numPedido };
  }

  obtenerFecha(): string {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const año = now.getFullYear();

    return `${dia}/${mes}/${año}`;
  }

  generarID(): string {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 4;
    let id = '';
    for (let i = 0; i < longitud; i++) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
  }

  generarNumeroPedido(): string {
    return String(Math.floor(Math.random() * 1000000000000));
  }


  ngOnInit(): void {
    const datosUserStr = sessionStorage.getItem('datosUser');
    if (datosUserStr !== null) {
      const datosUser = JSON.parse(datosUserStr);
      if (typeof datosUser === 'object' && datosUser.uid !== undefined) {
        const userUid = datosUser.id;
        this.authService.getUserByID('462f').then((usuario) => {
          if (usuario) {
            let promises = usuario.cesta.map((productoID: any) => {
              return this.authService.getProductByID(productoID).then((producto) => {
                if (producto) {
                  this.cesta.push(producto);
                  this.precio += producto.precio;
                }
              }).catch((error) => {
                console.error('Error al obtener producto por ID:', error);
              });
            });

            Promise.all(promises).then(() => {
              this.unidades = this.cesta.length;
            });

            //this.userId = usuario;
          } else {
            console.log('Usuario no encontrado.');
          }
        }).catch(error => {
          console.error('Error al obtener usuario:', error);
        });
      } else {
        console.error('No se encontraron datos de usuario válidos en sessionStorage');
      }
    } else {
      console.error('No se encontraron datos de usuario en sessionStorage');
    }
  }



  deleteChild(eventData: any){
    this.cesta = this.cesta.filter((producto) => producto.id !== eventData);
  }

  editQuantity(eventData: any){
    this.unidades += eventData;
  }

  editPrice(eventData: any){
    this.precio += Math.round(eventData);
  }

  applyDisccount(){
    this.authService.checkDiscountCode(this.promocionalCode)
    .then(exist => {
      if (!this.discountApplied && exist) {
        this.descuento = 10;
        this.precio = this.precio - (this.precio * (this.descuento / 100));
        this.discountApplied = true;
      }
    });
  }

  emptyCesta(){
    this.authService.vaciarCesta(this.userId);
    this.cesta = [];
    this.unidades = 0;
    this.precio = 0;
    this.descuento = 0;

  }

  finishPurchase(){
    if(this.cesta.length > 0){
      const datosGenerados = this.generarDatos();
      this.authService.createPurchase(datosGenerados.id, datosGenerados.fecha, datosGenerados.numPedido, this.precio.toString());
      this.authService.addUserProduct(this.userId, datosGenerados.id, 'compras');
      this.emptyCesta();
    }
  }

  volverClick() {
    this.volver.emit();
  }

}
