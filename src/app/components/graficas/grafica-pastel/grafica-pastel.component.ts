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
  LegendComponentOption,
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
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;
@Component({
  selector: 'app-grafica-pastel',
  templateUrl: './grafica-pastel.component.html',
  styleUrls: ['./grafica-pastel.component.css'],
})
export class GraficaPastelComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() titulo: string = '';
  @Input() datos: { value: number; name: string }[] = []; 
  @Input() elementoId: string = '';

  chart: echarts.ECharts | undefined;

  ngAfterViewInit() {
    this.pintarGrafica();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos']) {
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
      color: ['#87CEFA', '#dbdbdb'],
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
        orient: 'horizontal',
        top: 40,
      },
      series: [
        {
          bottom: -50,
          type: 'pie',
          radius: '50%',
          data: this.datos,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    this.chart.setOption(option);
  }

  actualizarGrafica() {
    if (this.chart) {
      this.chart.setOption({
        series: [{ data: this.datos }],
      });
    }
  }
}
