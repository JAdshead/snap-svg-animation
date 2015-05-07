$(function(){

  // SVG Main variables
  var paper = Snap("#paper").attr({fill: '#fff', 'font-size': '16px', "text-anchor":'middle'});
  var smallTextSize  = "15px";
  var headerTextSize = "1.35em"
  // SVG Shapes
  var largeTouchButtonIn  
  var largeTouchButtonOut

  paper.click(function(){
    animationScrollTo();
  });

  var initialiseSVG = function(){
    largeTouchButtonOut = paper.circle(0,0, 22).attr({stroke: "#fff", fill:"#000", strokeWidth: 2});
    largeTouchButtonIn  = paper.circle(0,0, 16).attr({fill:"#fff"});

    largeTouchButtonIn.addClass("ani-link");
    largeTouchButtonOut.addClass("ani-link");
    paper.group(largeTouchButtonOut,largeTouchButtonIn).attr({opacity: 0})
  };

  // The first stage of animation
  var stageOne = function(){ 

    var s1_one_in_circle  ;
    var s1_one_out_circle ;
    var s1_one_circle     ;
    var s1_one_circle_num ;
    var s1_one_circle_text;
    var s1_text           ;
    var s1_circle_group   ;
    var s1_step_one_clicked = false;
    
    var stepOne = function(){
      paper.clear();
      initialiseSVG();
      s1_one_in_circle    = largeTouchButtonIn.clone();
      s1_one_out_circle   = largeTouchButtonOut.clone();
      
      s1_one_circle       = paper.group(s1_one_out_circle, s1_one_in_circle);
      s1_one_circle_num   = paper.text(0.5, 7, "I").attr({'font-size': headerTextSize}).attr({fill: '#000'});
      s1_one_circle_text  = paper.group(s1_one_circle, s1_one_circle_num);
      
      s1_text             = paper.text(87,7,"Workshops").attr({'font-size': headerTextSize});
      

      s1_circle_group     = paper.group(s1_one_circle_text, s1_text).attr({opacity: 0});
      s1_circle_group.animate({opacity: 1}, 200,mina.easeout);
      s1_circle_group.addClass("ani-link")
      s1_circle_group.transform("T130,65");

      // Make circle pulsate
      pulsateObject.running = true;
      pulsateObject(s1_one_out_circle);
      
      
      s1_circle_group.click( function(){
        animationScrollTo();
        pulsateObject.running = false; 
        if(s1_step_one_clicked == false){
          stepTwo();
        }
        s1_step_one_clicked = true;
      });
    };
  
    var s1_line_out;
    var s1_circle_2;
    var s1_2_text  ;
    var step_two_g ;
    
    // draw next elements and animate to position
    var stepTwo = function(){
      s1_line_out = paper.path('M130,65').attr({stroke: "#fff", 'stroke-dasharray':"3, 3", 'stroke-dashoffset':'120'});
      s1_circle_2 = paper.circle(130,65, 5);
      s1_2_text   = paper.text(200,199, "We speak to your customers. We speak to you.").attr({opacity: 0.0, 'font-size': smallTextSize});
      step_two_g  = paper.group(s1_line_out, s1_circle_2, s1_2_text);
      step_two_g.insertBefore(s1_circle_group);
      s1_2_text.attr({"text-anchor":'middle'});

      s1_circle_2.animate({transform:"T-110,130"}, 1000,mina.easeinout, function(){
        hollow(s1_circle_2);
        s1_circle_2.animate({transform:"T-110,130, s2"},500,mina.easein, function(){});
        showText();
      });
      
      s1_line_out.animate({'path':"M130,65, L20,195" },1005,mina.easeinout, function(){});

      var showText = function(){
        s1_2_text.animate({opacity: 1},500,mina.easein, stepThree());
      };
      
    };
    
    var s1_line_out_3; 
    var s1_circle_3  ;   
    var s1_line_out_4; 
    var s1_circle_4  ;   
    var s1_text_4    ; 
    var step_3_group;

    var stepThree = function(){
      s1_line_out_3   = paper.path('M20,195').attr({stroke: "#fff", 'stroke-dasharray':"3, 3", 'stroke-dashoffset':'120'});
      s1_circle_3     = paper.circle(20,195, 5).attr({opacity: 0});
      s1_line_out_4   = paper.path('M200,345').attr({stroke: "#fff", 'stroke-dasharray':"3, 3", 'stroke-dashoffset':'120'});
      s1_circle_4     = paper.circle(200, 345, 5).attr({opacity: 0});
      s1_text_4       = paper.text(200,420, ["We understand the problems, ","the propositions, the challenges."]).attr({opacity: 0, 'font-size': smallTextSize});
      step_3_group = paper.group(s1_line_out_3, s1_circle_3, s1_line_out_4, s1_circle_4, s1_text_4);
      s1_text_4.selectAll('tspan').attr({x: '200px', dy: '1.2em'});
      // s1_text_4.transform("T"+ -(s1_text_4.getBBox().cx-s1_text_4.getBBox().x)+",0");

      s1_line_out_3.insertBefore(s1_circle_2);

      s1_line_out_3.animate({path:"M20,195, L200,345"},1000,mina.easeinout);
      s1_circle_3.animate({opacity: 1},200, mina.easeinout);
      s1_circle_3.animate({transform:"t180,150"}, 1000,mina.easeinout, function(){
        hollow(s1_circle_3);
        s1_circle_3.animate({transform:"t180,150, s4"},200,mina.easeinout,function(){
          paper.group(s1_line_out_4,s1_circle_4).insertBefore(s1_circle_3);
          s1_circle_4.animate({opacity: 1},200,mina.easeinout);
          s1_circle_4.animate({transform:"T0,60"},1000,mina.easeinout);
          s1_line_out_4.animate({path:"M200,345, L200,400"},1000, mina.easeinout, function(){
            s1_text_4.animate({opacity: 1},400,mina.easeinout, function(){   stepFour();     });
          });
        });
      });
    };


    var s1_circle_out_end;
    var s1_circle_end;
    var s1_circle_end_group;
    var stage_one_group;

    var stepFour = function(){

      s1_circle_out_end = largeTouchButtonOut.clone().attr({opacity: 0});
      s1_circle_end     = largeTouchButtonIn.clone().attr({opacity: 0});
      s1_circle_end_group = paper.group(s1_circle_out_end,s1_circle_end).transform('t200,500').addClass("ani-link");

      s1_circle_end.animate({opacity: 1}, 1000,mina.easeinout);
      s1_circle_out_end.animate({opacity: 1}, 500,mina.easeinout, function(){
        pulsateObject.running = true;
        pulsateObject(s1_circle_out_end);
      });

      stage_one_group = paper.group(step_two_g, step_3_group, s1_circle_group);
      s1_circle_end_group.click(function(){
        pulsateObject.running = false;
        stage_one_group.animate({transform:"t0,-260",opacity: 0},600, mina.easeinout);

        s1_circle_end_group.animate({transform: "t200,240"},600,mina.easeinout, function(){
          s1_circle_end_group.animate({transform: "t200, 240"}, 350,mina.easeinout, function(){
            stepFive();
          });
        });
      });
    };


    var distill_texture           ;
    var distill_innerCircle       ;
    var distill_outerRing         ;
    var distill_innerCircleCenter ;
    var distill_innerCircleCurve  ;
    var distill_group             ;
    
    var stepFive = function(){
      distill_texture             = paper.group().attr({opacity: 0});
      distill_innerCircle         = paper.group().attr({opacity: 0});
      distill_outerRing           = paper.group().attr({opacity: 0});
      distill_innerCircleCenter   = paper.group();
      distill_innerCircleCurve    = paper.group();
      distill_group               = paper.group(distill_texture, distill_innerCircle, distill_outerRing);

      Snap.load("/svgs/distiller.svg", function(f){
        distill_texture.append(f.selectAll("#circleTexture"));       
        distill_innerCircle.append(f.selectAll("#innerCircle"));      
        distill_outerRing.append(f.selectAll("#outerRing"));        
        distill_innerCircleCenter.append(f.selectAll("#innerCircleCenter"));
        distill_innerCircleCurve.append(f.selectAll("#innerCircleCurve")); 
      });

      distill_group.transform("t139,180 s0.6");
      distill_texture.transform("t200,0");
      distill_outerRing.transform("t-200,0");
      // create hidden circle to help center rotation
      distill_innerCircle.append(paper.circle(101,100,30).attr({fill:"none"}))

      s1_circle_out_end.animate({opacity: 0},200,mina.easeinout, function(){ 
        s1_circle_end_group.animate({transform:"t200,240, s0.6"}, 200,mina.easeinout, function(){
          // s1_circle_end.animate({opacity: 0.5},200);
          distill_innerCircle.animate({opacity: 1}, 1000,mina.easeinout, function(){
            spinObject(distill_innerCircle,0,0,distill_innerCircle.getBBox().cx, distill_innerCircle.getBBox().cy,  1,3000);
            stepSix();
          });
        }); 
      });  
    };


    var stepSix = function(){
      distill_texture.animate({opacity: 1}, 1000, mina.easeinout);
      spinObject(distill_outerRing,-200,0,99,99, -1, 4000);
      spinObject(distill_texture,200,0,101,100, 1, 4000);

      distill_outerRing.animate({opacity: 1}, 1000, mina.easeinout, function(){
        
        distill_outerRing.stop();
        distill_texture.stop();

        spinObject(distill_outerRing,0,0,99,99, -1, 1000);
        spinObject(distill_texture,0,0,101,100, 1, 1000);

        stepSeven();
      });
    };


    var s1_text_5;

    var s2_circle_out;     
    var s2_circle_in ;    
    var s2_two_circle ;     
    var s2_two_circle_num;  
    var s2_two_group;
    var s2_title_text;

    var s1_start_circle_in;
    var s1_start_circle_out;
    var s1_start_circle;
    var s1_start_circle_num;
    var s1_start_circle_group;


    var stepSeven = function(){
      s1_text_5 = paper.text(200,350, ["We distill the results of our findings","and develop insights that inform our","creative solutions."]).attr({opacity: 0, "text-anchor":'middle'});
      s1_text_5.selectAll('tspan').attr({x: '195px', dy: '1.2em'});

      // s1_text_5.transform("T"+ -(s1_text_5.getBBox().cx-s1_text_5.getBBox().x)+",0");

      s2_circle_out       = largeTouchButtonOut.clone()
      s2_circle_in        = largeTouchButtonIn.clone()
      s2_two_circle       = paper.group(s2_circle_out, s2_circle_in).transform("t200,500");
      s2_two_circle_num   = paper.text(200, 507, "II").attr({'font-size': headerTextSize}).attr({fill: '#000'});
      s2_two_group        = paper.group(s2_two_circle,s2_two_circle_num).attr({opacity: 0}).addClass("ani-link");

      s1_one_in_circle    = largeTouchButtonIn.clone()
      s1_one_out_circle   = largeTouchButtonOut.clone()
      s1_one_circle_text  = paper.text(0.5, 6, "I").attr({'font-size': headerTextSize}).attr({fill: '#000'});
      s1_one_circle       = paper.group(s1_one_out_circle, s1_one_in_circle);

      s1_circle_group     = paper.group(s1_one_circle, s1_one_circle_num).addClass("ani-link");
      s1_circle_group.transform("t130,65").attr({opacity: 0});
      
      s1_text_5.animate({},500,mina.easeinout, function(){
        s1_text_5.animate({opacity: 1},1000,mina.easeinout, function(){
          s1_text_5.animate({},2000,mina.easeinout, function(){
            s2_two_group.animate({opacity: 1},2000,mina.easeinout);
            s1_circle_group.animate({opacity: 1}, 2000,mina.easeinout);
          });
        });
      });
      
      pulsateObject.running = true;
      pulsateObject(s1_one_out_circle);
      pulsateObject(s2_circle_out);
      

      s2_two_group.click(function(){
        pulsateObject.running = false;
        paper.group(distill_group, s1_text_5,s2_two_group,s1_circle_end_group,s1_circle_group).animate({transform: "t0,-430"}, 1000,mina.easeinout, function(){
          stageTwo();
        }); 
      });

      s1_circle_group.click(function(){
        pulsateObject.running = false;
        paper.group(distill_group, s1_text_5,s2_two_group,s1_circle_end_group, s1_circle_group).animate({opacity: 0}, 500,mina.easeinout, function(){
          stepOne();
          s1_circle_group.animate({}, 1100,mina.easeinout, function(){
            stepTwo();
          });
        }); 
      });

    };

    // start stage by calling first step
    stepOne();
    // stepSeven();
  };

  var stageTwo = function(){
    var s2_circle_out;     
    var s2_circle_in ;    
    var s2_two_circle ;     
    var s2_two_circle_num;  
    var s2_two_group;
    var s2_title_text;

    var stepOne = function(){
      paper.clear();
      initialiseSVG();
      s2_circle_out       = largeTouchButtonOut.clone()
      s2_circle_in        = largeTouchButtonIn.clone()
      s2_two_circle       = paper.group(s2_circle_out, s2_circle_in).transform("t200,70");
      s2_two_circle_num   = paper.text(200, 77, "II").attr({'font-size': headerTextSize}).attr({fill: '#000'});
      s2_title_text       = paper.text(200,120,"A creative partnership").attr({'font-size': headerTextSize, opacity: 0, "text-anchor":'middle'});
      s2_two_group        = paper.group(s2_two_circle,s2_two_circle_num, s2_title_text).addClass("ani-link");
      // s2_title_text.transform("T"+ -(s2_title_text.getBBox().cx-s2_title_text.getBBox().x)+",0");


      s2_title_text.animate({opacity: 1}, 1000,mina.easeinout, function(){
        stepTwo();
      });  


    };


    var s2_circle_1;
    var s2_circle_1_in
    var s2_circle_path;

    var s2_circle_2;
    var s2_circle_2_in;
    var s2_circle_2_path;

    var s2_text_1;
    var s2_text_2;
    var step_two_group;

    var stepTwo = function(){
      
      s2_circle_path  = paper.path('M30,170').attr({stroke: "#fff", 'stroke-dasharray':"3, 3", 'stroke-dashoffset':'120'});
      s2_circle_2_path  = paper.path('M370,170').attr({stroke: "#fff", 'stroke-dasharray':"3, 3", 'stroke-dashoffset':'120'});
      s2_circle_1     = paper.circle(30,170, 10).attr({fill:"#fff"});
      s2_circle_1_in  = paper.circle(30,170, 5).attr({fill:"#fff"});
      s2_circle_1_in.insertBefore(s2_circle_1);
      
      s2_circle_2     = paper.circle(370,170, 10).attr({fill:"#fff"});
      s2_circle_2_in  = paper.circle(370,170, 5).attr({fill:"#fff"});
      s2_circle_2_in.insertBefore(s2_circle_2);

      s2_text_1 = paper.text(200,150, ["We work collaboratively throughout","the creative process."]).attr({opacity: 0, 'font-size': smallTextSize});
      s2_text_1.selectAll('tspan').attr({x: '200px', dy: '1.2em'});
      // s2_text_1.transform("T"+ -(s2_text_1.getBBox().cx-s2_text_1.getBBox().x)+",0");

      s2_text_2 = paper.text(200,335, ["We develop ideas quickly and iterate often."]).attr({opacity: 0, 'font-size': smallTextSize});
      s2_text_2.selectAll('tspan').attr({x: '200px', dy: '1.2em'});
      // s2_text_2.transform("T"+ -(s2_text_2.getBBox().cx-s2_text_2.getBBox().x)+",0");

      
      s2_circle_1.animate({fill:"#000", stroke:"#fff"}, 1000,mina.easeinout,function(){
        s2_text_1.animate({opacity: 1}, 200,mina.easeinout);
        s2_circle_path.animate({path: 'M30,170 L200,250' }, 1000,mina.easeinout);
        s2_circle_1_in.animate({transform: "t170,80"},1000,mina.easeinout, function(){  
          s2_circle_1_in.animate({opacity: 0}, 200,mina.easeinout, function(){
          });
        });
      });

      
      s2_circle_2.animate({fill:"#000", stroke:"#fff"}, 1000,mina.easeinout, function(){
        s2_circle_2_path.animate({path: 'M370,170 L200,250' }, 1000,mina.easeinout);
        s2_circle_2_in.animate({transform: "t-170,80"},1000,mina.easeinout, function(){
          s2_circle_2_in.animate({fill:"#000", stroke:"#fff", transform: "t-170,80 s4", strokeWidth: 0.5}, 500,mina.easeinout, function(){
            stepThree();
          });
        });
      });

      step_two_group = paper.group( s2_circle_path,s2_circle_2_path,s2_circle_2_in, s2_circle_1_in, s2_circle_1, s2_circle_2, s2_text_1, s2_text_2 )
      
    };

    var s2_circle_3;
    var s2_line_3;
    var stepThree = function(){
      s2_line_3   = paper.path('M200,240').attr({stroke: "#fff", 'stroke-dasharray':"3, 3", 'stroke-dashoffset':'120'});
      s2_line_3.insertBefore(s2_circle_2_in);
      s2_circle_3 = paper.circle(200,240, 5).insertBefore(s2_circle_2_in);

      s2_line_3.animate({path:"M200,240 L200,315"},500,mina.easeinout);
      s2_circle_3.animate({transform: "t0,80"}, 500,mina.easeinout, function(){
        s2_circle_3.animate({transform: "t0,80 s1"},00,mina.easeinout, function(){
          s2_circle_3.animate({ strokeWidth: '1'}, 200,mina.easeinout, function(){
            s2_text_2.animate({opacity: 1}, 1000,mina.easeinout,function(){
              stepFour();
            });
          });
        });
      });
    }; 

    var s2_circle_4;
    var s2_circle_5;
    var s2_circle_6;
    var stepFour = function(){
      s2_circle_4 = paper.circle(200,380, 5).attr({fill:"#fff", opacity: 0});
      s2_circle_5 = paper.circle(200,410, 10).attr({fill:"#fff", opacity: 0});
      s2_circle_6 = paper.circle(200,450, 15).attr({fill:"#fff", opacity: 0});

      s2_circle_4.animate({opacity: 1}, 200,mina.easeinout, function(){
        s2_circle_4.animate({fill:"transparent", stroke: "#fff"},200,mina.easeinout,function(){

          s2_circle_5.animate({opacity: 1}, 200,mina.easeinout, function(){
            s2_circle_5.animate({fill:"transparent", stroke: "#fff"},200,mina.easeinout, function(){
              s2_circle_6.animate({opacity: 1}, 200,mina.easeinout, function(){
                s2_circle_6.animate({fill:"transparent", stroke: "#fff"},200,mina.easeinout, function(){
                  s2_circle_6.animate({},200,mina.easeinout, function(){
                    stepFive();
                  }); 
                });
              });
            });
          });
        });        
      });
    };


    var s3_circle_out;   
    var s3_circle_in ;   
    var s3_two_circle ;  
    var s3_two_circle_num
    var s3_two_group;

    var stepFive = function(){
      s3_circle_out       = largeTouchButtonOut.clone();
      s3_circle_in        = largeTouchButtonIn.clone();
      s3_two_circle       = paper.group(s3_circle_out, s3_circle_in).transform("T200,500");
      s3_two_circle_num   = paper.text(200, 507, "III").attr({'font-size': '20px',fill: '#000'});
      s3_circle_group     = paper.group(s3_two_circle,s3_two_circle_num).attr({opacity: 0}).addClass("ani-link");

      s3_circle_group.animate({opacity:1}, 2000,mina.easeinout, function(){
        pulsateObject.running = true;
        pulsateObject(s3_circle_out);
      });

      s3_circle_group.click(function(){
        pulsateObject.running = false;
        stepSix();
      });
    };

    var stepSix = function(){
      paper.group(s2_two_group, step_two_group, s2_circle_4, s2_circle_5, s2_circle_6 ).animate({transform: "t0,-430", opacity: 0},1000,mina.easeinout);
      s3_circle_group.animate({transform: "t0,-430"},1000,mina.easeinout, function(){
        stageThree();
      });
    };

    stepOne();
  };

  var stageThree = function(){
    var s3_circle_out;     
    var s3_circle_in ;    
    var s3_two_circle ;     
    var s3_two_circle_num;  
    var s3_two_group;
    var s3_title_text;

    var stepOne = function(){
      paper.clear();
      initialiseSVG();
      s3_circle_out       = largeTouchButtonOut.clone();
      s3_circle_in        = largeTouchButtonIn.clone();
      s3_two_circle       = paper.group(s3_circle_out, s3_circle_in).transform("t200,70");
      s3_two_circle_num   = paper.text(200, 77, "III").attr({'font-size': headerTextSize}).attr({fill: '#000'});
      s3_title_text       = paper.text(200,120,"Multi-disciplined").attr({'font-size': headerTextSize, opacity: 0});
      s3_two_group        = paper.group(s3_two_circle,s3_two_circle_num, s3_title_text)
      // s3_title_text.transform("T"+ -(s3_title_text.getBBox().cx-s3_title_text.getBBox().x)+",0");

      s3_title_text.animate({opacity: 1}, 1000,mina.easeinout,function(){
        stepTwo();
      });   
    };

    var s3_text;
    var s3_circle;
    var s3_circle_path;
    var s3_circle_path_2;
    var s3_circle_path_g;
    var stepTwo = function(){
      s3_text = paper.text(200, 150, ["Solutions are delivered across all the","  creative disciplines required for the project."," We have a broad range of in house"," experience as well as a wide creative"," network upon which to draw."])
      s3_text.attr({opacity: 0});
      s3_text.selectAll('tspan').attr({x: '200px', dy: '1.2em'});
      s3_circle_path = paper.circle(200,400, 100);

      var stroke_array  = "1,625.9 1,77.5 1,77.5 1,77.5 1,77.5 1,77.5 1,77.5 1,77.5 3,75.5 3,75.5 6,72.5 6,72.5 9,69.5 9,69.5 14,64.5 14,64.5 18,60.5 18,60.5 20,58.5 20,58.5 24,54.5 28,50.5 32,46.5 36,42.5 40,38.5 44,34.5 48,30.5 52,26.5 56,22.5 60,18.5 64,14.5 68,10.5 80,0 80,0 80,0 80,0 80,0 80,0 80,0 80,0 80,0"

      s3_circle_path.attr({fill: 'none', stroke: '#fff', strokeWidth: '15px',strokeDasharray:stroke_array, strokeDashoffset:'0', 'stroke-linecap': 'round' });

      Snap.animate(0,3100, function( value ){ 
        s3_circle_path.attr({ 'strokeDashoffset': value })
      }, 4500, mina.easeout, function(){});

      s3_text.animate({opacity: 1}, 1000,mina.easeinout, function(){});
    };

    stepOne();
  };

  stageOne();
});

var animationScrollTo = function(){
  $('html,body').animate({
    scrollTop: $(".animation-container").offset().top
  }, 500, 'swing');
};




