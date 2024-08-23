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
  selector: 'app-grafica-ventas-segmentacion2',
  templateUrl: './grafica-ventas-segmentacion2.component.html',
  styleUrls: ['./grafica-ventas-segmentacion2.component.css']
})
export class GraficaVentasSegmentacion2Component {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica() {
    
    let nombres: any = []
    let valores: any = []
    


    var chartDom = document.getElementById('ventas-segmentacion2')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        bottom: 40
      },
      title: {
        text: "Ventas por " ,
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
        data: ["Tienda Alimentacion Minorista", "Personl Empresa", "OCIO", "Mayoristas", "Bar/Tapas"],
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
          data: [3034.39, 1511.6, 1298.39, 303.42, 1971.02],
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
