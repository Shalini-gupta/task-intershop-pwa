import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { Category } from 'ish-core/models/category/category.model';
import { LoadCategory, LoadCategorySuccess, SelectCategory } from 'ish-core/store/shopping/categories';
import { shoppingReducers } from 'ish-core/store/shopping/shopping-store.module';
import { findAllIshElements } from 'ish-core/utils/dev/html-query-utils';
import { MockComponent } from 'ish-core/utils/dev/mock.component';
import { categoryTree } from 'ish-core/utils/dev/test-data-utils';

import { CategoryPageContainerComponent } from './category-page.container';

describe('Category Page Container', () => {
  let component: CategoryPageContainerComponent;
  let fixture: ComponentFixture<CategoryPageContainerComponent>;
  let element: HTMLElement;
  let store$: Store<{}>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          shopping: combineReducers(shoppingReducers),
        }),
      ],
      declarations: [
        CategoryPageContainerComponent,
        MockComponent({
          selector: 'ish-breadcrumb',
          template: 'Breadcrumb Component',
          inputs: ['category'],
        }),
        MockComponent({
          selector: 'ish-category-page',
          template: 'Category Page Component',
          inputs: ['category'],
        }),
        MockComponent({
          selector: 'ish-family-page',
          template: 'Family Page Component',
          inputs: ['category'],
        }),
        MockComponent({ selector: 'ish-loading', template: 'Loading Component' }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageContainerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    store$ = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should not display anything when neither category nor loading is set', () => {
    fixture.detectChanges();

    expect(findAllIshElements(element)).toBeEmpty();
  });

  it('should display loading when category is loading', () => {
    store$.dispatch(new LoadCategory('dummy'));

    fixture.detectChanges();

    expect(findAllIshElements(element)).toEqual(['ish-loading']);
  });

  it('should display category-page when category has sub categories', () => {
    const category = { uniqueId: 'dummy', categoryPath: ['dummy'] } as Category;
    const subCategory = { uniqueId: 'dummy.A', categoryPath: ['dummy', 'dummy.A'] } as Category;
    store$.dispatch(new LoadCategorySuccess(categoryTree([category, subCategory])));
    store$.dispatch(new SelectCategory(category.uniqueId));

    fixture.detectChanges();

    expect(findAllIshElements(element)).toEqual(['ish-breadcrumb', 'ish-category-page']);
  });

  it('should display family-page when category has products', () => {
    const category = { uniqueId: 'dummy', categoryPath: ['dummy'] } as Category;
    category.hasOnlineProducts = true;
    store$.dispatch(new LoadCategorySuccess(categoryTree([category])));
    store$.dispatch(new SelectCategory(category.uniqueId));

    fixture.detectChanges();

    expect(findAllIshElements(element)).toEqual(['ish-breadcrumb', 'ish-family-page']);
  });
});