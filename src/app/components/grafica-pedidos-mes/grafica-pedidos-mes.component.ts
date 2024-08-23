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
  selector: 'app-grafica-pedidos-mes',
  templateUrl: './grafica-pedidos-mes.component.html',
  styleUrls: ['./grafica-pedidos-mes.component.scss']
})
export class GraficaPedidosMesComponent {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica(data: any) {
    let valores: any = ['30','10','20','50','60','40','10','20','30','45','70','90']

    data.forEach((dato: { name: string; value: string; }) => {
      valores[Number(dato.name)-1] = dato.value;
    })

    var chartDom = document.getElementById('pedidos-mes')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        bottom: 40
      },
      title: {
        text: 'Pedidos por mes',
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
        data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
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
          data: [0, 0, 0, 0, 120, 300, 580,],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
