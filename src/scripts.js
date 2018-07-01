$(function () {
    $('#side-menu').metisMenu({toggle: false});
})

$(function () {
    $(window).bind('load resize', function () {
        $('div.navbar-collapse').addClass('collapse')
    })
})