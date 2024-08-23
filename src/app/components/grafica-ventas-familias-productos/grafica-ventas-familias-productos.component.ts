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
  selector: 'app-grafica-ventas-familias-productos',
  templateUrl: './grafica-ventas-familias-productos.component.html',
  styleUrls: ['./grafica-ventas-familias-productos.component.scss']
})
export class GraficaVentasFamiliasProductosComponent {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica(data: any) {
    
    let nombres: any = []
    let valores: any = []

    data.forEach((dato: { name: string; value: string; }) => {
      nombres.push(dato.name);
      valores.push(dato.value);
    })

    var chartDom = document.getElementById('ventas-familias-productos')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        bottom: 40
      },
      title: {
        text: 'Ventas por familias de productos',
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
        data: ['Conservas', 'Verduras', 'Congelados', 'Vinos', 'Carnes', 'Frutas']
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
          data: [120, 200, 150, 80, 70, 110],
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
