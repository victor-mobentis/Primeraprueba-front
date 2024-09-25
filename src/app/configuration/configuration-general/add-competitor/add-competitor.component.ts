import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ICompetidor } from 'src/app/models/competidor.model';
import { FilterService } from 'src/app/services/filter/filter.service';
import { timeout } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-competitor',
  templateUrl: './add-competitor.component.html',
  styleUrls: ['./add-competitor.component.css']
})
export class AddCompetitorComponent {

  competitorList: ICompetidor[] = [];
  cargando: boolean = false;
  newCompetitonName: string = '';
  editingCompetitorId: number | null = null;
  originalCompetitor: ICompetidor | null = null;  // variable que se encarga de almacenar la variable original
  constructor(
    public toastr: ToastrService,
    private competitorsService: FilterService,
    public dialogRef: MatDialogRef<AddCompetitorComponent>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarCompetitors();
  }

  /* cargar los datos */
  cargarCompetitors(): void {
    this.cargando = true;
    this.competitorsService
      .getCompetidores()
      .pipe(timeout(20000))
      .subscribe(
        (data: ICompetidor[]) => {
          console.log('Datos de competidores recibidos:', data);
          this.competitorList = data;
          this.cargando = false;
        },
        (error) => {
          console.error('Error al cargar los competidores', error);
          this.cargando = false;
        }
      );
  }

  // Activar modo de edición para un competidor específico y guardar los datos originales
  toggleEdit(competitorId: number) {
    const competitor = this.competitorList.find(c => c.id === competitorId);
    if (competitor) {
      this.originalCompetitor = { ...competitor };  // Hacer una copia de los datos originales
      this.editingCompetitorId = competitorId;
    }
  }

  // Guardar cambios y salir del modo de edición
  saveChanges(competitor: ICompetidor) {
    // Aquí puedes agregar lógica para guardar los cambios en el servidor
    this.editingCompetitorId = null;
    this.originalCompetitor = null; // Limpia la copia temporal después de guardar
  }

  // Cancelar la edición sin guardar los cambios, restaurar los valores originales
  cancelEdit() {
    if (this.originalCompetitor) {
      const index = this.competitorList.findIndex(c => c.id === this.originalCompetitor!.id);
      if (index !== -1) {
        this.competitorList[index] = { ...this.originalCompetitor };  // Restaurar los valores originales
      }
    }
    this.editingCompetitorId = null;
    this.originalCompetitor = null; // Limpiar la copia temporal después de cancelar
  }

  /* limpiar el input */
  clearNewCompetitor() {
    this.newCompetitonName = '';
  }

  deleteCompetidor(id: Number){
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `¿Estas seguro de eliminar este motiov de rechazo?`,
      })
      .afterClosed()
      .subscribe((confirmado: boolean) =>{
        if(confirmado){
          /* cuando se creea una conuslta para eliminar competidor  */
        }
      })
  }

  /* mesanje de exito */
  mensajeExito(){
    this.toastr.success('Competidor eliminado correctamente', 'Exito',{
      timeOut: 2000,
    });
  }

  /* lógica de botón de Cancelar de Motivo de Rechazo */
  cerrarPopup() {
    this.dialogRef.close();
  }
}
