import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DirectivesModule } from 'ish-core/directives.module';
import { FeatureToggleModule } from 'ish-core/feature-toggle.module';
import { IconModule } from 'ish-core/icon.module';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { FormControlFeedbackComponent } from './components/form-control-feedback/form-control-feedback.component';
import { InputBirthdayComponent } from './components/input-birthday/input-birthday.component';
import { InputComponent } from './components/input/input.component';
import { SelectAddressComponent } from './components/select-address/select-address.component';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { SelectRegionComponent } from './components/select-region/select-region.component';
import { SelectTitleComponent } from './components/select-title/select-title.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { ShowFormFeedbackDirective } from './directives/show-form-feedback.directive';

const exportedComponents = [FormControlFeedbackComponent, ShowFormFeedbackDirective];

// tslint:disable ish-deprecation
const deprecatedExportedComponents = [
  CheckboxComponent,
  InputBirthdayComponent,
  InputComponent,
  SelectAddressComponent,
  SelectComponent,
  SelectCountryComponent,
  SelectRegionComponent,
  SelectTitleComponent,
  TextareaComponent,
];

// tslint:enable ish-deprecation

@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    FeatureToggleModule,
    IconModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [...deprecatedExportedComponents, ...exportedComponents],
  exports: [...deprecatedExportedComponents, ...exportedComponents],
})
export class FormsSharedModule {}
