import { Component, Input, OnInit } from '@angular/core';
import { game } from '../../../../models/protos/bundle';
import Participant = game.leagueoflegends.Participant;
import PlayerStatistics = game.leagueoflegends.PlayerStatistics;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  @Input() participant: Participant;
  private radarChartData;

  private radarChartColors = [
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

  private radarChartType = 'radar';

  private radarChartOptions = {
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
    },
    tooltips: {
      enabled: false
    }
  };

  private radarChartLabels = ['Kills', 'Deaths', 'Assists', 'CS', 'Jungle CS', 'Damage', 'Healing', 'Vision', 'First Tower'];

  constructor() { }

  ngOnInit() {
    // FIXME: normalize data on 0 to 100 scale
    this.radarChartData = [
      {
        data: [
          this.participant.statistics.kills,
          this.participant.statistics.deaths,
          this.participant.statistics.assists,
          this.participant.statistics.minionsKilled,
          this.participant.statistics.neutralMinionsKilled,
          this.participant.statistics.totalDamages,
          this.participant.statistics.totalHeal,
          this.participant.statistics.wardsPlaced,
          80, // TODO(ArchangelX360): wait for addition timestamp of first tower taken
        ],
        label: this.participant.summoner.name,
        radius: 5,
        pointRadius: 5,
        pointHoverRadius: 5
      },
      {
        data: [28, 48, 40, 19, 96, 27, 100, 40, 80], // TODO(ArchangelX360): fill with aggregated data
        label: this.participant.summoner.league,
        radius: 5,
        pointRadius: 5,
        pointHoverRadius: 5,
        fillColor: 'rgba(255, 99, 132,1)'
      }
    ];
  }

}
