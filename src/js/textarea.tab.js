// enable tab key in textarea
//-----------------------------
document.addEventListener('DOMContentLoaded', function(){
  var elements = document.querySelectorAll('textarea');
  Array.prototype.forEach.call(elements, function(el, i){
    el.addEventListener('keydown',function(e) {
    console.log('tab!');
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var target = e.target;
        var value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
                    + "\t"
                    + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
},false);
  });
});
