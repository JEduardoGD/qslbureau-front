import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseGuard } from './expense.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { QslCapturaComponent } from './qsl-captura/qsl-captura.component';
import { ConsolidateSlotsComponent } from './consolidate-slots/consolidate-slots.component';
import { SlotComponent } from './slot/slot.component';
import { SlotSendComponentComponent } from './slot-send-component/slot-send-component.component';
import { SlotDetailComponent } from './slot-detail/slot-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'qsl-capture', component: QslCapturaComponent, canActivate: [ExpenseGuard]},
  { path: 'slot', component: SlotComponent, canActivate: [ExpenseGuard]},
  { path: 'slot-consolidate', component: ConsolidateSlotsComponent, canActivate: [ExpenseGuard]},
  { path: 'slot-send', component: SlotSendComponentComponent, canActivate: [ExpenseGuard]},
  { path: 'slot-detail', component: SlotDetailComponent, canActivate: [ExpenseGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, 
    FormsModule,
    ReactiveFormsModule]
})
export class AppRoutingModule { }
