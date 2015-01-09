$(function() {

    var heights = [];

    var getHeight = function(images, width) {
        width -= images.length * 5;
        var h = 0;
        for (var i = 0; i < images.length; ++i) {
            h += $(images[i]).data('width') / $(images[i]).data('height');
        }
        return width / h;
    };

    var setHeight = function(images, height) {
        heights.push(height);
        for (var i = 0; i < images.length; ++i) {
            $(images[i]).css({
                width: height * $(images[i]).data('width') / $(images[i]).data('height'),
                height: height
            });
            $(images[i]).attr('src', $(images[i]).attr('src').replace(/w[0-9]+-h[0-9]+/, 'w' + $(images[i]).width() + '-h' + $(images[i]).height()));
        }
    };

    var resize = function(images, width) {
        setheight(images, getheight(images, width));
    };

    var runset = function(max_height) {
        var size = window.innerWidth - 50;

        var n = 0;
        var images = $('img');
        var slice, h;
        w: while (images.length > 0) {
            for (var i = 1; i < images.length + 1; ++i) {
                slice = images.slice(0, i);
                h = getHeight(slice, size);
                if (h < max_height) {
                    setHeight(slice, h);
                    n++;
                    images = images.slice(i);
                    continue w;
                }
            }
            setHeight(slice, Math.min(max_height, h));
            n++;
            break;
        }
        console.log(n);
    };

    window.addEventListener('resize', function() {
        runset(200);
    });
    $(function() {
        runset(200);
    });

});
