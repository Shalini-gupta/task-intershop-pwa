// tslint:disable:ish-ordered-imports
require('jest-preset-angular/setup-jest');

require('jest-extended');

import { CompilerOptions } from '@angular/core';
import { getTestBed } from '@angular/core/testing';

beforeEach(() => {
  const compilerOptions: CompilerOptions = { preserveWhitespaces: false };
  getTestBed().configureCompiler(compilerOptions);

  const logFunction = global.console.log;
  global.console.log = (...args: unknown[]) => {
    if (
      args?.some(
        arg => arg instanceof Error || (typeof arg === 'string' && arg.startsWith('@ngrx/store: The feature name'))
      )
    ) {
      fail(...args);
    }
    logFunction(...args);
  };

  const errorFunction = global.console.error;
  global.console.error = (...args: unknown[]) => {
    if (args?.some(arg => arg instanceof Error)) {
      fail(...args);
    }
    errorFunction(...args);
  };

  jest.spyOn(global.console, 'warn').mockImplementation(arg => {
    if (
      typeof arg !== 'string' ||
      !(
        arg.startsWith('Navigation triggered outside Angular zone') ||
        arg.startsWith('A router outlet has not been instantiated during routes activation. URL Segment:')
      )
    ) {
      // tslint:disable-next-line:no-console
      console.log(arg);
    }
  });
});

afterEach(() => jest.clearAllTimers());

Object.defineProperty(global, 'PRODUCTION_MODE', {
  value: () => false,
});

Object.defineProperty(global, 'NGRX_RUNTIME_CHECKS', {
  value: () => true,
});

Object.defineProperty(global, 'THEME', {
  value: () => 'default',
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});

// fix for TypeError, see https://github.com/telerik/kendo-angular/issues/1505#issuecomment-385882188
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
});
