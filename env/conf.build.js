const glob = require('glob');
const bindPrefix = (name) => `node_modules/${name}`;

module.exports = {
    nodeControllers: glob.sync('./src/app/nodedetail/**.controller.ts')
        .filter(s => {
            return !s.startsWith('./src/app/nodedetail/node');
        })
        .map(s => {
            return s.replace('./src', '.');
        }),

    app_files: {
        js: [
            // easy pie chart
            './app/components/easypiechart/angular.easypiechart.js',

            // sankey
            './app/components/sankey/sankey.js',
            './app/components/sankey/mmsankey.js'
        ],

        scss: [
            ...glob.sync('./src/app/**/*.scss')
                .filter(s => !s.startsWith('./src/app/styles'))
                .map(s => s.replace('./src', '.'))
        ]
    },

    vendor_files: {
        css: [
            'angular-toastr/dist/angular-toastr.css',
            'angular-loading-bar/build/loading-bar.css',
            'components-font-awesome/css/font-awesome.css',
            'angular-datatables/dist/plugins/bootstrap/datatables.bootstrap.min.css',
            'nvd3/build/nv.d3.css',
            'ui-select/dist/select.css'
        ].map(bindPrefix),

        fonts: [
            'components-font-awesome/fonts/*',
            'bootstrap-sass/assets/fonts/bootstrap/*'
        ].map(bindPrefix)
    }
};
