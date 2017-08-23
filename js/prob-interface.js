$(document).ready(function () {

  var lanesClosure = new Array(3);
  for (var i = 1; i < 4; i++) {
    $('#closure'+i).slider({
  	min: 0,
  	max: 24,
  	value: [1+i, 7+i],
  	labelledby: ['closure1_low', 'closure1_high']
  });

  $("#closure" + i).on("slide", function(slideEvt) {
    var timeRange = (slideEvt.currentTarget.value).split(",");
    $("#" + slideEvt.currentTarget.id.replace("closure","closureTime_")).text("Begins: "+ timeRange[0] + " Ends: " + timeRange[1])
    });

  $("#setClosure_"+i).unbind('click').on('click',function () {
    var currentNumber = $(this)[0].id.split("_").pop();
    lanesClosure[currentNumber-1]=$("#closure"+currentNumber).val();
  });

  }

})
