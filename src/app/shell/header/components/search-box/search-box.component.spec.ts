import { ChangeDetectionStrategy, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent } from 'ng-mocks';

import { SuggestTerm } from 'ish-core/models/suggest-term/suggest-term.model';
import { PipesModule } from 'ish-core/pipes.module';

import { SearchBoxComponent } from './search-box.component';

describe('Search Box Component', () => {
  let fixture: ComponentFixture<SearchBoxComponent>;
  let component: SearchBoxComponent;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent(FaIconComponent), SearchBoxComponent],
      imports: [PipesModule, TranslateModule.forRoot()],
    })
      .overrideComponent(SearchBoxComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  function triggerSearch(term: string, results: SuggestTerm[]) {
    component.results = results;
    component.searchTermCurrent = term;
    component.searchTermLatest = term;
    component.isHidden = !term;
    component.ngOnChanges({
      results: { currentValue: results } as SimpleChange,
      searchTermCurrent: { currentValue: term } as SimpleChange,
      searchTermLatest: { currentValue: term } as SimpleChange,
    } as SimpleChanges);
    fixture.detectChanges();
  }

  it('should fire event when search is called', done => {
    component.searchTermChange.subscribe(searchTerm => {
      expect(searchTerm).toEqual('test');
      done();
    });

    component.searchSuggest('test');
  });

  describe('with no results', () => {
    beforeEach(() => {
      triggerSearch('', []);
    });

    it('should show no results when no suggestions are found', () => {
      const ul = element.querySelector('.search-suggest-results');

      expect(ul).toBeFalsy();
    });

    it('should hide popup when no search results are found', () => {
      expect(component.isHidden).toBeTrue();
    });
  });

  describe('with results', () => {
    beforeEach(() => {
      triggerSearch('cam', [{ term: 'Cameras' }, { term: 'Camcorders' }]);
    });

    it('should show results when suggestions are available', () => {
      const ul = element.querySelector('.search-suggest-results');

      expect(ul.querySelectorAll('li')).toHaveLength(2);
    });

    it('should show popup when search results are found', () => {
      expect(component.isHidden).toBeFalse();
    });
  });

  describe('with inputs', () => {
    it('should show button text when buttonText is set', () => {
      component.configuration = { id: 'searchbox', buttonText: 'buttonTextInput' };
      fixture.detectChanges();
      const button = element.querySelector('.btn-search');
      expect(button.textContent).toContain('buttonTextInput');
    });
    it('should show placeholder text when placeholder is set', () => {
      component.configuration = { id: 'searchbox', placeholder: 'placeholderInput' };
      fixture.detectChanges();
      const inputElement = element.querySelector('.searchTerm');
      expect(inputElement.getAttribute('placeholder')).toBe('placeholderInput');
    });
  });
});
