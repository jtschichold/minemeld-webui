import * as angular from 'angular';

import { IMinemeldPrototypeService, IMinemeldPrototype } from '../../app/services/prototype';

import './prototypes.style';

export class PrototypesController  implements angular.IController {
    MinemeldPrototypeService: IMinemeldPrototypeService;
    toastr: any;
    $scope: angular.IScope;
    $compile: angular.ICompileService;
    $state: angular.ui.IStateService;
    $sce: angular.ISCEService;
    DTColumnBuilder: any;
    DTOptionsBuilder: any;

    dtPrototypes: any = {};
    dtColumns: any[];
    dtOptions: any;

    /** @ngInject */
    constructor(toastr: any,
        MinemeldPrototypeService: IMinemeldPrototypeService,
        $scope: angular.IScope, DTOptionsBuilder: any,
        DTColumnBuilder: any, $sce: angular.ISCEService,
        $compile: angular.ICompileService, $state: angular.ui.IStateService) {
        this.MinemeldPrototypeService = MinemeldPrototypeService;
        this.toastr = toastr;
        this.$scope = $scope;
        this.$sce = $sce;
        this.DTColumnBuilder = DTColumnBuilder;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.$compile = $compile;
        this.$state = $state;

        this.setupPrototypesTable();
    }

    $onInit() {}

    public go(newstate: string) {
        this.$state.transitionTo('nodedetail', { nodename: newstate });
    }

