import { Component, OnInit }                      from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label }                                  from 'ng2-charts';
import { ScheduleService }                        from 'src/app/services/schedule.service';
import { Store }                                  from '@ngrx/store';
import { Message }                                from 'src/app/models/message.model';
import { MessageError }                           from 'src/app/store/actions/message.actions';

@Component({
  selector   : 'app-statistics-marking',
  templateUrl: './statistics-marking.component.html',
  styleUrls  : ['./statistics-marking.component.css']
})
export class StatisticsMarkingComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Ativo', 'Atendido', 'Cancelado', 'Atrasado'];
  public barChartType: ChartType = 'bar';
  public barChartLegend          = false;
  public chartColors             = [
    {
      backgroundColor: ['#36a3f7', '#7bcb4d', '#f4516c', '#F6BB42'],
    },
  ]

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Status' }
  ];

  constructor(
    private scheduleService: ScheduleService,
    private StoreMessage   : Store<Message>
  ) { }

  ngOnInit() {
    this.scheduleService.GetAll().subscribe(list => {

      var data = [0, 0, 0, 0];

      for (let item of list) {

        if (item.data['status'] == 'active')
          item.data['status'] = this.IsLate(item.data['datetimeInitial']) ? 'late' : 'active';

        if (item.data['status'] == 'active')
          data[0] = data[0] + 1;

        if (item.data['status'] == 'attended')
          data[1] = data[1] + 1;

        if (item.data['status'] == 'canceled')
          data[2] = data[2] + 1;

        if (item.data['status'] == 'late')
          data[3] = data[3] + 1;

      }

      this.barChartData[0].data = data;

    }, this._filterErrors.bind(this));
  }

  IsLate(timestamp: number) {
    var unixTimestampNow = Math.floor(Date.now() / 1000);
    return unixTimestampNow > timestamp;
  }

  private _filterErrors(erro: any): void {
    this.StoreMessage.dispatch(new MessageError(new Message("Erro!", "Erro ao tentar carregar os registros")));
  }

}