$(function() {
    "use strict";

    var form = $(".need-validation");
    form.on("submit", function(event) {
        event.preventDefault();
        event.stopPropagation();
    }, false);

    $.each($("pre"), function(){
        var pre = $(this);
        pre.prepend($("<button>").addClass("button square copy-button rounded").attr("title", "Copy").html("<span class='mif-copy'></span>"));
    });

    hljs.initHighlightingOnLoad();

    new Clipboard('.copy-button', {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });

    Metro.utils.cleanPreCode("pre code, textarea");

    $.document().on("click", function(){
        var sidebar = Metro.getPlugin("#sidebar", "sidebar");
        if (sidebar.isOpen()) {
            sidebar.close();
        }
    });

    $(window).on("adblock-alert", function(){
        setTimeout(function(){
            Metro.createToast("At the moment, advertising is almost the only source of financing for the project. Please disable ad blocker!", null, null, "alert", {
                showTop: true,
                distance: 60,
                timeout: 5000
            });
        }, 2000);
    })
});

