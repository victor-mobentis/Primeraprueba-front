import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MultiSelectFilterComponent } from '../multi-select-filter/multi-select-filter.component';
import { FilterService } from 'src/app/services/filter/filter.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';
import { RangeFilterComponent } from '../range-filter/range-filter.component';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.css']
})
export class FilterContainerComponent implements OnInit {
  @Input() componentId?: string;
  @Output() filtersChanged = new EventEmitter<{ [key: string]: any }>();

  filters: any[] = [];
  selectedFilters: { [key: string]: any } = {}; 
  filtrosAplicados: { id: string; nombre: string; valor: any; tipo: string }[] = []; 

  @ViewChildren(MultiSelectFilterComponent) multiSelectComponents?: QueryList<MultiSelectFilterComponent>;
  @ViewChildren(SearchFilterComponent) searchComponents?: QueryList<SearchFilterComponent>; 
  @ViewChildren(DateFilterComponent) dateComponents?: QueryList<DateFilterComponent>;
  @ViewChildren(RangeFilterComponent) rangeComponents?: QueryList<RangeFilterComponent>;

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService.getFiltersForComponent(this.componentId).subscribe(
      (response) => {
        this.filters = response;
      },
      (error) => {
        console.error('Error al cargar los filtros:', error);
      }
    );
  }

  handleFilterChange(filterId: string, value: any) {
    this.selectedFilters[filterId] = value;

    const existingFilter = this.filtrosAplicados.find(filtro => filtro.id === filterId);
    const filterInfo = this.filters.find(filter => filter.id === filterId);

    if (existingFilter) {
      existingFilter.valor = value;
    } else if (filterInfo) {
      this.filtrosAplicados.push({ id: filterId, nombre: filterInfo.title, valor: value , tipo:filterInfo.type});
    }
    this.filtersChanged.emit(this.filtrosAplicados);
  }

  // Eliminar un filtro aplicado
  removeFilter(filtroToRemove: any) {
    delete this.selectedFilters[filtroToRemove.id];
    this.filtrosAplicados = this.filtrosAplicados.filter(filtro => filtro.id !== filtroToRemove.id);
    this.filtersChanged.emit(this.selectedFilters);

    // Llamar a reset en el componente hijo si es un multi-select
    this.resetChildFilter(filtroToRemove.id);
  }

  filtroReset() {
    this.selectedFilters = {};
    this.filtrosAplicados = [];
    this.filtersChanged.emit(this.selectedFilters);

    this.multiSelectComponents?.forEach(component => component.reset());
    this.dateComponents?.forEach(component => component.reset());
    this.searchComponents?.forEach(component => component.reset());
    this.rangeComponents?.forEach(component => component.reset());
  }

  // Llamar a reset en el componente hijo específico
  resetChildFilter(filterId: string) {
    const childComponent = this.multiSelectComponents?.find(comp => comp.id === filterId);
    if (childComponent) {
      childComponent.reset();
    }
  }

  getMultiSelectDisplay(value: any[]): string {
    if (value && value.length) {
      return value.map(item => item.name).join(', ');
    }
    return 'Vacío';
  }
}
