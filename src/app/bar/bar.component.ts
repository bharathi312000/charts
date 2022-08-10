import { Component, OnInit } from '@angular/core';
import { registerables } from 'chart.js';
import  Chart  from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AuthService } from '../auth.service';
// import UserdataJson from '../../assets/userdata.json' 

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];
  start:any;
  end:any;
  value:any;
  filterdate:any
  fullScreen:any
  

  constructor(private service: AuthService) {
    Chart.register(...registerables);
    // console.log(dummy);
  }
  
  

  ngOnInit(): void {

   

    this.service.cryptoData().then((res) => {
  

      const dates = ["26/08/2021","27/08/2021","28/08/2021","29/08/2021","30/08/2021"]
      const datapoints = ["20","18","10","16","7","12","10"]

    // const dates = [    
    //   { "Name": "A",    
    //       "Salary": "21"    
    //   },    
    //   { "Name": "B",    
    //       "Salary": "6"    
    //   },    
    //   { "Name": "C",    
    //       "Salary": "17"    
    //   },    
    //   { "Name": "D",    
    //       "Salary": "12k"    
    //   },    
    //   { "Name": "E",    
    //       "Salary": "15"    
    //   },    
    //   { "Name": "F",    
    //       "Salary": "18"    
    //   } ,   
    //   { "Name": "G",    
    //       "Salary": "14"    
    //   } ,   
    //   { "Name": "H",    
    //       "Salary": "19"    
    //   }  ,  
    //   { "Name": "I",    
    //       "Salary": "11"    
    //   }    
    //  ] ;   
     

      this.chart = new Chart("barchart",{
       
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: '# of degree',
            data: datapoints,
            backgroundColor: [
              //   'rgba(255, 99, 132, 0.2)',
              //   'rgba(54, 162, 235, 0.2)',
              //   'rgba(255, 206, 86, 0.2)',
              //   'rgba(75, 192, 192, 0.2)',
              //   'rgba(153, 102, 255, 0.2)',
              //   'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            

          }]
        },
        plugins: [ChartDataLabels],

        options: {
          responsive: true,
          maintainAspectRatio:true,

          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number Of *",
              },
            },
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Date",
              },
            }

          },


        }
      
      });
     

      //render init block
      // const myChart = new Chart(
      //   document.getElementById('barchart'),
      //   config
      // );


     
       // display fullscreen 
       function fullScreen(){
        const chartBox = document.body.querySelector('.chartBox1') 
        chartBox?.classList.toggle('fullScreen');
        console.log(chartBox)
        // const fullscreenBtn = querySelector('.chartBox1');
        // fullScreen.addEventListener('click', fullscreenBtn);
      }
      fullScreen()


      
      
    });

  }
   //datefilter
   filterDate(dateVal:any) {
    const dates2=[...dateVal];
    console.log("dates = ",dates2);

   const start=(<HTMLInputElement>document.getElementById('startdate')).value;
   const end= (<HTMLInputElement>document.getElementById('enddate')).value;

  // get the index number in array
  const indexstartdate = dates2.indexOf(start);
  const indexenddate = dates2.indexOf(end);

  // var inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
  

  //slice the array only showing the select section slice

  const filterDate = dates2.slice(indexstartdate,indexenddate + 1)



  // const filterData = convertedDates.filter((dates: number) => dates >= indexstartdate && dates <= indexenddate)

  this.chart.config.data.labels = filterDate;
  
  // console.log(filterDate,"karthi");
  // Chart.update()
  }
  // console.log(filterDate(),"karthi");

  

 

 
  // click(){
  //   this.service.cryptoData();
  //   console.log(this.service.cryptoData,"karthi")
  // }

}
