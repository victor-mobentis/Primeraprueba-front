import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
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
  selector: 'app-grafica-semi-circulo',
  templateUrl: './grafica-semi-circulo.component.html',
  styleUrls: ['./grafica-semi-circulo.component.css']
})
export class GraficaSemiCirculoComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() titulo: string = '';
  @Input() valores: { value: number; name: string }[] = []; 
  @Input() elementoId: string = ''; 

  chart: echarts.ECharts | undefined;

  ngAfterViewInit() {
    this.pintarGrafica();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valores']) {
      this.actualizarGrafica();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeChart();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeChart);
  }

  resizeChart() {
    if (this.chart) {
      this.chart.resize(); 
    }
  }

  pintarGrafica() {
    const chartDom = document.getElementById(this.elementoId)!;
    this.chart = echarts.init(chartDom);

    const option: EChartsOption = {
      color: [
        '#FADADD', 
        '#F7A1C4', 
        '#FBD3E0', 
        '#EBA0B3', 
        '#F3A6C9', 
        '#F9CFE0'
      ],
      title: {
        top: 10,
        text: this.titulo,
        left: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 15,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: 40,
      },
      series: [
        {
          bottom: -50,
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          startAngle: 180,
          endAngle: 360,
          data: this.valores,
        },
      ],
    };

    this.chart.setOption(option);
  }

  actualizarGrafica() {
    if (this.chart) {
      this.chart.setOption({
        series: [{ data: this.valores }],
      });
    }
  }
}