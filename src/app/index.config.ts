import ngRedux from 'ng-redux';
import ReduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';

import { MineMeldAPIService } from './services/minemeldapi';
import { reducers } from './store';

/** @ngInject */
export function config($logProvider: ng.ILogProvider, $compileProvider: angular.ICompileProvider,
    $ocLazyLoadProvider: any, toastrConfig: any, cfpLoadingBarProvider: any,
    MineMeldAPIService: MineMeldAPIService,
    $ngReduxProvider: ngRedux.INgReduxProvider) {
    // https://code.angularjs.org/1.5.5/docs/guide/production
    $compileProvider.debugInfoEnabled(false);

    // enable log
    $logProvider.debugEnabled(true);

    $ocLazyLoadProvider.config({
      debug: true
    });

    // set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    // set options for loading-bar
    cfpLoadingBarProvider.includeSpinner = false;

    let reducer = combineReducers(reducers);
    $ngReduxProvider.createStoreWith(
      reducer,
      [ReduxThunk.withExtraArgument(MineMeldAPIService)]
    );
}
