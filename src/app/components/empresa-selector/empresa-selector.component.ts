import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Empresa {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-empresa-selector',
  templateUrl: './empresa-selector.component.html',
  styleUrls: ['./empresa-selector.component.scss']
})
export class EmpresaSelectorComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(
    public dialogo: MatDialogRef<EmpresaSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empresas: Empresa[] }
  ) { }

  ngOnInit() {
    // Clonar las empresas para no modificar el original hasta confirmar
    this.empresas = this.data.empresas.map(e => ({ ...e }));
  }

  toggleEmpresa(empresa: Empresa): void {
    empresa.selected = !empresa.selected;
  }

  seleccionarTodas(): void {
    this.empresas.forEach(e => e.selected = true);
  }

  aplicar(): void {
    this.dialogo.close(this.empresas);
  }

  cerrar(): void {
    this.dialogo.close(null);
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
