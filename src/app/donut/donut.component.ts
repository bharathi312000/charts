import { Component, OnInit } from '@angular/core';
import { registerables } from 'chart.js';
import  Chart  from 'chart.js/auto';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {
  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];

  constructor(private service: AuthService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    this.service.cryptoData().then((res: any) => {
      this.result = res;
      // console.log(this.result);
    });

    this.service.cryptoData().then((res: any) => {
      this.result = res;
      this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
      this.coinName = this.result.data.coins.map((coins: any) => coins.name);
      // console.log(this.coinPrice);
      // console.log(this.coinName);
      
    this.chart = new Chart("mydonut", {
      type: 'doughnut',
      data: {
          labels:this.coinName,
          datasets: [{
              label: '# of Votes',
              data: this.coinPrice,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
  // plugins: [ChartDataLabels],
  
      options: {
          // rotation: 1 * Math.PI,
          // circumference: 1 * Math.PI
    responsive: true,
    
  
      }
  });
});
  }

}
