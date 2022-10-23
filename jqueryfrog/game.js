class Car {
    constructor(start, stop, speed, jqEl) {
        this.top = start;
        this.start = start;
        this.stop = stop;
        this.speed = speed;
        this.jQueryElem = jqEl;
    }

    drive() {
        this.top += this.speed;
        if (this.speed > 0) {
            if (this.top > this.stop) {
                this.top = this.start;
                this.speed= Math.floor((Math.random() * 10) + 10);
            }
        } else {
            if (this.top < this.stop) {
                this.top = this.start;
                this.speed= -1*(Math.floor((Math.random() * 10) + 10));
            }
        }
        this.jQueryElem.css({top: this.top});
    }
}
var gameOver = function(){
    var isGameOver = true;
    $(".gameover").css({'top' : '0px'});
  }

$(document).ready(function() {
    const maxH = document.body.clientHeight;
    const carH = $("#car1").height();
    const cars = [
        new Car(-carH, maxH, 10, $("#car1")),
        new Car(maxH, -carH, -10, $("#car2")),
        new Car(-carH, maxH, 15, $("#car3")),
        new Car(maxH, -carH, -7, $("#car4")),
        new Car(-carH, maxH, 10, $("#car5")),
    ]
    isGameOver = false;
    var isCenter = false;
    var position = "left";
    var punkte = 0;
    checkCollision();
    $(".center").mouseover(function(){
        isCenter = true;
      });
    
      $(".left").mouseover(function(){
        if(position == "right" && isCenter==true){
            position="left";
            punkte++;
            isCenter = false;
            $(".point").html("Punkte:"+punkte);
        }
      });
    
      $(".right").mouseover(function(){
        if(position == "left" && isCenter==true){
            isCenter= false;
            position="right";
            punkte++;
            $(".point").html("Punkte:"+punkte)
        
        }
      });
    setInterval(function () {
       for (const car of cars) {
        car.drive();
        
       }
    }, 30)

});

var checkCollision = function(){
    var cursorX;
    var cursorY;
    document.onmousemove = function(e){
      cursorX = e.pageX;
      cursorY = e.pageY;
    }
    setInterval(function(){
      $(".car").each(function(){
        var beginX = $(this).offset().left;
        var endX = $(this).offset().left+$(this).width();
        var beginY = $(this).offset().top;
        var endY = $(this).offset().top+$(this).height();
        if(cursorX>beginX && cursorX<endX && cursorY>beginY && cursorY<endY && isGameOver == false){
          gameOver();
        }
      });
    }, 50);
  
  }