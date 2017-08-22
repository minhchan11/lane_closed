$(document).ready(function () {

  for (var i = 1; i < 4; i++) {
    $("#closure"+i).slider({
  	min: 0,
  	max: 24,
  	value: [1+i, 7+i],
  	labelledby: ['closure1_low', 'closure1_high']
  });
  }

})
