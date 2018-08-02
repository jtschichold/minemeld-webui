interface IAdminTab {
    tooltip: string;
    icon: string;
    active: boolean;
    state: string;
}

export class AdminController  implements angular.IController {
    $state: angular.ui.IStateService;

    tabs: IAdminTab[] = [
        {
            tooltip: 'ADMINS',
            icon: 'fa fa-user',
            active: true,
            state: 'admin.users'
        },
        {
            tooltip: 'FEEDS USERS',
            icon: 'fa fa-circle',
            active: false,
            state: 'admin.fusers'
        }
    ];

    /** @ngInject */
    constructor($state: angular.ui.IStateService) {
        this.$state = $state;
    }

    $onInit() {}

    public select(state: string) {
        this.$state.go(state);
    }
}
