export const uiState: ng.ui.IState = {
    url: '/prototypes/:libraryName/:prototypeName',
    template: require('./view.tpl'),
    controller: 'PrototypedetailController',
    controllerAs: 'vm'
};
