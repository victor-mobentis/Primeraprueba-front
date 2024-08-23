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
  selector: 'app-grafica-ventas-segmentacion3',
  templateUrl: './grafica-ventas-segmentacion3.component.html',
  styleUrls: ['./grafica-ventas-segmentacion3.component.css']
})
export class GraficaVentasSegmentacion3Component {

  chart: echarts.ECharts | undefined;

  resize() {
    this.chart?.resize();
  }

  pintarGrafica(data: any) {

    let nombres: any = []
    let valores: any = []
    let segmentacion : string = data.segmentacion;

    data.data.forEach((dato: { name: string; value: string; segmentacion: string}) => {
      nombres.push(dato.name);
      valores.push(dato.value);
    })

    var chartDom = document.getElementById('ventas-segmentacion3')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        right: 30,
        bottom: 40
      },
      title: {
        text: "Ventas por " + segmentacion,
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
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: ["Tradicional", "Moderna", "Emblemática"]
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        },
      },
      series: [
        {
          color: '#eeec6d',
          data: [2110, 4100, 2500],
          type: 'bar',
          label: {
            show: true,
            position: 'insideLeft',
            formatter: '{b}'
          },
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
