import { IMineMeldCurrentUserService } from '../services/currentuser';

export class AboutController  implements angular.IController {
    MineMeldCurrentUserService: IMineMeldCurrentUserService;

    /** @ngInject */
    constructor(MineMeldCurrentUserService: IMineMeldCurrentUserService) {
        this.MineMeldCurrentUserService = MineMeldCurrentUserService;
    }

    $onInit() {}
}
