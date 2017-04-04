import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

// Radar
  public radarChartLabels = ['Kills', 'Deaths', 'Assists', 'CS', 'Jungle CS', 'Damage', 'Healing', 'Vision', 'First Tower'];

  public radarChartData = [
    {
      data: [65, 59, 90, 81, 56, 55, 40, 40, 40],
      label: 'Born To Stack',
      radius: 5,
      pointRadius: 5,
      pointHoverRadius: 5
    },
    {
      data: [28, 48, 40, 19, 96, 27, 100, 40, 40],
      label: 'Your League Average',
      radius: 5,
      pointRadius: 5,
      pointHoverRadius: 5,
      fillColor: 'rgba(255, 99, 132,1)'
    }
  ];

  public radarChartColors = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: '#36a2eb',
      pointBackgroundColor: '#36a2eb',
      pointBorderColor: '#fff'
    },
    {
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderColor: '#ff6384',
      pointBackgroundColor: '#ff6384',
      pointBorderColor: '#fff'
    }
  ];

  public radarChartType = 'radar';

  public radarChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true
      }
    },
    scale: {
      pointLabels: {
        fontSize: 17
      },
      ticks: {
        display: false
      }
    }
  };

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
