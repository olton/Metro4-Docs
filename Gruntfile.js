module.exports = function(grunt) {

    "use strict";

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        alg: grunt.file.readJSON('.ftpauth')["algolia"],

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
                        // {
                        //     match: /<!-- ads-html -->/g,
                        //     replacement: ''+
                        //         '<!-- Metro UI - Responsive 1 -->\n' +
                        //         '<ins class="adsbygoogle"\n' +
                        //         '     style="display:block"\n' +
                        //         '     data-ad-client="ca-pub-1632668592742327"\n' +
                        //         '     data-ad-slot="8347181909"\n' +
                        //         '     data-ad-format="auto"' +
                        //         '     data-full-width-responsive="true"></ins>\n' +
                        //         '<script>\n' +
                        //         '(adsbygoogle = window.adsbygoogle || []).push({});\n' +
                        //         '</script>'
                        // },
                        // {
                        //     match: /<!-- ads-script -->/g,
                        //     replacement: '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>'
                        // },
                        {
                            match: /<!-- ga-script -->/g,
                            replacement: '<!-- Global site tag (gtag.js) - Google Analytics -->\n' +
                                `<!-- Global site tag (gtag.js) - Google Analytics -->\n`+
                                `<script async src="https://www.googletagmanager.com/gtag/js?id=G-VXGQBLEBHH"></script>
                                <script>
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());

                                    gtag('config', 'G-VXGQBLEBHH');
                                </script>`
                        },
                        {
                            match: /<!-- buy-me-coffee -->/g,
                            replacement: '<div class="text-center mt-8"><a href="https://www.buymeacoffee.com/pimenov"><img src="images/buy-me-coffee.png" alt="Buy me a coffee"></a></div>'
                        },
                        {
                            match: /<!-- umami -->/g,
                            replacement: `
                                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
                                <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
                                <script>
                                    window.addEventListener("load", () => {
                                        setTimeout(()=>{
                                            docsearch({
                                              container: '#docsearch',
                                              appId: alg.appId,
                                              indexName: alg.indexName,
                                              apiKey: alg.apiKey,
                                            });
                                        }, 1000)
                                    })
                                </script>
                            `
                            // <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3" onload="docsearch({appId: '90CHSLCJTV',apiKey: 'c0207161474ce182d44c10f16181304e',indexName: 'metroui-org',container: '#algolia-search',debug: false});"></script>
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