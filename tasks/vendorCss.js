let args = require('yargs').argv;
let postcss = require('postcss');
let glob = require('glob');
let fs = require('fs');
let mkdirp = require('mkdirp');
let path = require('path');

let cssnano = require('cssnano');
let url = require('postcss-url');


let BUILD_CONFIG = require('../env/conf.build');

let cssFiles = BUILD_CONFIG.vendor_files.css.reduce((paths, currentPath) => {
    return paths.concat(glob.sync(currentPath));
}, []);

let cssFilesPromises = cssFiles.map(cssPath => {
    return postcss([cssnano])
        .use(url({
            url: asset => {
                if (path.dirname(asset.url).indexOf('font') === -1) {
                    return asset.url;
                }

                return path.join(
                    '/assets/fonts',
                    path.basename(asset.url)
                );
            }
        }))
        .process(
            fs.readFileSync(cssPath),
            {
                from: cssPath,
                to: path.basename(args.output),
                map: {
                    inline: true
                }
            }
        );
});

Promise.all(cssFilesPromises).then(
    processedCssFiles => {
        mkdirp(path.dirname(args.output), err => {
            if (err) {
                throw err;
            }

            fs.writeFile(args.output, processedCssFiles.map(lr => lr.css).join('\n'), err => {
                if (err) {
                    throw err;
                }
            });
        });
   },
   error => {
       throw error;
   }
);
