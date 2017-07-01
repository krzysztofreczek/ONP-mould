var nw = require('nw.gui');
var win = nw.Window.get();

var canvas = document.getElementById('canvas');
canvas.width = win.width;
canvas.height = win.height;

var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;

var ctx = canvas.getContext("2d");
var image = ctx.getImageData(0, 0, canvas.width, canvas.height);

var service = require('./services/mould');

initInterval();
initOnClicEvent();

function initInterval() {
    setInterval(function() {
        service.recalculate(image);
        ctx.putImageData(image, 0, 0);
    }, 100);
}

function initOnClicEvent() {
    canvas.addEventListener('click', function(event) {
        var x = event.pageX - canvasLeft;
        var y = event.pageY - canvasTop;
        service.setAsInfected(image.data, resolveDataIndex(x, y));
    }, false);
}

function resolveDataIndex(x, y) {
    return y * image.width * 4 + x * 4;
}