import { Component, Input, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AggregationQuery } from '../../../../../models/gateway-queries';
import { fetcher, game } from '../../../../../models/protos/bundle';
import { GatewayService } from '../../../../../services/gateway.service';

import AggregatedStatistics = fetcher.rds.AggregatedStatistics;
import Participant = game.leagueoflegends.Participant;

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css'],
})
export class RadarChartComponent implements OnInit {

  @Input() victory: boolean;
  @Input() participant: Participant;
  private radarChartData;

  private radarChartColors = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: '#36a2eb',
      pointBackgroundColor: '#36a2eb',
      pointBorderColor: '#fff',
    },
    {
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderColor: '#ff6384',
      pointBackgroundColor: '#ff6384',
      pointBorderColor: '#fff',
    },
  ];

  private radarChartType = 'radar';

  private radarChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    scale: {
      pointLabels: {
        fontSize: 17,
      },
      ticks: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  private radarChartLabels = ['Kills', 'Deaths', 'Assists', 'CS', 'Jungle CS', 'Damage', 'Healing', 'Vision', 'First Tower'];
  private chartReady = false;

  constructor(private gatewayService: GatewayService,
              private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    const query: AggregationQuery = {
      league: this.participant.summoner.league.toString(),
      championID: this.participant.champion.id,
      summonerID: this.participant.summoner.id,
      region: this.participant.summoner.region.toString(),
    };
    this.gatewayService.getAverageStatistics(query).subscribe(
      (aggregatedStatistics) => this.setRadarChartData(aggregatedStatistics),
      (error) => this.snackBar.open('[ERROR] Cannot retrieve aggregated stats of ' + this.participant.summoner.name + '.', 'Ok'),
    );
  }

  private normalizeStat(stat: number, aggregatedStat: number) {
    return (stat / aggregatedStat) * 100; // TODO: warning if aggregated stat is 0
  }

  private setRadarChartData(aggregatedStats: AggregatedStatistics) {
    this.radarChartData = [
      {
        data: [
          this.normalizeStat(this.participant.statistics.kills, aggregatedStats.stats.kills),
          this.normalizeStat(this.participant.statistics.deaths, aggregatedStats.stats.deaths),
          this.normalizeStat(this.participant.statistics.assists, aggregatedStats.stats.assists),
          this.normalizeStat(this.participant.statistics.minionsKilled, aggregatedStats.stats.minionsKilled),
          this.normalizeStat(this.participant.statistics.neutralMinionsKilled, aggregatedStats.stats.neutralMinionsKilled),
          this.normalizeStat(this.participant.statistics.totalDamages.toChampions, aggregatedStats.stats.totalDamages.toChampions),
          this.normalizeStat(this.participant.statistics.totalHeal, aggregatedStats.stats.totalHeal),
          this.normalizeStat(this.participant.statistics.wardsPlaced, aggregatedStats.stats.wardsPlaced),
          100, // TODO(ArchangelX360): wait for addition timestamp of first tower taken
        ],
        label: this.participant.summoner.name,
        radius: 5,
        pointRadius: 5,
        pointHoverRadius: 5,
      },
      {
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
        label: this.participant.summoner.league,
        radius: 5,
        pointRadius: 5,
        pointHoverRadius: 5,
        fillColor: 'rgba(255, 99, 132,1)',
      },
    ];
    this.chartReady = true;
  }

}
