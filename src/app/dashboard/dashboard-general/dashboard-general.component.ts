import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterService } from 'src/app/services/filter/filter.service';
import { MatPaginator } from '@angular/material/paginator';

import { GraficaClientesComponent } from 'src/app/components/grafica-clientes/grafica-clientes.component';
import { GraficaPedidosDiaComponent } from 'src/app/components/grafica-pedidos-dia/grafica-pedidos-dia.component';
import { GraficaPedidosComponent } from 'src/app/components/grafica-pedidos/grafica-pedidos.component';
import { GraficaPedidosHoraComponent } from 'src/app/components/grafica-pedidos-hora/grafica-pedidos-hora.component';
import { GraficaPedidosFamiliasProductosComponent } from 'src/app/components/grafica-pedidos-familias-productos/grafica-pedidos-familias-productos.component';
import { GraficaPedidosMesComponent } from 'src/app/components/grafica-pedidos-mes/grafica-pedidos-mes.component';
import { GraficaVentasDiaComponent } from 'src/app/components/grafica-ventas-dia/grafica-ventas-dia.component';
import { GraficaVentasFamiliasProductosComponent } from 'src/app/components/grafica-ventas-familias-productos/grafica-ventas-familias-productos.component';
import { GraficaVentasHoraComponent } from 'src/app/components/grafica-ventas-hora/grafica-ventas-hora.component';
import { GraficaVentasMesComponent } from 'src/app/components/grafica-ventas-mes/grafica-ventas-mes.component';
import { GraficaAtencionClienteComponent } from 'src/app/components/grafica-atencion-cliente/grafica-atencion-cliente.component';
import { GraficaPedidosSegmentacion1Component } from 'src/app/components/grafica-pedidos-segmentacion1/grafica-pedidos-segmentacion1.component';
import { GraficaPedidosSegmentacion2Component } from 'src/app/components/grafica-pedidos-segmentacion2/grafica-pedidos-segmentacion2.component';
import { GraficaPedidosSegmentacion3Component } from 'src/app/components/grafica-pedidos-segmentacion3/grafica-pedidos-segmentacion3.component';
import { GraficaVentasSegmentacion1Component } from 'src/app/components/grafica-ventas-segmentacion1/grafica-ventas-segmentacion1.component';
import { GraficaVentasSegmentacion2Component } from 'src/app/components/grafica-ventas-segmentacion2/grafica-ventas-segmentacion2.component';
import { GraficaVentasSegmentacion3Component } from 'src/app/components/grafica-ventas-segmentacion3/grafica-ventas-segmentacion3.component';
import { GraficaProductosTopComponent } from 'src/app/components/grafica-productos-top/grafica-productos-top.component';
import { GraficaVentasTopComponent } from 'src/app/components/grafica-ventas-top/grafica-ventas-top.component';

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.scss']
})
export class DashboardGeneralComponent {
  filtro: any;

