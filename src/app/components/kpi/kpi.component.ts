import { Component, AfterViewInit, ElementRef, ViewChild, SimpleChanges, Input } from '@angular/core';
import { RejectionKPIs } from 'src/app/models/RejectionKPI.model';
import { RechazadosService } from 'src/app/services/rechazados/rechazados.service';
import { TranslationService } from 'src/app/i18n/translation.service';

@Component({
  selector: 'mobentis-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KPIComponent implements AfterViewInit {
  @ViewChild('graficasIzquierda') graficasIzquierda!: ElementRef;
  @ViewChild('graficasDerecha') graficasDerecha!: ElementRef;
  kpiData: RejectionKPIs = {
    totalRejections: 0,
    rejectionByReason: [],
    pendingRejections: 0,
    opportunityRejections: 0,
    totalGroupedConversions: 0,
    conversionsByStatus: []
  };
  
  @Input() selectedFilters!: { [key: string]: any };
  @Input() searchTerm!: string;
  @Input() empresasList: any[] = []; // Lista de empresas del dropdown

constructor(
    private rejectionService: RechazadosService,
    private translationService: TranslationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando los filtros, el término de búsqueda o las empresas cambian, actualiza los KPIs
    if (changes['selectedFilters'] || changes['searchTerm'] || changes['empresasList']) {
      this.loadKPIs();
    }
  }

  loadKPIs(){
    // Determinar selectedEmpresa basado en las empresas seleccionadas en el dropdown
    let selectedEmpresa: number | 'all' = 'all';
    const empresasSeleccionadas = this.empresasList.filter((e: any) => e.selected);
    
    if (empresasSeleccionadas.length === 1) {
      selectedEmpresa = empresasSeleccionadas[0].id;
    } else if (empresasSeleccionadas.length > 1 || empresasSeleccionadas.length === 0) {
      selectedEmpresa = 'all';
    }
    
    this.rejectionService
          .getKPIs(
            this.selectedFilters,
            this.searchTerm,
            selectedEmpresa
          )
          .subscribe((data: any) => {
            console.log('KPIS cargados:', data);
            
            // Traducir los motivos de rechazo
            if (data.rejectionByReason) {
              data.rejectionByReason = data.rejectionByReason.map((item: any) => ({
                ...item,
                reason: this.translateDynamicValue('rejection.reason', item.reason)
              }));
            }
            
            // Traducir los estados de conversión
            if (data.conversionsByStatus) {
              data.conversionsByStatus = data.conversionsByStatus.map((item: any) => ({
                ...item,
                status: this.translateDynamicValue('conversion.status', item.status)
              }));
            }
            
            this.kpiData = data;
          });
  }
  
  // Método auxiliar para traducir valores dinámicos
  private translateDynamicValue(prefix: string, value: string): string {
    if (!value) return value;
    const key = `${prefix}.${value}`;
    const translated = this.translationService.t(key);
    // Si no hay traducción, devolver el valor original
    return translated === key ? value : translated;
  }
  
  ngOnInit(){
    this.loadKPIs();
  }

  ngAfterViewInit(): void {
    this.enableHorizontalScroll(this.graficasIzquierda.nativeElement);
    this.enableHorizontalScroll(this.graficasDerecha.nativeElement);
  }

  private enableHorizontalScroll(element: HTMLElement): void {
    // Scroll con la rueda del ratón
    element.addEventListener('wheel', (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        event.preventDefault(); // Evita el scroll vertical
        element.scrollLeft += event.deltaY; // Scroll horizontal
      }
    });

    // Scroll arrastrando con el ratón
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    element.addEventListener('mousedown', (event: MouseEvent) => {
      isMouseDown = true;
      startX = event.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      element.style.cursor = 'grabbing'; // Cambia el cursor al arrastrar
    });

    element.addEventListener('mouseleave', () => {
      isMouseDown = false;
      element.style.cursor = 'default';
    });

    element.addEventListener('mouseup', () => {
      isMouseDown = false;
      element.style.cursor = 'default';
    });

    element.addEventListener('mousemove', (event: MouseEvent) => {
      if (!isMouseDown) return;
      event.preventDefault();
      const x = event.pageX - element.offsetLeft;
      const walk = x - startX; // Distancia del desplazamiento
      element.scrollLeft = scrollLeft - walk;
    });
  }
}