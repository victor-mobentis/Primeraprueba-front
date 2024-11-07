import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { RechazadosService } from 'src/app/services/rechazados/rechazados.service';

@Component({
  selector: 'app-corrective-action-status',
  templateUrl: './corrective-action-status.component.html',
  styleUrls: ['./corrective-action-status.component.scss'],
})
export class CorrectiveActionStatusComponent {
  @Input() statusId!: number;
  @Input() statusText!: string;
  @Input() rejectionId!: number;
  @Output() statusChange = new EventEmitter<{
    statusId: number;
    statusText: string;
  }>();

  constructor(
    private _notifactionService: NotificationService,
    private _rechazadosService: RechazadosService
  ) {}

  handleStatusClick() {
    if (this.statusId === 1) {
      const newStatus = { statusId: 2, statusText: 'Pendiente de envío' };
      this.updateStatus(newStatus);
    }
  }

  updateStatus(newStatus: { statusId: number; statusText: string }) {
    this._rechazadosService
      .updateEstadoAccionCorrectora(newStatus, this.rejectionId)
      .subscribe(
        (status) => {
          if (status === 'Success') {
            this._notifactionService.showSuccess(
              'Cambios guardados correctamente.'
            );
            this.statusChange.emit(newStatus);
          }
        },
        (error) => {
          console.error('Error al actualizar el rechazo:', error);
          this._notifactionService.showError('Error al guardar los cambios.');
        }
      );
  }
}
