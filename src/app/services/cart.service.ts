import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {

  private items: any[] = [];

  add(item: {
    productId: string;
    name: string;
    quantityInGrams: number;
    price: number;
  }) {
    const existing = this.items.find(
      i => i.productId === item.productId
    );

    if (existing) {
      existing.quantityInGrams += item.quantityInGrams;
      existing.price += item.price;
    } else {
      this.items.push(item);
    }
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items = [];
  }
}
