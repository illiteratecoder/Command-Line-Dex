function b(i){
	function x(i){
		if (i < 10){
			setTimeout(function(){x(i+1)}, 100);
		}
		console.log(i);
	}
	setTimeout(function(){x(i)}, 0);
	(function(){console.log('x is done')})();
}
let v = 3;
b(v);