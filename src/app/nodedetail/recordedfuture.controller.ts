import * as angular from 'angular';

import { INodeDetailResolverService } from '../../app/services/nodedetailresolver';
import { IMinemeldConfigService } from '../../app/services/config';
import { NodeDetailInfoController } from './nodedetail.info.controller';
import { IMinemeldStatusService } from  '../../app/services/status';
import { IThrottleService } from '../../app/services/throttle';

/** @ngInject */
function recordedFutureRouterConfig($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
        .state('nodedetail.recordedfutureinfo', {
            template: require('./recordedfuture.info.tpl'),
            controller: NodeDetailRecordedFutureInfoController,
            controllerAs: 'nodedetailinfo'
        })
        ;
}

/** @ngInject */
function recordedFutureRegisterClass(NodeDetailResolver: INodeDetailResolverService) {
    NodeDetailResolver.registerClass('minemeld.ft.recordedfuture.IPRiskList', {
        tabs: [{
            icon: 'fa fa-circle-o',
            tooltip: 'INFO',
            state: 'nodedetail.recordedfutureinfo',
            active: false
        },
        {
            icon: 'fa fa-area-chart',
            tooltip: 'STATS',
            state: 'nodedetail.stats',
            active: false
        },
        {
            icon: 'fa fa-asterisk',
            tooltip: 'GRAPH',
            state: 'nodedetail.graph',
                active: false
        }]
    });
    NodeDetailResolver.registerClass('minemeld.ft.recordedfuture.DomainRiskList', {
        tabs: [{
            icon: 'fa fa-circle-o',
            tooltip: 'INFO',
            state: 'nodedetail.recordedfutureinfo',
            active: false
        },
        {
            icon: 'fa fa-area-chart',
            tooltip: 'STATS',
            state: 'nodedetail.stats',
            active: false
        },
        {
            icon: 'fa fa-asterisk',
            tooltip: 'GRAPH',
            state: 'nodedetail.graph',
                active: false
        }]
    });
}

class NodeDetailRecordedFutureInfoController extends NodeDetailInfoController {
    MinemeldConfigService: IMinemeldConfigService;
    token: string;
    $modal: angular.ui.bootstrap.IModalService;

    /* @ngInject */
    constructor(toastr: any, $interval: angular.IIntervalService,
        MinemeldStatusService: IMinemeldStatusService,
        $scope: angular.IScope,
        $compile: angular.ICompileService, $state: angular.ui.IStateService,
        $stateParams: angular.ui.IStateParamsService, MinemeldConfigService: IMinemeldConfigService,
        $uibModal: angular.ui.bootstrap.IModalService,
        $rootScope: angular.IRootScopeService,
        ThrottleService: IThrottleService) {
        super(
            toastr, $interval, MinemeldStatusService, $scope,
            $compile, $state, $stateParams, $rootScope, ThrottleService
        );

        this.MinemeldConfigService = MinemeldConfigService;
        this.$modal = $uibModal;

        this.loadToken();
    }

    loadToken(): void {
        this.MinemeldConfigService.getDataFile(this.nodename + '_side_config')
        .then((result: any) => {
            if (result.token) {
                this.token = result.token;
            } else {
                this.token = undefined;
            }
        }, (error: any) => {
            this.toastr.error('ERROR RETRIEVING NODE SIDE CONFIG: ' + error.status);
            this.token = undefined;
        });
    }

    setToken(): void {
        var mi: angular.ui.bootstrap.IModalServiceInstance;

        mi = this.$modal.open({
            template: require('./recordedfuture.st.modal.tpl'),
            controller: RecorededFutureSetTokenController,
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then((result: any) => {
            this.token = result.token;
            return this.MinemeldConfigService.saveDataFile(
                this.nodename + '_side_config',
                { token: this.token },
                this.nodename
            );
        })
        .then((result: any) => {
            this.toastr.success('API TOKEN SET');
        }, (error: any) => {
            this.toastr.error('ERROR SETTING TOKEN: ' + error.status);
        });
    }
}

class RecorededFutureSetTokenController {
    $modalInstance: angular.ui.bootstrap.IModalServiceInstance;

    token: string;
    token2: string;

    valid(): boolean {
        if (this.token != this.token2) {
            angular.element('#fgToken1').addClass('has-error');
            angular.element('#fgToken2').addClass('has-error');

            return false;
        }
        angular.element('#fgToken1').removeClass('has-error');
        angular.element('#fgToken2').removeClass('has-error');

        if (!this.token) {
            return false;
        }

        return true;
    }

    /** @ngInject */
    constructor($uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
        this.$modalInstance = $uibModalInstance;
    }

    save() {
        var result: any = {};

        result.token = this.token;

        this.$modalInstance.close(result);
    }

    cancel() {
        this.$modalInstance.dismiss();
    }
};

console.log('Loading RecordedFuture');
angular.module('minemeldWebui')
    .config(recordedFutureRouterConfig)
    .run(recordedFutureRegisterClass)
    ;
