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
                                '     data-ad-format="auto"></ins>\n' +
                                '<script>\n' +
                                '(adsbygoogle = window.adsbygoogle || []).push({});\n' +
                                '</script>'
                        },
                        {
                            match: /<!-- ads-script -->/g,
                            replacement: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
                        }
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