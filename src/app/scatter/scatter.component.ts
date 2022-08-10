import { Component, OnInit } from '@angular/core';
import { registerables } from 'chart.js';
import  Chart  from 'chart.js/auto';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

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



    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: this.coinName,
        backgroundColor: 'rgb(255, 99, 132)'
      }],
    };
    this.chart = new Chart('myscatter', {
      type: 'scatter',
      data: this.coinPrice,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    
    });
  });
  }

}
