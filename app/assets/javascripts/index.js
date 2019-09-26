$(document).on('turbolinks:load', function() { 
    var search_list = $("#user-search-result");
  
  
    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
     　　　　　　　 <p class="chat-group-user__name">
     　　　　　　　${user.name}
     　　　　　　　 </p>
     　　　　　　　 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id} data-user-name= ${user.name}>追加</div>
    　　　　　　　　</div>`
    search_list.append(html);
      }
      function appendNoUserToSearchList(user) {
        var html = 
          `<div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${ user }</p>
          </div>`
        search_list.append(html);
      }
      
  
     
      
    
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
  
    if(input == 0){
      $("#user-search-result").empty();
      } else{
  
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else  {
          appendNoUserToSearchList("一致するユーザーはいません");
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    }
    });
   
    　function MemberList(name,user_id) {
        var html = 
          `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
            <input name='group[user_ids][]' type='hidden' value=${user_id}>
            <p class='chat-group-user__name'>${name}</p>
            <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
          </div>`
        return html
      }
  
    
      $('#user-search-result').on('click', '.user-search-add', function() {
        var name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        var insertHTML = MemberList(name,user_id);
        console.log(insertHTML)
        $('.chat-group-form__field--right__menber').append(insertHTML);
        $(this).parent().remove();
      })
      $('.chat-group-user').on('click', '.user-search-remove', function() {
        $(this).parent().remove();
        
      })
      $('.chat-group-form__field--right__menber').on('click', '.user-search-remove', function() {
        $(this).parent().remove();
      })
  });
  