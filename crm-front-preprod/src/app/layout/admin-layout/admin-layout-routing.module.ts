import { Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { LayoutModule } from '@angular/cdk/layout';
export const AdminLayoutRoutes: Routes = [
  {
    path: '', component: LayoutModule, canActivate: [AuthGuardService],
    children: [


    ]
  }
  ];

export class AdminRoutingModule { }
