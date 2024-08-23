import { Component } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

@Component({
  selector: 'app-grafica-atencion-cliente',
  templateUrl: './grafica-atencion-cliente.component.html',
  styleUrls: ['./grafica-atencion-cliente.component.scss']
})
export class GraficaAtencionClienteComponent {

  chart: echarts.ECharts | undefined;

  resize(){
    this.chart?.resize();
  }
  
  pintarGrafica() {

    var chartDom = document.getElementById('atencion-cliente')!;
    var myChart = echarts.init(chartDom);
    this.chart = myChart;
    var option: EChartsOption;

    option = {
      // color: [
      //   '#3BB35C',
      //   '#437360',
      //   '#3AB284',
      //   '#44B33B',
      //   '#3B92B3',
      //   '#76B39B',
      // ],
      color: [
        '#38AA7E',
        '#2D8865',
        '#3AB284',
        '#22664C',
        '#164433',
        '#4FEEB1',
      ],
      title: {
        top: 10,
        text: 'Consultas Att. cliente',
        left: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 15
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 40,
      },
      series: [
        {
          top: 70,
          bottom: -50,
          type: 'pie',
          radius: '50%',
          data: [
            { value: 150, name: 'Crédito', },
            { value: 250, name: 'Dónde está' },
            { value: 200, name: 'Compras', },
            { value: 225, name: 'Visita', },
            { value: 400, name: 'Ofertas', },
            { value: 300, name: 'Ultima compra', },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    (opts?: {
      width?: '80%',
      height?: '80%',
      silent?: false,
      animation?: {

      }
    }) => echarts;

    option && myChart.setOption(option);
  }
}
