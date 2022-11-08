export interface Order {
  id_pedidos: string;
  menu_pedido: OrderPlate[];
  nickname: string;
  direccion: string;
  fecha: string;
  hora: string;
  metodo_de_pago: string;
  forma_De_retiro: string;
  estados_pedido: string;
  total: number;
}

export interface OrderDataRequest {
  id_metodo_pago: number;
  id_metodo_busqueda: number;
  direccion: string;
  id_estado_pedido: number;
  fecha: string;
  hora: string;
}

export interface OrderPlate {
  plato: string;
  porciones: number;
  total: number;
  urlfoto: string;
}
