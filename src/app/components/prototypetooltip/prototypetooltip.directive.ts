import { IMinemeldPrototypeService, IMinemeldPrototypeLibrary } from '../../services/prototype';

import './prototypetooltip.style';

const template = require<string>('./prototypetooltip.tpl');

/** @ngInject */
export function prototypeTooltip(): ng.IDirective {
    return {
        restrict: 'E',
        template: template,
        scope: {
            name: '='
        },
        controller: PrototypeTooltipController,
        controllerAs: 'vm',
        bindToController: true
    };
}

export class PrototypeTooltipController  implements angular.IController {
    name: string;

    prototypeName: string;
    libraryName: string;
    prototypeDescription: string;
    libraryDescription: string;

    /** @ngInject */
    constructor(MinemeldPrototypeService: IMinemeldPrototypeService) {
        var toks: string[];

        toks = this.name.split('.');

        this.prototypeName = toks[1];
        this.libraryName = toks[0];

        MinemeldPrototypeService.getPrototypeLibrary(toks[0])
        .then((result: IMinemeldPrototypeLibrary) => {
            this.libraryDescription = result.description;

            this.prototypeDescription = result.prototypes[toks[1]].description;
        });
    }

    $onInit() {}
}
