import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ApiService } from 'src/app/core/service/api.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PackUserListComponent } from 'src/app/popup/pack-user-list/pack-user-list.component';
import { UsersStatsPopupComponent } from 'src/app/popup/users-stats-popup/users-stats-popup.component';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {

  isLoadingStats = true;
  packsTot: any;
  companyNumber: any;
  length: number;
  packsNumber: any;
  users: any;


  /*

   // Pie users per packs

  */

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public userPackStat: any[];
  public pieChartLabels: Label[] = [['', ''], ['', '', ''], [''], ['', '', ''], ['', '', ''], ['', '', '']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#cb2025', '#f8b334', '#00a096',
        '#97bf0d', 'rgb(255, 235, 59)', 'rgb(233, 30, 99)']
    },
  ];


  /*

  end Pie users per packs

  */


  /*
    barChart User activity per day

  */

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }

  ];
  public datausers: any;
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors = [
    {
      backgroundColor: ['#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096', '#cb2025',
        '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096',
        '#cb2025', '#f8b334', '#00a096', '#cb2025', '#f8b334', '#00a096']
    },
  ];


  constructor(private userService: ApiService,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersWeeklyStats();
    this.getUserPerPackStats();
    this.getUsers();
    this.getCompany();
  }

  openDialog(users): void {
    const dialogRef = this.dialog.open(UsersStatsPopupComponent, {
      data: {
        users
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public barChartClicked({ event, active }: { event: MouseEvent, active: any }): void {
    console.log(active[0]._model.label);
    console.log(active);

    console.log(event);
    let pos = this.datausers.Allusers.map((e) => e.day).indexOf(active[0]._model.label);
    this.users = this.datausers.Allusers[pos];
    this.openDialog(this.users);
  }

  public barChartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  getUserPerPackStats() {

    this.userService.apiGetAll('stats/UserPerPack').subscribe(
      (data: any) => {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.isLoadingStats = false;
        this.userPackStat = data.stats;
        console.log('stats', data);
        this.packsTot = data.total;
        data.stats.forEach(stat => {
          this.pieChartData.push(stat.count);
          this.pieChartLabels.push(stat.pack);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getUsersWeeklyStats() {
    this.userService.apiGetAll('stats/usersWeeklyStats').subscribe(
      (response: any) => {
        this.barChartData = response.barChartData;
        this.barChartLabels = response.labels;
        this.datausers = response;
      }
    );
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: any[] }): void {
    this.openDialogStat(this.userPackStat[active[0]._index]);
  }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }
  /* Open Dialog pack details */
  openDialogStat(pack): void {
    const dialogRef = this.dialog.open(PackUserListComponent, {
      data: {
        stat: pack
      }

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  /*
end events users per packs

*/


  getCompany() {
    this.userService.apiGetAll('company?pageNo=' + 1 + '&size=' + 10).subscribe(
      (companys: any) => {
        if (companys) {
          this.companyNumber = companys.total;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUsers() {
    this.userService.apiGetAll('user/').subscribe(
      (users: any) => {
        if (users) {
          this.packsNumber = users.packsNumber;
          this.length = users.total;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
