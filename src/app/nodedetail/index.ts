export const baseState: ng.ui.IState = {
    url: '/nodes/:nodename',
    template: require('./view.tpl'),
    controller: 'NodeDetailController',
    controllerAs: 'nodedetail'
};

export const statsState: ng.ui.IState = {
    template: require('./view.stats.tpl'),
    controller: 'NodeDetailStatsController',
    controllerAs: 'nodedetailstats'
};

export const infoState: ng.ui.IState = {
    template: require('./view.info.tpl'),
    controller: 'NodeDetailInfoController',
    controllerAs: 'nodedetailinfo'
};

export const graphState: ng.ui.IState = {
    template: require('./view.graph.tpl'),
    controller: 'NodeDetailGraphController',
    controllerAs: 'vm'
};
