import { IMineMeldExtensionsService, IMineMeldExtension } from './extensions';
import { IMineMeldAPIService } from './minemeldapi';

import { forEach } from 'angular';

export interface IMineMeldWebUIExtensionsLoaderService {
}

export class MineMeldWebUIExtensionsLoaderService implements IMineMeldWebUIExtensionsLoaderService {
    MineMeldAPIService: IMineMeldAPIService;
    MineMeldExtensionService: IMineMeldExtensionsService;
    toastr: any;
    $ocLazyLoad: any;

    /** @ngInject */
    constructor(MineMeldExtensionsService: IMineMeldExtensionsService,
                MineMeldAPIService: IMineMeldAPIService,
                $ocLazyLoad: any,
                toastr: any) {
        this.MineMeldExtensionService = MineMeldExtensionsService;
        this.MineMeldAPIService = MineMeldAPIService;
        this.toastr = toastr;
        this.$ocLazyLoad = $ocLazyLoad;

        this.MineMeldAPIService.onLogin(this.loadWebUIExtensions.bind(this));
        if (this.MineMeldAPIService.isLoggedIn()) {
            this.loadWebUIExtensions();
        }
    }

    private loadWebUIExtensions(): void {
        this.MineMeldExtensionService.list(false).then((extensions: IMineMeldExtension[]) => {
            var webuiExtensions: string[] = [];

            extensions.forEach((extension: IMineMeldExtension) => {
                if (!extension.entry_points) {
                    return;
                }

                if (!('minemeld_webui' in extension.entry_points)) {
                    return;
                }

                forEach((<Object>extension.entry_points['minemeld_webui']), (value: any, key: string) => {
                    webuiExtensions.push(key);
                });
            });

            webuiExtensions.forEach((extname: string) => {
                this.$ocLazyLoad.load('/extensions/webui/' + extname + '/extension.js', { cache: false }).then(() => {
                    console.log('Loaded ' + extname + ' extension');
                });
            });
        }, (error: any) => {
            if (this.MineMeldAPIService.isLoggedIn()) {
                this.toastr.error('ERROR RETRIEVING MINEMELD EXTENSIONS: ' + error.statusText);
            }
        });
    }
}
