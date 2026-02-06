import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SuccessComponent } from './pages/success/success.component';
import { OwnerDashboardComponent } from './pages/owner-dashboard/owner-dashboard.component';
import { AuthGuard } from './services/auth.gaurd';
import { OwnerLoginComponent } from './pages/owner-login/owner-login.component';
import { OwnerOrderComponent } from './pages/owner-order/owner-order.component';


export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'owner', component: OwnerDashboardComponent,canActivate: [AuthGuard] },
  { path: 'owner/orders', component: OwnerOrderComponent,canActivate: [AuthGuard] },
  {path: 'owner/login',component: OwnerLoginComponent},
  {path: 'owner',component: OwnerDashboardComponent,canActivate: [AuthGuard]},
  // {path: 'owner/orders',component: OwnerOrdersComponent,}
];
