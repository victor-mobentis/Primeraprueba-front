import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClient } from 'src/app/models/clients.model'; // Actualizar esta línea

@Component({
  selector: 'app-popup-client-detail',
  templateUrl: './popup-client-detail.component.html',
  styleUrls: ['./popup-client-detail.component.css']
})
export class PopupClientDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupClientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public client: IClient
  ){}

  close() {
    this.dialogRef.close();
  }
}
