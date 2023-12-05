import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ApiService } from 'src/app/core/service/api.service';
import { MatTableDataSource, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Pack } from 'src/app/core/models/pack';
import * as moment from 'moment';
import { ConfirmDialogModel, ComfirmDialogComponent } from 'src/app/popup/comfirm-dialog/comfirm-dialog.component';
import { PackDetailsComponent } from 'src/app/popup/pack-details/pack-details.component';
import { UpdatePackComponent } from 'src/app/popup/update-pack/update-pack.component';
import { Router } from '@angular/router';
import { AddPackComponent } from 'src/app/popup/add-pack/add-pack.component';


@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent implements OnInit {
  isLoading = true ;
  moment = moment;
  public packs: any[];
  result: any;

  displayedColumns: string[] = ['Packname', 'AnnualSubscriiption', 'DataHistory', 'SocialAccounts',
                                'Benchmarks', 'CreatedAt', 'UpdatedAt' , 'star'];
  dataSource: MatTableDataSource<Pack>;
  constructor(private apiService: ApiService,
              private router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PacksComponent>
    ) {

   }
  ngOnInit() {

    this.getPacks();
  }
  getPacks() {
    this.apiService.apiGetAll('pack').subscribe(
      (response: any) => {
        if (response) {
          this.isLoading = false;
          this.packs = response;
          this.dataSource = new MatTableDataSource<Pack>(this.packs);
          console.log(response);
        }
      },
    error => {
      console.log(error);
    });
  }

  openNewPack(): void {
    const dialogRef = this.dialog.open(AddPackComponent, {
      disableClose: false,
      height: '75%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getPacks();

    });
  }


  openDialog(id): void {
    const dialogRef = this.dialog.open(PackDetailsComponent, {
      disableClose: false,
      height : 'auto' ,
      width : 'auto',

      data: {
        packId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getPacks();
    });
  }
  openDialogUpdate(id): void {
    const dialogRef = this.dialog.open(UpdatePackComponent, {
      disableClose: false,
      height : 'auto' ,
      width : 'auto',

      data: {
        packId: id
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getPacks();
    });
  }

  comfirmDialog(idPack): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if ( this.result === true) {
        this.apiService.apiDelete(`pack/${idPack}`).subscribe(
          (response: any) => {
            console.log('delete' + response);
            this.snackBar.open(JSON.stringify(response.message));
            this.getPacks();
          }
      );
        this.dialogRef.close();

    }
    });
  this.getPacks();
  }

}
