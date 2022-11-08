export interface PlateDataRequest {
  id_pedido_mobile: string;
  id_menuMobile: string;
  cantidad: number;
}

export interface Plate {
  id_MenuMobile: string;
  plato: string;
  id_Categoria: number;
  fecha_creacion: string;
  url_foto_menu: string;
  informacion_plato: string;
  categoria: {
    categoriaId: number;
    tipo_categoria: string;
    url_foto: string;
  };
  precio: number;
}
