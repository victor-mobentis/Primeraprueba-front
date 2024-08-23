import { Component } from '@angular/core';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

@Component({
  selector: 'app-grafica-pedidos-dia',
  templateUrl: './grafica-pedidos-dia.component.html',
  styleUrls: ['./grafica-pedidos-dia.component.css']
})
export class GraficaPedidosDiaComponent {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica(data: any) {
    let valores: any = ['0', '0', '0', '0', '0', '0', '0'];

    data.forEach((dato: { name: string; value: string }) => {
      switch (dato.name) {
        case 'Lunes':
          valores[0] = dato.value;
          break;
        case 'Martes':
          valores[1] = dato.value;
          break;
        case 'Miércoles':
          valores[2] = dato.value;
          break;
        case 'Jueves':
          valores[3] = dato.value;
          break;
        case 'Viernes':
          valores[4] = dato.value;
          break;
        case 'Sábado':
          valores[5] = dato.value;
          break;
        case 'Domingo':
          valores[6] = dato.value;
          break;
      }
    });
    var chartDom = document.getElementById('pedidos-dia')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        bottom: 40
      },
      title: {
        text: 'Pedidos por día de la semana',
        top: 10,
        left: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 15
        }
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        },
      },
      series: [
        {
          color: '#3ab284',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }

      ]
    };

    option && myChart.setOption(option);
  }
}
