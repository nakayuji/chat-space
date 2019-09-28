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
          $('.messages').append(html);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          $('form')[0].reset();
        })
        .fail(function(){
          alert('error');
       })
        .always(function(data){
            $('.form__submit').prop('disabled', false);
        })
        
      //  return false;
      });
      var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
        last_message_id = $('.message__upper-info__talker:last').data('message-id')
        
        $.ajax({
          url: './api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
          })
          
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
      };
      $(function() {
          setInterval(reloadMessages, 5000);
        });  
    });
    