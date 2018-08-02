export const uiState: ng.ui.IState = {
    url: '/prototypeadd',
    template: require('./view.tpl'),
    controller: 'PrototypeAddController',
    controllerAs: 'vm',
    params: {
        prototype: {
            value: 'none'
        }
    }
};
