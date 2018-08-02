export const baseState: ng.ui.IState = {
    abstract: true,
    url: '/admin',
    template: require('./view.tpl'),
    controller: 'AdminController',
    controllerAs: 'vm'
};

export const usersState: ng.ui.IState = {
    url: '/users',
    template: require('./view.users.tpl'),
    controller: 'AdminUsersController',
    controllerAs: 'vm'
};

export const fusersState: ng.ui.IState = {
    url: '/fusers',
    template: require('./view.fusers.tpl'),
    controller: 'AdminFUsersController',
    controllerAs: 'vm'
};