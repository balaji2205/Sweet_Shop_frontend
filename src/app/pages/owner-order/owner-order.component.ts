import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-owner-order',
  imports: [CommonModule],
  templateUrl: './owner-order.component.html',
  styleUrl: './owner-order.component.css'
})
export class OwnerOrderComponent {
  orders: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.api.getAllOrders().subscribe(res => {
      this.orders = res;
      this.loading = false;
    });
  }

  updateStatus(orderId: string, status: string) {
    this.api.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadOrders();
    });
  }
}
