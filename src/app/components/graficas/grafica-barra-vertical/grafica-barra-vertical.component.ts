import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;

@Component({
  selector: 'app-grafica-barra-vertical',
  templateUrl: './grafica-barra-vertical.component.html',
  styleUrls: ['./grafica-barra-vertical.component.css'],
})
export class GraficaBarraVerticalComponent implements OnChanges, AfterViewInit, OnDestroy {
  
  @Input() titulo: string = ''; 
  @Input() categorias: string[] = []; 
  @Input() valores: number[] = []; 
  @Input() elementoId: string = ''; 

  chart: echarts.ECharts | undefined;

  ngAfterViewInit() {
    this.pintarGrafica();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valores'] || changes['categorias']) {
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
    const chartDom = document.getElementById(this.elementoId);
    if (chartDom) {
      this.chart = echarts.init(chartDom);

      const option: EChartsOption = {
        grid: {
          bottom: 40,
          left: 50,
        },
        title: {
          text: this.titulo,
          top: 10,
          left: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 15,
          },
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: this.categorias,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dotted',
            },
          },
        },
        series: [
          {
            color: '#87CEFA',
            data: this.valores,
            type: 'bar',
          },
        ],
      };

      this.chart.setOption(option);
    } else {
      console.error(`El elemento con ID ${this.elementoId} no se encontró en el DOM.`);
    }
  }

  actualizarGrafica() {
    if (this.chart) {
      this.chart.setOption({
        xAxis: { data: this.categorias },
        series: [{ data: this.valores }],
      });
    }
  }
}