import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Pack } from 'src/app/core/models/pack';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-pack',
  templateUrl: './update-pack.component.html',
  styleUrls: ['./update-pack.component.scss']
})
export class UpdatePackComponent implements OnInit {
  packId: any;
  updateForm: FormGroup;
  pack: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private   router: Router,
              public dialogRef: MatDialogRef<UpdatePackComponent>,
              public dialog: MatDialog, private apiService: ApiService,
              private snackBar: MatSnackBar) {
    this.updateForm = new FormGroup({
      pack_name: new FormControl('', Validators.required),
      socialAccounts: new FormControl(0, [, Validators.required]),
      users: new FormControl(0, [Validators.required]),
      benchmarks: new FormControl(0, [, Validators.required]),
      annualSubscription: new FormControl(0, [, Validators.required]),
      maxFansNumber: new FormControl(0, [, Validators.required]),
      dataHistoryYears: new FormControl(0, [, Validators.required]),
      dashboard: new FormControl(false, [, Validators.required]),
      audienceInsights: new FormControl(false, [, Validators.required]),
      trendengagementreports: new FormControl(false, [, Validators.required]),
      customBenchmark: new FormControl(false, [, Validators.required]),
      nationalReports: new FormControl(false, [, Validators.required]),
      competitorContentCuration: new FormControl(false, [, Validators.required]),
      emailReports: new FormControl(false, [, Validators.required]),
      brandingDesign: new FormControl(false, [, Validators.required]),
      mouthlySubcription: new FormControl(0, [, Validators.required]),
      addPage: new FormControl(0, [, Validators.required]),
      addUser: new FormControl(0, [, Validators.required]),
      addBenchmark: new FormControl(0, [, Validators.required]),

    });
  }
  ngOnInit() {
    this.loadPack();
  }

  updatePack() {
    this.apiService.apiPut(`pack/update/${this.data.packId}`, this.updateForm.value).subscribe(
      (response: any) => {
        this.snackBar.open(JSON.stringify(response.message));
      }
    );


    this.apiService.apiPost('notification/',
    {source_id : JSON.parse(localStorage.getItem('account'))._id,
    route : this.router.url,

     content : `${this.pack.pack_name} Pack was updated`,
     destinations : []}).subscribe(response => {
      console.log('notifiier :', response);
    });


    this.dialogRef.close();
  }

  loadPack(): void {
    this.apiService.apiGetAll('pack/' + this.data.packId).subscribe(
      (response: any) => {
        if (response) {
          this.pack = response.pack;
          console.log('pack : ', this.pack);
          console.log('pack id', this.packId);
          this.updateForm = new FormGroup({
            pack_name: new FormControl(this.pack.pack_name, Validators.required),
            socialAccounts: new FormControl(this.pack.socialAccounts.max_have, [, Validators.required]),
            users: new FormControl(this.pack.users, [Validators.required]),
            benchmarks: new FormControl(this.pack.benchmarks.max_have, [, Validators.required]),
            annualSubscription: new FormControl(this.pack.annualSubscription, [, Validators.required]),
            maxFansNumber: new FormControl(this.pack.maxFansNumber, [, Validators.required]),
            dataHistoryYears: new FormControl(parseInt(this.pack.dataHistoryYears), [, Validators.required]),
            dashboard: new FormControl(this.pack.dashboard, [, Validators.required]),
            audienceInsights: new FormControl(this.pack.audienceInsights, [, Validators.required]),
            trendengagementreports: new FormControl(this.pack.trendengagementreports, [, Validators.required]),
            customBenchmark: new FormControl(this.pack.customBenchmark, [, Validators.required]),
            nationalReports: new FormControl(this.pack.nationalReports, [, Validators.required]),
            competitorContentCuration: new FormControl(this.pack.competitorContentCuration, [, Validators.required]),
            emailReports: new FormControl(this.pack.emailReports, [, Validators.required]),
            brandingDesign: new FormControl(this.pack.brandingDesign, [, Validators.required]),
            mouthlySubcription: new FormControl(this.pack.mouthlySubcription, [, Validators.required]),
            addPage: new FormControl(this.pack.addPage, [, Validators.required]),
            addUser: new FormControl(this.pack.addUser, [, Validators.required]),
            addBenchmark: new FormControl(this.pack.addBenchmark, [, Validators.required]),
          });
          this.updateForm.valueChanges.subscribe(value => {
            value.benchmarks = {max_have : value.benchmarks , deletes: value.benchmarks};
            value.socialAccounts = {max_have : value.socialAccounts , deletes: value.socialAccounts};
            value.dataHistoryYears = value.dataHistoryYears + ' YEARS';
            console.log(value);
          });
        }
      },
      error => {
        console.log(error);
      });
  }
  cancel() {
    this.loadPack();
  }
}

