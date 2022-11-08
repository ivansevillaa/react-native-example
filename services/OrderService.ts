import api from '../config/api';
import { Order, OrderDataRequest } from '../types/Order';
import { Plate, PlateDataRequest } from '../types/Plate';

const getOrderById = (orderId: string) => api.get<Order>(`/ver_pedido_individual/${orderId}`);

const getOrders = (userId: string) =>
  api.get<Order[]>(`ver_listado_pedidos_mobile_terminados/${userId}`);

const getCurrentOrders = (userId: string) =>
  api.get<Order[]>(`ver_listado_pedidos_mobile/${userId}`);

const createOrder = ({ orderData, userId }: { orderData: OrderDataRequest; userId: string }) =>
  api.post(`https://sentidosapi1.azurewebsites.net/creacion_pedido_mobile/${userId}`, orderData);

const addPlates = (plateData: PlateDataRequest[]) =>
  api.post('https://sentidosapi1.azurewebsites.net/creando_menu_pedido', plateData);

const getPlates = (date: string) =>
  api.get<Plate[]>(`https://sentidosapi1.azurewebsites.net/traer_menu_dia/${date}`);

const OrderService = {
  getOrderById,
  getOrders,
  getCurrentOrders,
  createOrder,
  addPlates,
  getPlates,
};

export default OrderService;
