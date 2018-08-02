export const baseState: ng.ui.IState = {
    url: '/system',
    template: require('./view.tpl'),
    controller: 'SystemController',
    controllerAs: 'vm',
    abstract: true
};

export const dashboardState: ng.ui.IState = {
    url: '/dashboard',
    template: require('./dashboard.view.tpl'),
    controller: 'SystemDashboardController',
    controllerAs: 'vm'
};

export const extensionsState: ng.ui.IState = {
    url: '/extensions',
    template: require('./extensions.view.tpl'),
    controller: 'SystemExtensionsController',
    controllerAs: 'vm'
};
