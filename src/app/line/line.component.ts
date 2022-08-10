import { Component, OnInit } from '@angular/core';
import { registerables } from 'chart.js';
import  Chart  from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];

  constructor(private service: AuthService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {

    this.service.cryptoData().then((res) => {
      this.result = res;
      // console.log(this.result);
    });

    this.service.cryptoData().then((res) => {
      this.result = res;
      this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
      this.coinName = this.result.data.coins.map((coins: any) => coins.name);
      // console.log(this.coinPrice);
      // console.log(this.coinName);


    this.chart = new Chart('myline', {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.coinName,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.coinPrice
        }]
      },
      // plugins : [ChartDataLabels],
      // Configuration options go here

      options: {
        responsive: true,
        scales:{
          y:{
            beginAtZero: true,
            title:{
              display:true,
              text:"number of price",
            }
          },
          x:{
            beginAtZero: true,
            title:{
              display:true,
              text:"coins",
            }
          }
        }

      }
    });
  });
  }

}
