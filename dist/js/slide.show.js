var curSlide;

document.addEventListener('DOMContentLoaded', function(){

  // reverse the z index
  var z = 9999999;
  var slides = document.querySelectorAll('section');
  Array.prototype.forEach.call(slides, function(el, i){
    el.setAttribute('style','z-index:'+z);
    z--;
  });

  var slideshow = document.getElementById('slideshow');
  var firstSlide = slideshow.firstElementChild;
  curSlide = firstSlide;
  firstSlide.focus();

  slideshow.addEventListener("dblclick", function(e){
    moveForward();
  });

  slideshow.addEventListener("keydown", function(e){

    console.log('press');

    if(e.keyCode === 38){
      moveBack();
    }

    if(e.keyCode === 40){
      moveForward();
    } 

  });


});

function moveForward(){
  /*
  if(!curSlide){
    return;
  }
  */
  curSlide.setAttribute('data-state','off');
  if(curSlide.nextElementSibling){
    curSlide = curSlide.nextElementSibling;
  }
  
}

function moveBack(){
  /*
  if(!curSlide){
    return;
  };
  */
  if(curSlide.previousElementSibling){
    curSlide = curSlide.previousElementSibling;
    curSlide.removeAttribute('data-state');
  }
}



