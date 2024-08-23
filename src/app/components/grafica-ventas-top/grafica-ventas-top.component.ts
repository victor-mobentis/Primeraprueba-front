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
  selector: 'app-grafica-ventas-top',
  templateUrl: './grafica-ventas-top.component.html',
  styleUrls: ['./grafica-ventas-top.component.css']
})
export class GraficaVentasTopComponent {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica(data: any) {

    let nombres: any = []
    let valores: any = []

    data.forEach((dato: { name: string; value: string}) => {
      nombres.push(dato.name);
      valores.push(dato.value);
    })

    var chartDom = document.getElementById('ventas-top')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      grid: {
        bottom: 40
      },
      title: {
        text: "Top de ventas",
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
        data: ['Aceite de oliva Arbequina', 'Miel de azahar', 'Lentejas Las Charras', 'Loctite 243', 'Bombones La Despensa de Palacio', 'Leche Pascual Semidesnatada', 'Mermelada plátano Román', 'Barbacoa', 'Pattex 120', 'Naturfresh Italiana']
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
          data: [2000, 1200, 4550, 3200, 2000, 2000, 2000, 2000, 2000, 2000],
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
