import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditReasonRejectionsComponent } from './add-edit-reason-rejections/add-edit-reason-rejections.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { timeout } from 'rxjs';
import { MotivoRechazoService } from 'src/app/services/reasons_rejection/motivo-rechazo.service';
import { IMotivoRechazo } from 'src/app/models/motivoRechazo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reasons-rejections',
  templateUrl: './reasons-rejections.component.html',
  styleUrls: ['./reasons-rejections.component.css'],
})
export class ReasonsRejectionsComponent {
  rejectList: IMotivoRechazo[] = [];
  cargando: boolean = false;

  editingReasonId: number | null = null;
  originalReason: IMotivoRechazo | null = null;

  newRejectionCode: string = '';
  newRejectionName: string = '';

  constructor(
    private _motivoRechazoService: MotivoRechazoService,
    private router: Router,
    public dialogRef: MatDialogRef<ReasonsRejectionsComponent>,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.cargaRechazos();
  }

  cargaRechazos(): void {
    this.cargando = true;
    this._motivoRechazoService
      .getReasons()
      .pipe(timeout(20000))
      .subscribe(
        (data: IMotivoRechazo[]) => {
          this.rejectList = data;
          this.cargando = false;
        },
        (error) => {
          console.error('Error al cargar los motivos de rechazo', error);
          this.cargando = false;
        }
      );
  }

  /* editar un motivo de rechazo */
  toogleEdit(reasonId: number){
    const reason = this.rejectList.find(r => r.id === reasonId);
    if(reason){
      this.originalReason = {...reason};
      this.editingReasonId = reasonId;
    }
  }
  saveChanges(reason: IMotivoRechazo){
    this.editingReasonId = null;
    this.originalReason = null;
  }

  cancelEdit(){
    if (this.originalReason) {
      const index = this.rejectList.findIndex(r => r.id === this.originalReason!.id);
      if (index !== -1) {
        this.rejectList[index] = { ...this.originalReason };
      }
    }
    this.editingReasonId = null;
    this.originalReason = null;
  }
  
  /* Limpiar los campos del nuevo motivo de rechazo */
  clearNewRechazo() {
    this.newRejectionCode = '';
    this.newRejectionName = '';
  }
  deleteRechazo(id: Number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `¿Estas seguro de eliminar este motivo de rechazo?`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this._motivoRechazoService.deleteReason(id).subscribe((data) => {
            if (data === 'Success') {
              this.cargaRechazos();
              this.mensajeExito();
            }
          });
        }
      });
  }

  mensajeExito() {
    this.toastr.success('Motivo eliminado con exito', '', {
      timeOut: 2000,
    });
  }

  /* logica de btn de Cancelar de Motivo de Rechazo */
  cerrarPopup() {
    this.dialogRef.close();
  }

}
