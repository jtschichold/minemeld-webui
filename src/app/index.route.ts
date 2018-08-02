import * as fromAbout from './about';
import * as fromAdmin from './admin';
import * as fromLogin from './login';
import * as fromSystem from './system';
import * as fromDashboard from './dashboard';
import * as fromNodes from './nodes';
import * as fromNodeDetail from './nodedetail';
import * as fromPrototypes from './prototypes';
import * as fromPrototypeDetail from './prototypedetail';
import * as fromPrototypeAdd from './prototypeadd';
import * as fromConfig from './config';
import * as fromIndicatorAdd from './indicatoradd';
import * as fromLogs from './logs';

/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $stateProvider
        .state('login', fromLogin.uiState)
        .state('about', fromAbout.uiState)
        .state('system', fromSystem.baseState)
        .state('system.dashboard', fromSystem.dashboardState)
        .state('system.extensions', fromSystem.extensionsState)
        .state('dashboard', fromDashboard.uiState)
        .state('nodes', fromNodes.uiState)
        .state('nodedetail', fromNodeDetail.baseState)
        .state('nodedetail.stats', fromNodeDetail.statsState)
        .state('nodedetail.info', fromNodeDetail.infoState)
        .state('nodedetail.graph', fromNodeDetail.graphState)
        .state('prototypes', fromPrototypes.uiState)
        .state('prototypedetail', fromPrototypeDetail.uiState)
        .state('prototypeadd', fromPrototypeAdd.uiState)
        .state('config', fromConfig.baseState)
        .state('configadd', fromConfig.addState)
        .state('indicatoradd', fromIndicatorAdd.uiState)
        .state('logs', fromLogs.uiState)
        .state('admin', fromAdmin.baseState)
        .state('admin.users', fromAdmin.usersState)
        .state('admin.fusers', fromAdmin.fusersState)
    ;

    $urlRouterProvider.otherwise('/login');
}
