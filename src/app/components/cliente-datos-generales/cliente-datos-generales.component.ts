import { Component, Input } from '@angular/core';
import { IClient } from 'src/app/models/clients.model';
import { TranslationService } from 'src/app/i18n/translation.service';

@Component({
  selector: 'mobentis-cliente-datos-generales',
  templateUrl: './cliente-datos-generales.component.html',
  styleUrls: ['./cliente-datos-generales.component.scss']
})
export class ClienteDatosGeneralesComponent {
  @Input() cliente?: IClient;
  
  constructor(public translationService: TranslationService) {}
}
