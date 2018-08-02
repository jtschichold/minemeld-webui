const template = require<string>('./nodeconfig.tpl');

/** @ngInject */
export function nodeConfig(): ng.IDirective {
    return {
        restrict: 'E',
        template: template,
        scope: {
            config: '='
        },
        controller: NodeConfigController,
        controllerAs: 'vm',
        bindToController: true
    };
}

/** @ngInject */
export class NodeConfigController  implements angular.IController {
    config: any;
    num_properties: number;

    constructor() {
        ;
    }

    $onInit() {
        this.num_properties = Object.keys(this.config).length;
    }

    typeOf(o: any) {
        if (Array.isArray(o)) {
            return 'list';
        }

        if (o === null) {
            return 'null';
        }

        return typeof (o);
    }
}
