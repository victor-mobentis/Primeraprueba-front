import { Injectable } from '@angular/core';
import { LanguageService } from '../services/language/language.service';
import { dictionaries } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang: string = 'es';

  constructor(private languageService: LanguageService) {
    // Solo obtener el idioma actual una vez, sin suscripción
    // Ya que la página se recarga al cambiar de idioma
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  t(key: string, params?: { [k: string]: any }): string {
    const dict = dictionaries[this.currentLang] || dictionaries['es'];
    let value = dict[key] || key;
    if (params) {
      Object.keys(params).forEach(p => {
        value = value.replace(new RegExp(`{{${p}}}`, 'g'), params[p]);
      });
    }
    return value;
  }
}