  constructor(

    private _filterServices: FilterService,
    private fb: FormBuilder,
    private graficaClientes: GraficaClientesComponent,
    private graficaPedidos: GraficaPedidosComponent,
    private graficaAtencionCliente: GraficaAtencionClienteComponent,

    private graficaPedidosDia: GraficaPedidosDiaComponent,
    private graficaPedidosHora: GraficaPedidosHoraComponent,
    private graficaPedidosSegmentacion1: GraficaPedidosSegmentacion1Component,
    private graficaPedidosSegmentacion2: GraficaPedidosSegmentacion2Component,
    private graficaPedidosSegmentacion3: GraficaPedidosSegmentacion3Component,
    private graficaPedidosFamiliasProductos: GraficaPedidosFamiliasProductosComponent,
    private graficaPedidosMes: GraficaPedidosMesComponent,
    private graficaTopProductos: GraficaProductosTopComponent,

    private graficaVentasSegmentacion1: GraficaVentasSegmentacion1Component,
    private graficaVentasSegmentacion2: GraficaVentasSegmentacion2Component,
    private graficaVentasSegmentacion3: GraficaVentasSegmentacion3Component,
    private graficaVentasDia: GraficaVentasDiaComponent,
    private graficaVentasFamiliasProductos: GraficaVentasFamiliasProductosComponent,
    private graficaVentasHora: GraficaVentasHoraComponent,
    private graficaVentasMes: GraficaVentasMesComponent,
    private graficaTopProductosVentas: GraficaVentasTopComponent,
  ) {
    this.filtro = this.fb.group({
      cliente: [],
      provinciaFilterControl: [],
      segmentacion1FilterControl: [],
      segmentacion2FilterControl: [],
      segmentacion3FilterControl: [],
      poblacionFilterControl: [],
      agenteFilterControl: [],
      familiaFilterControl: [],
    });
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  isPedidosActive: boolean = true;
  isFiltroActive: boolean = false;
  cargandoDatostabla: boolean = true;
  tablaActiva: number = 0;
  nombresTablas: string[] = [
    'Segmentacion 1',
    'Segmentacion 2',
    'Segmetnacion 3',
    'Clientes',
    'Provincias',
    'Poblaciones',
    'Familias',
    'Vendedores',
  ];
  columnasTablaGrande: string[] = [
    'nombre',
    'pedidos',
    'ventas',
    'atencion_cliente',
  ];
  columnasTablaPeque: string[] = ['nombre', 'pedidos', 'ventas'];


  //Filtros
  familiaList: string[] = [];

  poblacionList: string[] = [];
  provinciaList: string[] = [];


  // KPI
  totalClientes: number = 0;
  attCliente: number = 0;
  totalPedidos: number = 0;
  pedidosDia: number = 0;
  ventasDia: number = 0;
  totalVentas: number = 0;



  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.cargarFiltros();
  }

  ngAfterViewInit() {
    this.cargarGraficos();

  }



  cargarGraficos() {
    // Carga KPI

        this.totalClientes = 1;
        this.attCliente = 2;
        this.totalPedidos = 3;
        this.pedidosDia = 4;
        this.ventasDia = Math.floor(5);
        this.totalVentas = Math.floor(6);


    // Carga Grafica Clientes

        this.graficaClientes.pintarGrafica();


    // Carga Grafica PEDIDOS

        this.graficaPedidos.pintarGrafica();


    // Carga grafica AttCliente

        this.graficaAtencionCliente.pintarGrafica();


    this.cargarGraficosFiltrados()

  }

  cargarGraficosFiltrados() {
    /* let fechaHoy = new Date();
    let fechaFin = fechaHoy.getFullYear() + "-" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate();
    let fechaInicio = (fechaHoy.getFullYear() - 1) + "-" + (fechaHoy.getMonth() + 1) + "-" + fechaHoy.getDate();

    if (this.range.value.end) {
      fechaFin = this.range.value.end.getFullYear() + "-" + (this.range.value.end.getMonth() + 1) + "-" + this.range.value.end.getDate();
    }
    if (this.range.value.start) {
      fechaInicio = this.range.value.start.getFullYear() + "-" + (this.range.value.start.getMonth() + 1) + "-" + this.range.value.start.getDate();
    }

    // Carga Segmentacion 1
 
        this.graficaPedidosSegmentacion1.pintarGrafica();


    // Carga Segmentacion 2

        this.graficaPedidosSegmentacion2.pintarGrafica();


    // Carga Segmentacion 3

        this.graficaPedidosSegmentacion3.pintarGrafica();


    // Carga grafica FAMILIAS

        this.graficaPedidosFamiliasProductos.pintarGrafica();


    // Carga Segmentacion 1 VENTAS

        this.graficaVentasSegmentacion1.pintarGrafica();


    // Carga Segmentacion 2 VENTAS

        this.graficaVentasSegmentacion2.pintarGrafica();


    // Carga Segmentacion 3 VENTAS

        this.graficaVentasSegmentacion3.pintarGrafica();


    // Carga grafica FAMILIAS ventas

        this.graficaVentasFamiliasProductos.pintarGrafica()


    // Carga grafica pedidos mes 

        this.graficaPedidosMes.pintarGrafica()


    // Carga grafica pedidos mes ventas

        this.graficaVentasMes.pintarGrafica()


    // Carga grafica pedidos dia 

        this.graficaPedidosDia.pintarGrafica()


    // Carga grafica pedidos dia ventas

        this.graficaVentasDia.pintarGrafica()


    // Carga grafica pedidos hora

        this.graficaPedidosHora.pintarGrafica()


    // Carga grafica pedidos hora ventas

        this.graficaVentasHora.pintarGrafica()


     // Carga grafica top pedidos
     this._dashboardServices.getTopProductos(fechaInicio, fechaFin, this.filtro).subscribe(
      (data) => {
        this.graficaTopProductos.pintarGrafica(data)
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );

    // Carga grafica pedidos hora ventas
    this._dashboardServices.getTopProductosVentas(fechaInicio, fechaFin, this.filtro).subscribe(
      (data) => {
        this.graficaTopProductosVentas.pintarGrafica(data)
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    ); */
  }


