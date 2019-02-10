var $ = {};

/*========================================
                         Utility
                         ========================================*/

$.PI = Math.PI;
$.TAU = $.PI * 2;

$.rand = function (min, max) {
	if (!max) {
		var max = min;
		min = 0;
	}
	return Math.random() * (max - min) + min;
};

/*========================================
   Initialize
   ========================================*/

$.init = function () {
	$.c = document.querySelector('canvas');
	$.ctx = $.c.getContext('2d');
	$.simplex = new SimplexNoise();
	$.events();
	$.reset();
	$.loop();
};

/*========================================
   Reset
   ========================================*/

$.reset = function () {
	$.w = window.innerWidth*0.985;
	$.h = window.innerHeight*0.15;
	$.cx = $.w / 2;
	$.cy = $.h / 2;
	$.c.width = $.w;
	$.c.height = $.h;

	$.count = Math.floor($.w / 50);
	$.xoff = 0;
	$.xinc = 0.05;
	$.yoff = 0;
	$.yinc = 0.003;
	$.goff = 0;
	$.ginc = 0.003;
	$.y = $.h * 0.06;
	$.length = $.w + 10;
	$.amp = 40;
};

/*========================================
   Event
   ========================================*/

$.events = function () {
	window.addEventListener('resize', $.reset.bind(undefined));
};

/*========================================
   Wave
   ========================================*/

$.wave = function () {
	$.ctx.beginPath();
	var sway = $.simplex.noise2D($.goff, 0) * $.amp;
	for (var i = 0; i <= $.count; i++) {
		$.xoff += $.xinc;
		var x = $.cx - $.length / 2 + $.length / $.count * i;
		var y = $.y + $.simplex.noise2D($.xoff, $.yoff) * $.amp + sway;
		$.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
	}
	$.ctx.lineTo($.w, $.h);
	$.ctx.lineTo(0, $.h);
	$.ctx.closePath();
	$.ctx.fillStyle = 'hsla(210, 50%, 50%, 0.2)';
	$.ctx.fill();
};

/*========================================
   Loop
   ========================================*/

$.loop = function () {
	requestAnimationFrame($.loop);
	$.ctx.clearRect(0, 0, $.w, $.h);
	$.xoff = 0;
	$.wave();
	$.wave();
	$.wave();
	$.wave();
	$.yoff += $.yinc;
	$.goff += $.ginc;
};

/*========================================
   Start
   ========================================*/

$.init();

