import './options.style';

const template = require<string>('./options.tpl');

/** @ngInject */
export function minemeldOptions(): ng.IDirective {
    return {
        restrict: 'E',
        template: template,
        bindToController: true,
        transclude: true,
        link: function(scope: any, element: JQuery, attr: ng.IAttributes) {
            var divCtr: JQuery = element.children('.minemeld-options').children('div');

            element.find('.minemeld-options-knob').bind('click', function() {
                divCtr.toggleClass('minemeld-options-show');
            });
        }
    };
}
