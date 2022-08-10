import { Component, OnInit } from '@angular/core';
import { registerables } from 'chart.js';
import  Chart  from 'chart.js/auto';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

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




    this.chart = new Chart('myChart', {
      type: 'pie',
      data: {
          labels:this.coinName,
          datasets: [{
              label: 'Number of votes',
              data: this.coinPrice,
              backgroundColor: ['#96ceff', '#424348', '#91ee7c', '#f7a35b', '#8286e9'],
              borderColor: '#fff',
              borderWidth: 1,
              hoverBorderColor: ['#96ceff', '#424348', '#91ee7c', '#f7a35b', '#8286e9'],
              hoverBorderWidth: 8
          }]
      },
      // plugins:[ChartDataLabels],
      options: {
        responsive: false,
      }
   });
 });
}
}
