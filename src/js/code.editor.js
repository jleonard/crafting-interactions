// css editors
// --------------------------
document.addEventListener('DOMContentLoaded', function(){

  var editors = document.querySelectorAll('section.editor');
  Array.prototype.forEach.call(editors, function(el, i){

    var id = el.getAttribute('id');
    var container = el.querySelector('.code');
    var textarea = el.querySelector('.code textarea');
    var code = el.querySelector('.code code');
    
    var head = document.querySelector('head');
    var style = document.createElement("STYLE");
    style.setAttribute('class',id);
    head.appendChild(style);

    textarea.addEventListener('keyup',function(){
      code.innerHTML = textarea.value;
      Prism.highlightElement(code, true, function(){});
    });

    textarea.addEventListener('focus',function(){
      container.setAttribute('data-mode','edit');
    });

    textarea.addEventListener('blur',function(){
      container.removeAttribute('data-mode');
      var less = '#'+id+'{'+textarea.value+'}';
      $.post('/less', 
      {
        less: less
      }, 
     function(data,textStatus) {
        console.log('data!!! ',data.css);
        style.innerHTML = data.css;
     });
      
    });

  });
});

// html editors
// --------------------------

function sanitizeHTML(str){
  return str.replace(/</g,'%lt;').replace('/>/g','&gt;');
};

/*
document.addEventListener('DOMContentLoaded', function(){

  var editors = document.querySelectorAll('section.editor');
  Array.prototype.forEach.call(editors, function(el, i){
    var id = el.getAttribute('id');
    var textarea = el.querySelector('.markup textarea');
    var code = el.querySelector('.markup code');
    var container = el.querySelector('.markup');
    var preview = el.querySelector('.markup .preview');
    var button = el.querySelector('.markup button');

    textarea.addEventListener('keyup',function(){
      code.innerHTML = sanitizeHTML(textarea.value);
      Prism.highlightElement(code, true, function(){});
    });

    textarea.addEventListener('focus',function(){
      container.setAttribute('data-mode','edit');
    });

    textarea.addEventListener('blur',function(){
      container.setAttribute('data-mode','code-view');
    });

    button.addEventListener('click',function(){
      
      if(container.hasAttribute('data-mode')){
        container.removeAttribute('data-mode');
        preview.innerHTML = textarea.value;
      }else{
        $(textarea).focus();
      }
      
    });

  });
});
*/