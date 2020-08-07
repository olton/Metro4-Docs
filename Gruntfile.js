module.exports = function(grunt) {

    "use strict";

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['build']
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: ['public_html/css/*.css', 'public_html/examples/**/*.css']
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'public_html',
                src: "**",
                dest: "build/"
            }
        },

        replace: {
            adsense: {
                options: {
                    patterns: [
                        {
                            match: /<!-- ads-html -->/g,
                            replacement: '\n' +
                                '<!-- Metro UI - Responsive 1 -->\n' +
                                '<ins class="adsbygoogle"\n' +
                                '     style="display:block"\n' +
                                '     data-ad-client="ca-pub-1632668592742327"\n' +
                                '     data-ad-slot="8347181909"\n' +
                                '     data-ad-format="auto"' +
                                '     data-full-width-responsive="true"></ins>\n' +
                                '<script>\n' +
                                '(adsbygoogle = window.adsbygoogle || []).push({});\n' +
                                '</script>'
                        },
                        {
                            match: /<!-- ads-script -->/g,
                            replacement: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
                        },
                        {
                            match: /<!-- ga-script -->/g,
                            replacement: '<!-- Global site tag (gtag.js) - Google Analytics -->\n' +
                                '<script async src="//www.googletagmanager.com/gtag/js?id=UA-84808651-2"></script>\n' +
                                '<script>\n' +
                                '  window.dataLayer = window.dataLayer || [];\n' +
                                '  function gtag(){dataLayer.push(arguments);}\n' +
                                '  gtag(\'js\', new Date());\n' +
                                '\n' +
                                '  gtag(\'config\', \'UA-84808651-2\');\n' +
                                '</script>\n'
                        },
                        // {
                        //     match: /<!-- ads-script -->/g,
                        //     replacement: '<script data-ad-client="ca-pub-1632668592742327" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
                        // },
                        {
                            match: /<!-- buy-me-coffee -->/g,
                            replacement: '<div class="text-center mt-8"><a href="https://www.buymeacoffee.com/pimenov"><img src="images/buy-me-coffee.png" alt="Buy me a coffee"></a></div>'
                        },
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/*.html'], dest: 'build/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'postcss',
        'copy',
        'replace'
    ]);

};