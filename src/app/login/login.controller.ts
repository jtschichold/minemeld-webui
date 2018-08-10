import ngRedux from 'ng-redux';

import { IMineMeldAPIService } from  '../../app/services/minemeldapi';
import { actions } from '../store';

import './login.style';

export class LoginController  implements angular.IController {
    username: string;
    password: string;

    checking: boolean = false;

    /** @ngInject */
    constructor(private $state: angular.ui.IStateService,
                private MineMeldAPIService: IMineMeldAPIService,
                private $ngRedux: ngRedux.INgRedux,
                private toastr: any) {}

    $onInit() {}

    public submit() {
        this.checking = true;
        this.MineMeldAPIService.logIn(this.username, this.password)
            .then((result: any) => {
                this.checking = false;

                this.$ngRedux.dispatch(actions.currentUser.login(this.username));

                this.$state.go('dashboard');
            }, (error: any) => {
                this.checking = false;
                this.toastr.error('ERROR CHECKING CREDENTIALS: ' + error.statusText);
                this.password = '';
                this.$ngRedux.dispatch(actions.currentUser.logout());
            });
    }
}