  cargarFiltros() {
    /* this._filterServices.getPoblaciones().subscribe(
      (data) => {
        data.forEach((p) => this.poblacionList.push(p.name));
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );
    // Carga filtro provincia
    this._filterServices.getProvincias().subscribe(
      (data) => {
        data.forEach((p) => this.provinciaList.push(p.name));
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );
    // Carga filtro Familias
    this._filterServices.getFamilias().subscribe(
      (data) => {
        data.forEach((f) => this.familiaList.push(f.family));
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );

    // Carga filtro vendedores
    this._filterServices.getAgentes().subscribe(
      (data) => {
        this.agenteList = data;
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );
    // Carga filtro segmentacion 1
    this._filterServices.getSegmentacion1().subscribe(
      (data) => {
        this.s1 = data;
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );
    // Carga filtro segmentacion 2
    this._filterServices.getSegmentacion2().subscribe(
      (data) => {
        this.s2 = data;
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    );
    // Carga filtro segmentacion 3
    this._filterServices.getSegmentacion3().subscribe(
      (data) => {
        this.s3 = data;
      },
      (error) => {
        console.error('Error al asignar el dataSource:', error);
      }
    ); */
  }

  applyFilter() {
    this.cargarGraficosFiltrados()
    this.toggleFiltro()
  }

  resetFilter() {
    console.log('resetear')
    this.range.reset();
    this.filtro.reset();
    this.cargarGraficosFiltrados()
    this.toggleFiltro();

  }

  //!!!!!! mirar a ver si esto se puede hacer mejor que con un timeout
  togglePedidosSales() {
    this.isPedidosActive = !this.isPedidosActive; 
    setTimeout(() => {
      this.resizeGraficas();
    }, 1);
  }

  toggleFiltro() {
    this.isFiltroActive = !this.isFiltroActive;
  }

  onResize(){
    this.resizeGraficas();
  }

  resizeGraficas(){
    this.graficaClientes.resize();
    this.graficaPedidos.resize();
    this.graficaAtencionCliente.resize();
    this.graficaPedidosDia.resize();
    this.graficaPedidosHora.resize();
    this.graficaPedidosSegmentacion1.resize();
    this.graficaPedidosSegmentacion2.resize();
    this.graficaPedidosSegmentacion3.resize();
    this.graficaPedidosFamiliasProductos.resize();
    this.graficaPedidosMes.resize();
    this.graficaVentasSegmentacion1.resize();
    this.graficaVentasSegmentacion2.resize();
    this.graficaVentasSegmentacion3.resize();
    this.graficaVentasDia.resize();
    this.graficaVentasFamiliasProductos.resize();
    this.graficaVentasMes.resize();
    this.graficaVentasHora.resize();
    this.graficaTopProductos.resize();
     this.graficaTopProductosVentas.resize();
  }
}