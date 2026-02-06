import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {

  products: any[] = [];

  newProduct = {
    name: '',
    category: 'Sweet',
    pricePerKg: null as number | null
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.category || !this.newProduct.pricePerKg) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      name: this.newProduct.name,
      category: this.newProduct.category,
      pricePerKg: Number(this.newProduct.pricePerKg)
    };

    this.api.createProduct(payload).subscribe(() => {
      alert('Product added');
      this.newProduct = { name: '', category: 'Sweet', pricePerKg: null };
      this.loadProducts();
    });
  }


  deleteProduct(id: string) {
  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  this.api.deleteProduct(id).subscribe({
    next: () => {
      this.products = this.products.filter(p => p._id !== id);
    },
    error: () => {
      alert('Failed to delete product');
    }
  });
}

}
