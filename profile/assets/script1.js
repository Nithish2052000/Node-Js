console.log('Hello')
$("txt").on('keyup', (e) => {
    if(e.keyCode == 13 && $(".txt").val() != ''){
       var task = $("<div class='task'></div>").text($(".txt").val());
       var del = $("<i class='fas fa-trash-alt'></i>").click(() => {
           var p = $('this').parent();
           p.fadeOut(() => {
               p.remove();
           });
       });
       var check = $("<i class='fas fa-check'></i>").click(() => {
          var p = $('this').parent();
          p.fadeOut(() => {
              $('.comp').append(p);
              p.fadeIn();
          });
          $('this').remove();
       });
       
       task.append(del, check);
       $('.notComp').append(task);
       $(".txt").val(""); 
    }  
  }) 