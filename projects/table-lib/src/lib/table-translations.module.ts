import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export interface TranslationConfig {
  path?: string;
  prefix?: string;
  suffix?: string;
}

export function createTranslateLoader(http: HttpClient, config: TranslationConfig) {
  const prefix = config.prefix || './assets/i18n/';
  const suffix = config.suffix || '.json';
  return new TranslateHttpLoader(http, prefix, suffix);
}

@NgModule({
  imports: [TranslateModule],
  exports: [TranslateModule]
})
export class TableTranslationsModule {
  static forRoot(config: TranslationConfig = {}): ModuleWithProviders<TableTranslationsModule> {
    return {
      ngModule: TableTranslationsModule,
      providers: [
        {
          provide: 'TRANSLATION_CONFIG',
          useValue: config
        },
        {
          provide: TranslateLoader,
          useFactory: (http: HttpClient, config: TranslationConfig) => createTranslateLoader(http, config),
          deps: [HttpClient, 'TRANSLATION_CONFIG']
        }
      ]
    };
  }
}