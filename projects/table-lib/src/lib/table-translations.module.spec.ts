import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableTranslationsModule } from './table-translations.module';
import { TranslateService, TranslateStore } from '@ngx-translate/core';

describe('TableTranslationsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TableTranslationsModule.forRoot()],
      providers: [TranslateStore],
    });
  });

  it('should create', () => {
    const service = TestBed.inject(TranslateService);
    expect(service).toBeTruthy();
  });

  it('should set default language', () => {
    const service = TestBed.inject(TranslateService);
    expect(service.defaultLang).toBe('en');
  });
});
