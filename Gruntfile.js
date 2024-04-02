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
                        // {
                        //     match: /<!-- umami -->/g,
                        //     replacement: `<script async defer data-website-id="095e47f0-c18a-4c8f-a29f-c96562032f3a" src="https://umami-jade.vercel.app/umami.js"></script>`
                        // },
                        {
                            match: /<!-- umami -->/g,
                            replacement: `
    <!-- hit.ua -->
    <a href='http://hit.ua/?x=37262' target='_blank'>
    <script language="javascript" type="text/javascript"><!--
    Cd=document;Cr="&"+Math.random();Cp="&s=1";
    Cd.cookie="b=b";if(Cd.cookie)Cp+="&c=1";
    Cp+="&t="+(new Date()).getTimezoneOffset();
    if(self!=top)Cp+="&f=1";
    //--></script>
    <script language="javascript1.1" type="text/javascript"><!--
    if(navigator.javaEnabled())Cp+="&j=1";
    //--></script>
    <script language="javascript1.2" type="text/javascript"><!--
    if(typeof(screen)!='undefined')Cp+="&w="+screen.width+"&h="+
    screen.height+"&d="+(screen.colorDepth?screen.colorDepth:screen.pixelDepth);
    //--></script>
    <script language="javascript" type="text/javascript"><!--
    Cd.write("<sc"+"ript src='//c.hit.ua/hit?i=37262&g=0&x=3"+Cp+Cr+
    "&r="+escape(Cd.referrer)+"&u="+escape(window.location.href)+"'></sc"+"ript>");
    //--></script></a>
    <!-- / hit.ua -->                            
                            `
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