(function (window, $, undefined) {
    "use strict";

    if (typeof $ !== "function") {
        throw new Error("jQuery is required in order to hover-time works");
    }

    var _defaultOptons = {
        time: 5 * 1000,
        callback: function () {}
    };

    function hoverTime(element, options) {

        options = $.extend({}, _defaultOptons, options);

        // dinding events
        element.on('hover-time', options.callback.bind(element));

        element.on('mouseenter.hover-time', function (event) {
            // retriving if there was a timeout
            element.hoverTimeout = element.data('hover-timeout');

            // if timeout was not setted, will set it
            element.hoverTimeout = element.hoverTimeout || setTimeout(function () {
                console.log("triggering after " + options.time);
                element.trigger('hover-time');
            }, options.time);

            // saving timeout
            element.hoverTimeout = element.data('hover-timeout', element.hoverTimeout);

        }).on('mouseleave.hover-time', function (event) {
            // retriving if there was a timeout
            element.hoverTimeout = element.data('hover-timeout');

            // if was set delete it
            if (element.hoverTimeout) {
                clearTimeout(element.hoverTimeout);
                delete element.hoverTimeout;
            }

            // removing from element
            element.hoverTimeout = element.removeData('hover-timeout');
        });

        element.data('hover-time-setted', true);
    }

    var methods = {
        remove: function () {
            this.off(".hover-time").removeData('hover-time-setted').removeData('hover-timeout');
        }
    };

    $.fn.hoverTime = function hoverTimePlugin(options) {

        if (!this.data('hover-time-setted')) {

            if (typeof options === "function") {
                options = {
                    callback: options
                };
            }

            // getting options form dom
            options = $.extend({}, this.data('hover-time'), {
                time: this.data("hover-time-time")
            }, options);

            this.each(function (indx,item) {
                hoverTime($(item), options);
            });

        } else {
            if (methods[options]) {
                methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }

    };

    $.hoverTime = function hoverTimeMultiple(elements, options) {
        $(document).ready(function ready() {
            elements.forEach(function iteration(item) {
                $(item).hoverTime(options);
            });
        });
    };




}(this, this.jQuery));
