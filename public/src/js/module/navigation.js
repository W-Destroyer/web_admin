define([], function() {
    function initNav() {
        $(".navbar-nav .dropdown").on("mouseover", function() {
            $(this).addClass('open');
        }).on("mouseout", function() {
            $(this).removeClass('open');
        });
    }

    return initNav;
})