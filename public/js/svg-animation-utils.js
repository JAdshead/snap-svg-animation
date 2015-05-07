
// Generall Animation funcitons
var spinObject = function (el,x,y,cx,cy,d,s, easing) {
  var rotation  = 0;
  var object    = el;
  var objectX   = x   || 0;
  var objectY   = y   || 0;
  var cX        = cx  || object.getBBox().cx;
  var cY        = cy  || object.getBBox().cy;
  var direction = d   || 1
  var speed     = s   || 2000
  var easeing   = easing || mina.linear

  var rotate1 = function(object){
    if (direction == 1){ rotation += 90 };
    if (direction == -1){ rotation -= 90 };
    object.animate({transform: "t"+objectX+","+objectY+",r"+rotation+","+cX+","+cY},speed,mina.linear, function(){ rotate2(object); });
  };
  var rotate2 = function(object){
    if (direction == 1){ rotation += 90 };
    if (direction == -1){ rotation -= 90 };
    object.animate({transform: "t"+objectX+","+objectY+",r"+rotation+","+cX+","+cY},speed,mina.linear, function(){ rotate1(object); });
  };
  rotate1(object);
};


var hollow = function (el) {
  el.animate({fill:"#000", stroke: "#fff"},200, mina.easein);
};

var pulsateObject = function(object) {
  var shrinkObject = function (object) { 
    if (pulsateObject.running == true) {
      var centerX = object.getBBox().cx;
      var centerY = object.getBBox().cy;
      object.animate({transform:"S0.96,"+centerX+","+centerY}, 400,mina.easeinout, function(){ growObject(object); });
    };
  };
  
  var growObject = function (object) {
    if (pulsateObject.running == true) {
      var centerX = object.getBBox().cx;
      var centerY = object.getBBox().cy;
      object.animate({transform:"S1.04,"+centerX+","+centerY}, 350,mina.easeinout, function(){shrinkObject(object)});
    };
  };
  growObject(object); 
};

