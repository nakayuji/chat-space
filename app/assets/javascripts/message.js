$(document).on('turbolinks:load', function() { 
  function buildHTML(message){
      var html = `<div class="message__upper-info">
                  <div class="message__upper-info__talker" data-message-id="${message.id}">
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
      var reloadMessages = function() {
        last_message_id = $('.message__upper-info__talker:last').data('message-id')
        
        $.ajax({
          url: './api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          console.log(last_message_id)
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          })
          
        })
        .fail(function() {
          console.log('error');
        });
      };
      $(function() {
          setInterval(reloadMessages, 5000);
        });  
    });
    