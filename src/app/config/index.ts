export const baseState: ng.ui.IState = {
    url: '/config',
    template: require('./view.tpl'),
    controller: 'ConfigController',
    controllerAs: 'vm'
};

export const addState: ng.ui.IState = {
    url: '/config/add',
    template: require('./configadd.view.tpl'),
    controller: 'ConfigAddController',
    controllerAs: 'vm',
    params: {
        prototype: {
            value: 'none'
        }
    }
};