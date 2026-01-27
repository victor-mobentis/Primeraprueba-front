import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/i18n/translation.service';

// Pure pipe ya que recargamos la página al cambiar idioma
@Pipe({ name: 'translate', pure: true })
export class TranslatePipe implements PipeTransform {
  constructor(private translation: TranslationService) {}
  transform(key: string, params?: { [k: string]: any }): string {
    return this.translation.t(key, params);
  }
}
