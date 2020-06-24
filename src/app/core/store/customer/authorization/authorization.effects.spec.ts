import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { Authorization } from 'ish-core/models/authorization/authorization.model';
import { Customer } from 'ish-core/models/customer/customer.model';
import { User } from 'ish-core/models/user/user.model';
import { AuthorizationService } from 'ish-core/services/authorization/authorization.service';
import { getLoggedInCustomer, loadCompanyUserSuccess } from 'ish-core/store/customer/user';

import { AuthorizationEffects } from './authorization.effects';

describe('Authorization Effects', () => {
  let actions$: Observable<Action>;
  let effects: AuthorizationEffects;
  let store$: MockStore;
  let authorizationService: AuthorizationService;

  beforeEach(() => {
    authorizationService = mock(AuthorizationService);
    when(authorizationService.getRolesAndPermissions(anything(), anything())).thenReturn(of({} as Authorization));

    TestBed.configureTestingModule({
      providers: [
        AuthorizationEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: AuthorizationService, useFactory: () => instance(authorizationService) },
      ],
    });

    effects = TestBed.inject(AuthorizationEffects);
    store$ = TestBed.inject(MockStore);
    store$.overrideSelector(getLoggedInCustomer, {} as Customer);
  });

  describe('loadRolesAndPermissions$', () => {
    it('should call the authorization service when company user was loaded successfully', done => {
      actions$ = of(loadCompanyUserSuccess({ user: {} as User }));

      effects.loadRolesAndPermissions$.subscribe(action => {
        verify(authorizationService.getRolesAndPermissions(anything(), anything())).once();
        expect(action).toMatchInlineSnapshot(`
          [Authorization API] Load Roles and Permissions Success:
            authorization: {}
        `);
        done();
      });
    });

    it('should map to error action when service call fails', done => {
      when(authorizationService.getRolesAndPermissions(anything(), anything())).thenReturn(throwError('ERROR'));

      actions$ = of(loadCompanyUserSuccess({ user: {} as User }));

      effects.loadRolesAndPermissions$.subscribe(action => {
        verify(authorizationService.getRolesAndPermissions(anything(), anything())).once();
        expect(action).toMatchInlineSnapshot(`
          [Authorization API] Load Roles and Permissions Fail:
            error: {}
        `);
        done();
      });
    });
  });
});
