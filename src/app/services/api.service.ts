// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   private BASE_URL = 'https://sweet-shop-backend-7nr5.onrender.com';

//   constructor(private http: HttpClient) {}

// getProducts() {
//     return this.http.get<any[]>(`${this.BASE_URL}/api/products`);
//   }

//   placeOrder(data: any) {
//     return this.http.post<any>(`${this.BASE_URL}/api/orders`, data);
//   }

//   createPayment(orderId: string) {
//     return this.http.post<any>(`${this.BASE_URL}/api/orders/payment`, { orderId });
//   }

//   verifyPayment(data: any) {
//     return this.http.post<any>(`${this.BASE_URL}/api/orders/payment/verify`, data);
//   }

//   createProduct(data: any) {
//   return this.http.post(`${this.BASE_URL}/api/products`, data);
// }

// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  BASE_URL = 'https://sweet-shop-backend-7nr5.onrender.com';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(`${this.BASE_URL}/api/products`);
  }

  createProduct(data: any) {
    return this.http.post<any>( `${this.BASE_URL}/api/products`, data);
  }


  placeOrder(data: any) {
    return this.http.post<any>(`${this.BASE_URL}/api/orders`, data);
  }

  confirmPayment(data: any) {
    return this.http.post<any>(
      `${this.BASE_URL}/api/orders/confirm-payment`,
      data
    );
  }


  getAllOrders() {
  return this.http.get<any[]>(
    `${this.BASE_URL}/api/orders/all`
  );
}

updateOrderStatus(orderId: string, status: string) {
  return this.http.patch<any>(
    `${this.BASE_URL}/api/orders/${orderId}/status`,
    { status }
  );
}


ownerLogin(data: { username: string; password: string }) {
  return this.http.post<any>(
    `${this.BASE_URL}/api/auth/login`,
    data
  );
}


}
