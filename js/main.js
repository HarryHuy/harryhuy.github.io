var testimonials = [ 1, 2, 3 ];

var active = 1;

var canvas, ctx;

console.log("Hello o/");

// got this detectIE() from this amazing codepener
// you should check him out, https://codepen.io/gapcode/pen/vEJNZN
function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function init() {
    canvas = document.getElementById("sheet");

    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;

    ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grid();

    canvas.className = "fix visible";
}

function grid() {
    for (var i = 0; i <= canvas.width + 20; i += 20) {
        for (var j = 0; j < canvas.height; j += 20) {
            ctx.beginPath();
            ctx.arc(i, j, 3, 0, Math.PI * 2, false);
            ctx.fillStyle = "#E5E1EE";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function setListener(element) {
    element.addEventListener('click', function (event) {
        scroll(element);

        event.preventDefault();
    });
}

function scroll(element) {
    var to = document.getElementById(element.getAttribute("href").substring(1, element.getAttribute("href").length)).offsetTop;
    var duration = 400;

    doScroll(element, to, duration);
}

function doScroll(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - document.body.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        document.body.scrollTop = document.body.scrollTop + perTick;
        if (document.body.scrollTop == to) return;
        doScroll(element, to, duration - 10);
    }, 10);
}

function nicethings(state) {
    if (active == 0 && state =="previous")
        active = testimonials.length;
    else if (active == (testimonials.length - 1) && state =="next")
        active = -1;

    if (state == "previous")
        active--;
    else if (state == "next")
        active++;

    document.getElementById("testimonial" + testimonials[active]).checked = true;
}

document.getElementById("sheet").addEventListener("mousemove", function (event) {
    var xprime = event.clientX;
    var yprime = event.clientY;

    var xremainder = xprime % 20;
    var yremainder = yprime % 20;

    var x = (xremainder > 10) ? xprime + (20 - xremainder) : xprime - xremainder;
    var y = (yremainder > 10) ? yprime + (20 - yremainder) : yprime - yremainder;

    ctx.restore();

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = "#FF1654";
    ctx.fill();
    ctx.closePath();
});

window.onload = function () {
    var elems = document.getElementsByTagName("a");
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].hasAttribute("anchor")) {
            if (elems[i].getAttribute("anchor")) setListener(elems[i]);
        }
    }

    isIE = detectIE();
    if (isIE === false) {
        document.getElementById("nicethingslist").className += "ed";

        document.getElementById("nicethingsbtn").style.display = "block";

        document.getElementById("nicethingsprv").addEventListener('click', function () { nicethings("previous") });
        document.getElementById("nicethingsnxt").addEventListener('click', function () { nicethings("next") });
    } else console.log("Sorry! The fancy nice things list is not available for you; this is due to it being laggy and not rendering right on IE and Edge.");

    init();
}

window.onresize = function () {
    init();
}