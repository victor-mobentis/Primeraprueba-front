import { Component, EventEmitter, Input, Output, ElementRef, HostListener, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

export interface Empresa {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'mobentis-empresa-dropdown',
  templateUrl: './empresa-dropdown.component.html',
  styleUrls: ['./empresa-dropdown.component.scss']
})
export class EmpresaDropdownComponent implements OnInit {
  @Input() empresasList?: Empresa[]; // Empresas filtradas desde el componente padre
  empresas: Empresa[] = [];
  @Output() empresasChange = new EventEmitter<Empresa[]>();

  isOpen = false;
  showDropdown = false;
  private storageKey = 'selectedEmpresas';

  constructor(
    private elementRef: ElementRef,
    private configurationService: ConfigurationService,
    private empresasService: EmpresasService,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    this.configurationService.getConfigurationByName('converterEMPRESA_DROPDOWN_ACTIVO').subscribe({
      next: (config) => {
        if (config && config.Valor !== undefined && config.Valor !== null) {
          this.showDropdown = config.Valor === true || config.Valor === 'true' || config.Valor === 'True';
          if (this.showDropdown) {
            this.loadEmpresas();
          }
        } else {
          this.showDropdown = false;
        }
      },
      error: (error) => {
        console.error('Error al cargar la configuración del dropdown:', error);
        this.showDropdown = false;
      }
    });
  }

  loadEmpresas(): void {
    // Si se pasó una lista de empresas filtradas, usarla
    if (this.empresasList && this.empresasList.length > 0) {
      this.empresas = this.empresasList;
      this.empresasChange.emit(this.empresas);
      this.saveSelectionToStorage();
      return;
    }

    // Si no, cargar todas las empresas desde el servicio
    this.empresasService.getEmpresas().subscribe({
      next: (data) => {
        const savedSelection = this.getSelectionFromStorage();
        this.empresas = data.map(empresa => ({
          id: empresa.idEmpresa,
          name: empresa.Nombre,
          selected: savedSelection ? savedSelection.includes(empresa.idEmpresa) : true
        }));

        // Si ninguna empresa queda seleccionada (p.ej. las guardadas ya no existen), seleccionar todas
        if (!this.algunaSeleccionada()) {
          this.empresas.forEach(e => e.selected = true);
        }
        
        this.empresasChange.emit(this.empresas);
        this.saveSelectionToStorage();
      },
      error: (error) => {
        console.error('Error al cargar las empresas:', error);
      }
    });
  }

  private saveSelectionToStorage(): void {
    const selectedIds = this.empresas.filter(e => e.selected).map(e => e.id);
    localStorage.setItem(this.storageKey, JSON.stringify(selectedIds));
  }

  private getSelectionFromStorage(): number[] | null {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : null;
  }

  // Cerrar dropdown al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  toggleEmpresa(empresa: Empresa, event: Event): void {
    event.stopPropagation();
    const seleccionadasCount = this.getSelectedCount();

    if (empresa.selected && seleccionadasCount === 1) {
      this.notificationService.showWarning('Debes seleccionar al menos una empresa.');
      return;
    }
    
    empresa.selected = !empresa.selected;
    this.empresasChange.emit(this.empresas);
    this.saveSelectionToStorage();
  }

  seleccionarTodas(event: Event): void {
    event.stopPropagation();
    this.empresas.forEach(e => e.selected = true);
    this.empresasChange.emit(this.empresas);
    this.saveSelectionToStorage();
  }

  // Obtener etiqueta para el botón
  getLabel(): string {
    const seleccionadas = this.empresas.filter(e => e.selected);
    if (seleccionadas.length === this.empresas.length) {
      return 'Todas las empresas';
    } else if (seleccionadas.length === 1) {
      return seleccionadas[0].name;
    } else if (seleccionadas.length > 1) {
      return `${seleccionadas.length} empresas`;
    } else {
      return 'Ninguna empresa';
    }
  }

  // Verificar si todas están seleccionadas
  todasSeleccionadas(): boolean {
    return this.empresas.every(e => e.selected);
  }

  // Verificar si al menos una está seleccionada
  algunaSeleccionada(): boolean {
    return this.empresas.some(e => e.selected);
  }

  // Obtener el conteo de empresas seleccionadas
  getSelectedCount(): number {
    return this.empresas.filter(e => e.selected).length;
  }
}
