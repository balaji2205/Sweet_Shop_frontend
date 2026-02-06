// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ApiService } from '../../services/api.service';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {

//   products: any[] = [];

//   constructor(
//     private api: ApiService,
//     public cart: CartService,   // 👈 public so HTML can access
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.api.getProducts().subscribe(res => {
//       this.products = res;
//     });
//   }

//   addToCart(p: any) {
//     if (!p.qty || p.qty <= 0) {
//       alert('Enter quantity');
//       return;
//     }

//     this.cart.add({
//       productId: p._id,
//       name: p.name,
//       quantityInGrams: p.qty,
//       price: (p.pricePerKg / 1000) * p.qty
//     });

//     p.qty = null;
//   }

//   getTotal() {
//     return this.cart.getItems()
//       .reduce((sum, i) => sum + i.price, 0);
//   }

//   checkout() {
//     this.router.navigate(['/checkout']);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  error = '';

  constructor(
    private api: ApiService,
    public cart: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getProducts().subscribe({
      next: res => (this.products = res),
      error: () => (this.error = 'Failed to load products')
    });
  }

  addToCart(p: any) {
    if (!p.qty || p.qty <= 0) return;

    this.cart.add({
      productId: p._id,
      name: p.name,
      quantityInGrams: p.qty,
      price: (p.pricePerKg / 1000) * p.qty
    });

    p.qty = null;
  }

  getTotal() {
    return this.cart.getItems().reduce((sum, i) => sum + i.price, 0);
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
