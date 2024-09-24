import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-competitor',
  templateUrl: './add-competitor.component.html',
  styleUrls: ['./add-competitor.component.css']
})
export class AddCompetitorComponent {


  constructor(
    public dialogRef: MatDialogRef<AddCompetitorComponent>,
    public dialog: MatDialog,
  ){

  }
   /* logica de btn de Cancelar de Motivo de Rechazo */
   cerrarPopup() {
    
    this.dialogRef.close();
  }
}
