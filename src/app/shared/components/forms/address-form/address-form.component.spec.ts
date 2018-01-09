import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AddressFormComponent } from './address-form.component';

describe('Address Form Component', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressFormComponent],

      providers: [
        { provide: TranslateService },
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddressFormComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;

        const parentForm = new FormGroup({
        });
        component.parentForm = parentForm;
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
  });

  it('should throw an error if input parameter parentForm is not set', () => {
    component.parentForm = null;
    expect(function() { fixture.detectChanges(); }).toThrow();
  });

  it('should create an address form on creation', () => {
    expect(component.addressForm).toBeUndefined('address form has not been created before init');
    fixture.detectChanges();
    expect(component.addressForm.get('countryCode')).toBeTruthy('address form contains a country code control');
    expect(component.addressForm.get('firstName')).toBeTruthy('address form contains a firstName control');
    expect(component.addressForm.get('lastName')).toBeTruthy('address form contains a lastName control');
    expect(component.addressForm.get('addressLine1')).toBeTruthy('address form contains a addressLine1 control');
    expect(component.addressForm.get('addressLine2')).toBeTruthy('address form contains a addressLine2 control');
    expect(component.addressForm.get('postalCode')).toBeTruthy('address form contains a postalCode control');
    expect(component.addressForm.get('city')).toBeTruthy('address form contains a city control');
    expect(component.addressForm.get('phoneHome')).toBeTruthy('address form contains a phoneHome control');
  });

  it('should render country specific address forms if country changes', () => {
    fixture.detectChanges();
    expect(element.querySelector('ish-address-default')).toBeTruthy('default address template is rendered if country is empty');

    component.addressForm.get('countryCode').setValue('DE');
    fixture.detectChanges();
    expect(element.querySelector('ish-address-de')).toBeTruthy('German address template is rendered if country is DE');

    component.addressForm.get('countryCode').setValue('FR');
    fixture.detectChanges();
    expect(element.querySelector('ish-address-fr')).toBeTruthy('French address template is rendered if country is FR');

    component.addressForm.get('countryCode').setValue('GB');
    fixture.detectChanges();
    expect(element.querySelector('ish-address-gb')).toBeTruthy('British address template is rendered if country is GB');

    component.addressForm.get('countryCode').setValue('US');
    fixture.detectChanges();
    expect(element.querySelector('ish-address-us')).toBeTruthy('US address template is rendered if country is US');

    component.addressForm.get('countryCode').setValue('BG');
    fixture.detectChanges();
    expect(element.querySelector('ish-address-default')).toBeTruthy('Default address template is rendered if country has no specific address template ');
  });

});
