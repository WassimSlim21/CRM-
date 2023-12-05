import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EditProfilepopupComponent } from '../popup/editprofile/edit-profilepopup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { UserStatsComponent } from '../pages/user-stats/user-stats.component';
import { SharedModule } from '../shared/shared.module';
import { UserStatsModule } from '../pages/user-stats/user-stats.module';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, EditProfilepopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    SharedModule  ],
  entryComponents: [ EditProfilepopupComponent ],
  exports: [HeaderComponent, SidebarComponent]
})

export class LayoutsModule { }
