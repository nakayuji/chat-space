$(function(){
  function buildHTML(message){
      var html = `<div class="message__upper-info">
                  <div class="message__upper-info__talker">
                  ${message.user_id}
                  </div>
                  <div class="message__upper-info__date">
                  ${message.created_at}
                  </div>
                  </div>
                  <div class="message__text">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  <img src="${message.image}" alt="" >
                  </div>`
      return html;
    }
  $('#new_message').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(message){
          var html = buildHTML(message);
          $('.message').append(html);
          $('#new_message')[0].reset();
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        })
        .fail(function(){
          alert('error');
       })
       return false;
      })
    });
    