let
    retina = window.devicePixelRatio,
    nameHolder = document.getElementById('to-name'), fromNameHolder = document.getElementById('from-name'),
    flakeCount = 450, mousemoveEffect = true;

let name = "ALL", fromName = "半圆";

document.title = 'Merry Christmas, ' + name + '!';

nameHolder.innerHTML = name;
fromNameHolder.innerHTML = fromName;

document.addEventListener("DOMContentLoaded", function () {
    goSnow();

});

// iProDev Snow Christmas! \o/
var goSnow = function () {
    (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 16);
            };
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    var flakes = [],
        canvas = document.getElementById("xmas"),
        ctx = canvas.getContext("2d"),
        parent = canvas.parentNode,
        mX = -300,
        mY = -300;

    flakeCount = parent.offsetWidth < 767 ? flakeCount / 3.5 : flakeCount,

        canvas.width = parent.offsetWidth * retina;
    canvas.height = parent.offsetHeight * retina;

    function snowFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 200 * retina,
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                dx = x2 - x,
                dy = y2 - y;

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist * retina,
                    ycomp = (y - y2) / dist * retina,
                    deltaV = force / 2 * retina;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;
            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }
                flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
            }

            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                reset(flake);
            }

            if (flake.x >= canvas.width || flake.x <= 0) {
                reset(flake);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(snowFrame);
    };

    function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = ((Math.random() * 3) + getRandomInt(2, 4)) * retina;
        flake.speed = ((Math.random() * 1) + 0.2) * retina;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.4;
    }

    function init() {
        for (var i = 0; i < flakeCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = Math.floor(Math.random() * canvas.height),
                size = ((Math.random() * 3) + getRandomInt(2, 4)) * retina,
                speed = ((Math.random() * 1) + 0.2) * retina,
                opacity = (Math.random() * 0.5) + 0.4;

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30,
                step: 0,
                opacity: opacity
            });
        }

        snowFrame();
    };

    if (mousemoveEffect) {
        document.addEventListener("mouseenter", function () {
            document.addEventListener("mousemove", function (e) {
                mX = (e.pageX - canvas.offsetLeft) * retina;
                mY = (e.pageY - canvas.offsetTop) * retina;
            });
        });

        document.addEventListener("mouseleave", function () {
            // document.removeEventListener("mousemove");
            mX = -300,
                mY = -300;
        });
    } else {
        canvas.style.pointerEvents = 'none';
    }

    window.addEventListener("resize", function () {
        canvas.width = parent.offsetWidth * retina;
        canvas.height = parent.offsetHeight * retina;
    });

    init();
};
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//Fullscreen API
(function () {
    fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function () {
            return false;
        },
        requestFullScreen: function () {
        },
        cancelFullScreen: function () {
        },
        fullScreenEventName: '',
        prefix: ''
    };
    var browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
            fullScreenApi.prefix = browserPrefixes[i];

            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function () {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                    break;
                case 'webkit':
                    return document.webkitIsFullScreen;
                    break;
                default:
                    return document[this.prefix + 'FullScreen'];
                    break;
            }
        };
        fullScreenApi.requestFullScreen = function (el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        };
        fullScreenApi.cancelFullScreen = function (el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        };
    }
}());