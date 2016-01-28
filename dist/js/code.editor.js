// css editors
// --------------------------
document.addEventListener('DOMContentLoaded', function(){

  var toggle = document.querySelector('.editor-toggle');
  var global = document.getElementById('editor');
  toggle.addEventListener('click',function(e){
    console.log('woof');
    global.getAttribute('data-active') ? global.removeAttribute('data-active') : global.setAttribute('data-active','true');
  });

  var editors = document.querySelectorAll('article.editor');
  Array.prototype.forEach.call(editors, function(el, i){

    var id = el.getAttribute('id');
    var container = el.querySelector('.code');
    var textarea = el.querySelector('.code textarea');
    var code = el.querySelector('.code code');

    var head = document.querySelector('head');
    var style = document.createElement("STYLE");
    style.setAttribute('class',id);
    head.appendChild(style);

    textarea.addEventListener('focus',function(){
      container.setAttribute('data-mode','edit');
    });

    code.addEventListener('dblclick',function(){
      container.setAttribute('data-mode','edit');
    });

    textarea.addEventListener('dblclick',function(){
      $(textarea).trigger('blur');
    });

    textarea.addEventListener('blur',function(){
      code.innerHTML = textarea.value;
      Prism.highlightElement(code, true, function(){});
      container.removeAttribute('data-mode');
      var less = '#'+id+' .preview {'+textarea.value+'}';

      $.post('/less', 
        {
          less: less
        }, 
       function(data,textStatus) {
          style.innerHTML = data.css;
       });
      
    });

  });
});

// html editors
// --------------------------

function sanitizeHTML(str){
  return str.replace(/</g,'&lt;').replace('/>/g','&gt;');
};


document.addEventListener('DOMContentLoaded', function(){

  function updateDisplay(code,preview,textarea){
    code.innerHTML = sanitizeHTML(textarea.value);
    preview.innerHTML = textarea.value;
    Prism.highlightElement(code, true, function(){});
  }

  var editors = document.querySelectorAll('article.editor');
  Array.prototype.forEach.call(editors, function(el, i){
    var id = el.getAttribute('id');
    var textarea = el.querySelector('.markup textarea');
    var code = el.querySelector('.markup code');
    var container = el.querySelector('.markup');
    var preview = el.querySelector('.markup .preview');
    var editButton = el.querySelector('.markup .actions button.edit');
    var previewButton = el.querySelector('.markup .actions button.view-preview');
    var codeButton = el.querySelector('.markup .actions button.view-code');


    previewButton.addEventListener('click',function(){
      updateDisplay(code,preview,textarea);
      container.removeAttribute('data-mode');
    });

    preview.addEventListener('dblclick',function(){
      container.setAttribute('data-mode','code-view');
    });

    code.addEventListener('dblclick',function(){
      container.setAttribute('data-mode','edit');
    });

    textarea.addEventListener('dblclick',function(){
      updateDisplay(code,preview,textarea);
      container.setAttribute('data-mode','code-view');
    });

    codeButton.addEventListener('click',function(){

      updateDisplay(code,preview,textarea);
      if(container.getAttribute('data-mode') === 'code-view'){
        container.setAttribute('data-mode','edit');
      }else{
        container.setAttribute('data-mode','code-view');
      }
      
    });

  });
});