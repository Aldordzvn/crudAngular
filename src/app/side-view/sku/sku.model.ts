import { Producto } from "../productos/producto.model";

export class Sku{
    constructor(
        public producto: string,
        public llaveProducto: string,
        public sku: string,
        public cantidad: number
    ){}

}