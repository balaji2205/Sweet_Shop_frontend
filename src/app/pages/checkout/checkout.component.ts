// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CartService } from '../../services/cart.service';
// import { ApiService } from '../../services/api.service';

// declare var Razorpay: any;

// @Component({
//   selector: 'app-checkout',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent {

//   phone = '91';
//   loading = false;
//   orderSuccess = false;

//   constructor(
//     private cart: CartService,
//     private api: ApiService
//   ) {}

//   pay() {
//     if (this.loading) return;

//     const items = this.cart.getItems();

//     if (items.length === 0) {
//       alert('Cart is empty');
//       return;
//     }

//     if (this.phone.length < 12) {
//       alert('Enter valid phone number');
//       return;
//     }

//     this.loading = true;

//     // STEP 1: CREATE ORDER IN BACKEND
//     this.api.placeOrder({
//       items,
//       customerPhone: this.phone
//     }).subscribe({
//       next: res => {
//         const orderId = res.order._id;

//         // STEP 2: CREATE RAZORPAY ORDER
//         this.api.createPayment(orderId).subscribe({
//           next: pay => {

//             const options = {
//               key: pay.key,
//               amount: pay.amount,
//               currency: 'INR',
//               order_id: pay.razorpayOrderId,

//               handler: (response: any) => {
//                 // STEP 3: VERIFY PAYMENT
//                 this.api.verifyPayment({
//                   orderId,
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                   razorpay_signature: response.razorpay_signature
//                 }).subscribe({
//                   next: () => {
//                     this.cart.clear();
//                     this.loading = false;
//                     this.orderSuccess = true;
//                   },
//                   error: () => {
//                     this.loading = false;
//                     alert('Payment verification failed');
//                   }
//                 });
//               },

//               modal: {
//                 ondismiss: () => {
//                   // USER CLOSED PAYMENT POPUP
//                   this.loading = false;
//                 }
//               }
//             };

//             new Razorpay(options).open();
//           },
//           error: () => {
//             this.loading = false;
//             alert('Failed to initiate payment');
//           }
//         });
//       },
//       error: () => {
//         this.loading = false;
//         alert('Failed to place order');
//       }
//     });
//   }
// }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  customerName = '';
  phone = '91';
  loading = false;
  orderSuccess = false;
  paymentType: 'PAY_NOW' | 'PAY_LATER' | null = null;

  constructor(
    private cart: CartService,
    private api: ApiService
  ) {}

  placeOrder(type: 'PAY_NOW' | 'PAY_LATER') {

    if (!this.customerName || !this.customerName.trim()) {
      alert('Please enter your name');
      return;
    }


    if (this.loading || this.cart.getItems().length === 0) return;

    this.loading = true;
    this.paymentType = type;

    const items = this.cart.getItems().map(i => ({
      productId: i.productId,
      quantityInGrams: i.quantityInGrams
    }));

    this.api.placeOrder({
      items,
      customerName: this.customerName,
      customerPhone: this.phone
    }).subscribe({
      next: res => {
        const orderId = res.order._id;

        this.api.confirmPayment({
          orderId,
          paymentType: type
        }).subscribe({
          next: () => {
            this.cart.clear();
            this.loading = false;
            this.orderSuccess = true;
          },
          error: () => {
            this.loading = false;
          }
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}