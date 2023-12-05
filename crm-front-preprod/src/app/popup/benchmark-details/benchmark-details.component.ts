import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import * as moment from 'moment';
import { SocialAccountDetailsComponent } from '../social-account-details/social-account-details.component';
import { TagDetailsComponent } from '../tag-details/tag-details.component';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-benchmark-details',
  templateUrl: './benchmark-details.component.html',
  styleUrls: ['./benchmark-details.component.scss']
})
export class BenchmarkDetailsComponent implements OnInit {

  socialAccounts: any;
  users: any;
  tag: any;
  tagsTotal: any;
  benchmark: any;
  tags: any;
  moment = moment;

  constructor(public dialogRef: MatDialogRef<BenchmarkDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private Api: ApiService, private router: Router,
              private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.tagsTotal = 0;
    console.log(this.data.id);

    this.loadBenchmark(this.data.id);
  }





    // Get Benchmark By Id
    loadBenchmark(id): void {
      this.Api.apiGetAll('benchmark/' + id).subscribe(
        (bench: any) => {
          if (bench) {
            this.benchmark = bench.benchmark;
            this.users = bench.users;
            this.socialAccounts = this.benchmark.social_accounts;
            this.tags = bench.tags;
            this.socialAccounts.forEach(element => {
              if (element) {
                this.tagsTotal = this.tagsTotal + element.tags.length;
                element.tags.forEach(e => {
                  if (e.synonyms) {
                    e.synonyms = e.synonyms.split(',');
                     } else {
                      e.synonyms = [];
                     }
                    });
                 } else {
                  element = [];
                 }
                });
            console.log('All', bench);
            console.log('benchmark', this.benchmark);
            console.log('users', this.users);
            console.log('socialAccount', this.socialAccounts);


          }
        }
      );
    }

    // Social Account Details
    openDialogSocialAccount(id): void {
      const dialogRef = this.dialog.open(SocialAccountDetailsComponent, {
        disableClose: false,
        height: '70%',
        width: '50%',
        data: {
          id
        }

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    //TAG Details
    openTagDetails(tag): void {
      const dialogRef = this.dialog.open(TagDetailsComponent, {
        disableClose: false,
        height : 'auto' ,
        width : 'auto',

        data: {
          tag
        }

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }


    openDialogUser(id): void {
      const dialogRef = this.dialog.open(UserDetailsComponent, {
        disableClose: false,
        height: '90%',
        position: { right: '10' },
        data: {
          userId: id
        }

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

}
