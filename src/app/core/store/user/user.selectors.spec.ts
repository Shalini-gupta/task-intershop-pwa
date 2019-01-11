import { TestBed } from '@angular/core/testing';
import { combineReducers } from '@ngrx/store';

import { TestStore, ngrxTesting } from 'ish-core/utils/dev/ngrx-testing';
import { Customer } from '../../models/customer/customer.model';
import { HttpError, HttpHeader } from '../../models/http-error/http-error.model';
import { Product } from '../../models/product/product.model';
import { User } from '../../models/user/user.model';
import { checkoutReducers } from '../checkout/checkout-store.module';
import { coreReducers } from '../core-store.module';
import { LoadProductSuccess } from '../shopping/products';
import { shoppingReducers } from '../shopping/shopping-store.module';

import { LoadCompanyUserSuccess, LoginUserFail, LoginUserSuccess } from './user.actions';
import { getLoggedInCustomer, getLoggedInUser, getUserAuthorized, getUserError } from './user.selectors';

describe('User Selectors', () => {
  let store$: TestStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: ngrxTesting({
        ...coreReducers,
        checkout: combineReducers(checkoutReducers),
        shopping: combineReducers(shoppingReducers),
      }),
    });

    store$ = TestBed.get(TestStore);
    store$.dispatch(new LoadProductSuccess({ product: { sku: 'sku' } as Product }));
  });

  it('should select no customer/user when no event was sent', () => {
    expect(getLoggedInCustomer(store$.state)).toBeUndefined();
    expect(getLoggedInUser(store$.state)).toBeUndefined();
    expect(getUserAuthorized(store$.state)).toBeFalse();
    expect(getUserError(store$.state)).toBeFalsy();
  });

  it('should select the customer when logging in successfully', () => {
    const customerNo = 'test';
    store$.dispatch(new LoginUserSuccess({ customer: { customerNo } as Customer }));

    expect(getLoggedInCustomer(store$.state)).toHaveProperty('customerNo', customerNo);
    expect(getLoggedInUser(store$.state)).toBeUndefined();
    expect(getUserAuthorized(store$.state)).toBeTrue();
    expect(getUserError(store$.state)).toBeFalsy();
  });

  it('should select the user when logging in as private customer successfully', () => {
    const firstName = 'test';
    const type = 'PrivateCustomer';
    store$.dispatch(new LoginUserSuccess({ customer: { firstName, type } as Customer }));

    expect(getLoggedInCustomer(store$.state)).toHaveProperty('firstName', firstName);
    expect(getLoggedInUser(store$.state)).toHaveProperty('firstName', firstName);
    expect(getUserAuthorized(store$.state)).toBeTrue();
    expect(getUserError(store$.state)).toBeFalsy();
  });

  it('should not select the user when logging in as company customer successfully', () => {
    const type = 'SMBCustomer';
    store$.dispatch(new LoginUserSuccess({ customer: { type } as Customer }));

    expect(getLoggedInCustomer(store$.state)).toBeTruthy();
    expect(getLoggedInUser(store$.state)).toBeUndefined();
    expect(getUserAuthorized(store$.state)).toBeTrue();
    expect(getUserError(store$.state)).toBeFalsy();
  });

  it('should select the user when load company user is successful', () => {
    const firstName = 'test';
    store$.dispatch(new LoadCompanyUserSuccess({ user: { firstName } as User }));

    expect(getLoggedInCustomer(store$.state)).toBeUndefined();
    expect(getLoggedInUser(store$.state)).toHaveProperty('firstName', firstName);
    expect(getUserAuthorized(store$.state)).toBeFalse();
    expect(getUserError(store$.state)).toBeFalsy();
  });

  it('should select no customer and an error when an error event was sent', () => {
    const error = { status: 401, headers: { 'error-key': 'dummy' } as HttpHeader } as HttpError;
    store$.dispatch(new LoginUserFail({ error }));

    expect(getLoggedInCustomer(store$.state)).toBeUndefined();
    expect(getLoggedInUser(store$.state)).toBeUndefined();
    expect(getUserAuthorized(store$.state)).toBeFalse();

    const err = getUserError(store$.state);
    expect(err).toBeTruthy();
    expect(err.status).toEqual(401);
  });
});
