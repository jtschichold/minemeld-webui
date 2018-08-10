import { IMineMeldAPIService } from './services/minemeldapi';
import { TransitionService } from '@uirouter/angularjs';

/** @ngInject */
export function minemeldInit($state: angular.ui.IStateService,
                             $rootScope: angular.IRootScopeService,
                             $transitions: TransitionService,
                             MineMeldAPIService: IMineMeldAPIService) {
    document.getElementById('loader').style.display = 'none';

    $rootScope.mmBack = (state?: string) => {
        if (($rootScope.mmPreviousState) && (!$rootScope.mmPreviousState.state.abstract)) {
            $state.go($rootScope.mmPreviousState.state, $rootScope.mmPreviousState.params);
            return;
        }

        $state.go(state);
        return;
    };

    $transitions.onStart({}, transition => {
        if (transition.to().name !== 'login' && !MineMeldAPIService.isLoggedIn()) {
            return transition.router.stateService.target('login');
        }

        transition.promise.then(
            () => {
                $rootScope.mmPreviousState = {
                    state: transition.from(),
                    params: transition.to()
                };

                MineMeldAPIService.cancelAPICalls();
            }
        )
    });
}
