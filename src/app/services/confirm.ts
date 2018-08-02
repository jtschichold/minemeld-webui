let template = require<string>('./confirm.tpl');

export interface IConfirmService {
    show(title: string, msg: string): angular.IPromise<any>;
}

export class ConfirmService implements IConfirmService {
    static $inject = ['$uibModal'];

    $modal: angular.ui.bootstrap.IModalService;

    constructor($uibModal: angular.ui.bootstrap.IModalService) {
        this.$modal = $uibModal;
    }

    show(title: string, msg: string): angular.IPromise<any> {
        var mi: angular.ui.bootstrap.IModalServiceInstance;

        mi = this.$modal.open({
            template: template,
            controller: ConfirmController,
            controllerAs: 'vm',
            bindToController: true,
            resolve: {
                title: () => { return title; },
                msg: () => { return msg; }
            },
            backdrop: 'static',
            animation: false
        });

        return mi.result;
    }
}

class ConfirmController {
    $modalInstance: angular.ui.bootstrap.IModalServiceInstance;
    title: string;
    msg: string;

    /* @ngInject */
    constructor($uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
                title: string,
                msg: string) {
        this.$modalInstance = $uibModalInstance;
        this.title = title;
        this.msg = msg;
    }

    ok() {
        this.$modalInstance.close('ok');
    }

    cancel() {
        this.$modalInstance.dismiss();
    }
}
