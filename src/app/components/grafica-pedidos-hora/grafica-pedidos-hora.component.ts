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
  selector: 'app-grafica-pedidos-hora',
  templateUrl: './grafica-pedidos-hora.component.html',
  styleUrls: ['./grafica-pedidos-hora.component.css']
})
export class GraficaPedidosHoraComponent {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica(data: any) {
    let valores: any = [ '0','0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']

    data.forEach((dato: { name: string; value: string; }) => {
      valores[Number(dato.name)] = dato.value
  
    })
    var chartDom = document.getElementById('pedidos-hora')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        left: 50,
        right: 30,
        bottom: 40
      },
      title: {
        text: 'Pedidos por hora',
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
        data: ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
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
          data: [2, 0, 1, 5, 6, 15, 29, 46, 80, 120, 190, 150, 170, 70, 40, 36, 100, 86, 93, 110, 57, 60, 32, 7],
          type: 'bar',
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