    private setupPrototypesTable() {
        let vm: PrototypesController = this;

        this.dtOptions = this.DTOptionsBuilder.fromFnPromise(() => {
            var $p: any = this.MinemeldPrototypeService.getPrototypeLibraries()
                .then((result: any) => {
                    var l, p: string;
                    var curlibrary, curprototype: any;
                    var nt, author, ds: string;
                    var its, tags: string[];
                    var rprotos: any = [];

                    for (l in result) {
                        if (!result.hasOwnProperty(l)) {
                            continue;
                        }
                        curlibrary = result[l];

                        if (!curlibrary || !curlibrary.prototypes) {
                            continue;
                        }

                        for (p in curlibrary.prototypes) {
                            if (!curlibrary.prototypes.hasOwnProperty(p)) {
                                continue;
                            }
                            curprototype = curlibrary.prototypes[p];

                            nt = '';
                            if (curprototype.node_type) {
                                nt = curprototype.node_type;
                            }

                            its = [];
                            if (curprototype.indicator_types) {
                                its = curprototype.indicator_types;
                            }

                            tags = [];
                            if (curprototype.tags) {
                                tags = curprototype.tags;
                            }

                            author = undefined;
                            if (curprototype.author) {
                                author = curprototype.author;
                            }

                            ds = '';
                            if (curprototype.development_status) {
                                ds = curprototype.development_status;
                            }

                            rprotos.push({
                                name: l + '.' + p,
                                prototypeName: p,
                                libraryName: l,
                                developmentStatus: ds,
                                nodeType: nt,
                                indicatorTypes: its,
                                tags: tags,
                                libraryDescription: curlibrary.description,
                                prototypeDescription: curprototype.description,
                                author: author
                            });
                        }
                    }

                    return rprotos;
                })
                .catch((error: any) => {
                    this.toastr.error('ERROR RETRIEVING PROTOTYPES LIBRARIES:' + error.status);
                });

            return $p;
        })
        .withBootstrap()
        .withPaginationType('simple_numbers')
        .withOption('aaSorting', [])
        .withOption('aaSortingFixed', [])
        .withOption('stateSave', true)
        .withOption('lengthMenu', [[50, -1], [50, 'All']])
        .withOption('createdRow', (row: HTMLScriptElement, data: any) => {
            var c: string;
            var fc: HTMLElement;
            var j: number;

            row.className += ' nodes-table-row';

            fc = <HTMLElement>(row.childNodes[0]);
            fc.className += ' ' + c;

            for (var j = 0; j < row.childNodes.length; j++) {
                fc = <HTMLElement>(row.childNodes[j]);
                fc.setAttribute('ng-click', 'vm.$state.go("prototypedetail", {libraryName: "' + data.libraryName + '", prototypeName: "' + data.prototypeName + '"})');
            }

            this.$compile(<any>angular.element(row).contents())(this.$scope);
        })
        .withLanguage({
            'oPaginate': {
                'sNext': '>',
                'sPrevious': '<'
            }
        })
        ;

        this.dtColumns = [
            this.DTColumnBuilder.newColumn('name').withTitle('NAME').renderWith(function(data: any, type: any, full: IMinemeldPrototype) {
                var r: string;
                var sname: string;
                var iconclass, labelclass: string;

                iconclass = 'glyphicon glyphicon-user';
                labelclass = 'prototypes-label-unk';

                if (full.author) {
                    iconclass = 'mm-community';
                    labelclass = 'prototypes-label-community';
                    if (full.author === 'MineMeld Core Team') {
                        iconclass = 'mm-minemeld';
                        labelclass = 'prototypes-label-minemeld';
                    }
                }

                sname = vm.$sce.getTrustedHtml(data);
                r = '<div tooltip="' + sname + '" class="prototypes-name"><span class="label ' + labelclass + ' mm-label"><i class="' + iconclass + '"></i></span> ';
                r += sname;
                r += '</div>';

                if (full.author) {
                    r += '<div class="prototypes-author">' + vm.$sce.getTrustedHtml(full.author.toUpperCase()) + '</div>';
                }

                return r;
            }),
            this.DTColumnBuilder.newColumn('nodeType').withTitle('TYPE').renderWith(function(data: any, type: any, full: any) {
                var c: string;
                var v: string;

                if (data === 'miner') {
                    c = 'nodes-label-miner';
                    v = 'MINER';
                } else if (data === 'output') {
                    c = 'nodes-label-output';
                    v = 'OUTPUT';
                } else if (data === 'processor') {
                    c = 'nodes-label-processor';
                    v = 'PROCESSOR';
                } else {
                    c = 'label-default';
                    v = vm.$sce.getTrustedHtml(data);
                }

                return '<span class="label ' + c + '">' + v + '</span>';
            }),
            this.DTColumnBuilder.newColumn('indicatorTypes').withTitle('INDICATORS').renderWith(function(data: string[], type: any, full: any) {
                var r: string[] = [
                    '<div class="label-container">'
                ];

                angular.forEach(data, (itype: string) => {
                    r.push('<span class="label label-indicator-type">' + itype + '</span>');
                });

                r.push('</div>');

                return r.join(' ');
            }),
            this.DTColumnBuilder.newColumn(null).withTitle('DESCRIPTION').renderWith(function(data: any, type: any, full: any) {
                var r: string = '';

                if (full.developmentStatus === 'EXPERIMENTAL') {
                    r += '<div class="prototypes-author m-b-xs"><i class="text-danger glyphicon glyphicon-warning-sign"></i> <span class="text-danger">EXPERIMENTAL</span></div>';
                }

                if (full.libraryDescription) {
                    r += '<div class="m-b-xs"><strong>' + vm.$sce.getTrustedHtml(full.libraryName) + '</strong> ' + vm.$sce.getTrustedHtml(full.libraryDescription) + '</div>';
                }
                if (full.prototypeDescription) {
                    r += '<div><strong>' + vm.$sce.getTrustedHtml(full.libraryName) + '.' + vm.$sce.getTrustedHtml(full.prototypeName) + '</strong> ' + vm.$sce.getTrustedHtml(full.prototypeDescription) + '</div>';
                }

                if (full.tags.length !== 0) {
                    r += '<div class="prototypes-author m-t-xs">TAGS</div>';
                    r += '<div class="label-container">';
                    angular.forEach(full.tags, (tag: string) => {
                        r += '<span class="label tag-prototype">' + vm.$sce.getTrustedHtml(tag) + '</span> ';
                    });
                    r += '</div>';
                }

                return r;
            }),
            this.DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(function(data: any, type: any, full: any) {
                return '<span class="prototypes-table-chevron glyphicon glyphicon-chevron-right"></span>';
            }).withOption('width', '30px').withClass('prototypes-chevron-td')
        ];
    }
}
