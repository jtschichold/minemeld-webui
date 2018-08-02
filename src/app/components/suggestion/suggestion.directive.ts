import { IMineMeldAPIService } from '../../services/minemeldapi';
import { MinemeldStatusService } from '../../services/status';

import './suggestion.style';
const template = require<string>('./suggestion.tpl');

/** @ngInject */
export function suggestion(): ng.IDirective {
    return {
        restrict: 'E',
        scope: {
            creationDate: '='
        },
        template: template,
        controller: SuggestionController,
        controllerAs: 'vm',
        bindToController: true
    };
}

let modalTemplate = require<string>('./suggestion.modal.tpl');

class SuggestionController  implements angular.IController {
    MineMeldAPIService: IMineMeldAPIService;
    MineMeldStatusService: MinemeldStatusService;

    minimized: boolean = true;
    disabled: boolean = false;
    snsAvailable: boolean = false;

    /** @ngInject */
    constructor(MineMeldAPIService: IMineMeldAPIService,
        MinemeldStatusService: MinemeldStatusService,
        private toastr: any,
        private $uibModal: angular.ui.bootstrap.IModalService) {
        this.MineMeldAPIService = MineMeldAPIService;
        this.MineMeldStatusService = MinemeldStatusService;

        this.MineMeldAPIService.onLogin(this.checkSNS.bind(this));
        this.MineMeldAPIService.onLogout(this.destroySNS.bind(this));
        if (this.MineMeldAPIService.isLoggedIn()) {
            this.checkSNS();
        }
    }

    $onInit() {}

    showModal(): void {
        var mi: angular.ui.bootstrap.IModalServiceInstance;

        this.minimized = false;

        mi = this.$uibModal.open({
            template: modalTemplate,
            controller: SuggestionModalController,
            controllerAs: 'vm',
            bindToController: true,
            backdrop: 'static',
            animation: false
        });

        mi.result.then(
            result => {
                this.MineMeldStatusService.mkwish(result.email, result.suggestion).then(
                    success => {
                        this.toastr.success('SUGGESTION SENT. THANKS !!');
                    },
                    error => {
                        this.toastr.error('ERROR SENDING YOUR SUGGESTION' + error.statusText);
                    }
                );
            }
        ).finally(() => {
            this.minimized = true;
        });
    }

    private checkSNS(): void {
        this.MineMeldStatusService.getInfo().then(
            result => {
                if (result.sns) {
                    this.snsAvailable = true;
                }
            }
        );
    }

    private destroySNS(): void {
        this.snsAvailable = false;
    }
}

class SuggestionModalController {
    email: string = null;
    suggestion: string = null;

    /** @ngInject */
    constructor(private $uibModalInstance: angular.ui.bootstrap.IModalInstanceService) { }

    valid(): boolean {
        return (this.email && this.email.length !== 0) && (this.suggestion && this.suggestion.length !== 0);
    }

    cancel() {
        this.$uibModalInstance.dismiss();
    }

    submit() {
        this.$uibModalInstance.close({
            email: this.email,
            suggestion: this.suggestion
        });
    }
}
