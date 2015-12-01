         );
        }

        if (shouldButtonBePressed) {
          return $(helpChatBtnClass).addClass('active');
        }
        return $(helpChatBtnClass).removeClass('active');
      });
    };

    $('body').append(
      '<aside id="chat-embed-main" class="gitter-chat-embed is-collapsed" />'
    );

    main.chat.mainChat = new main.chat.GitterChat({
      room: 'freecodecamp/freecodecamp',
      activationElement: false,
      targetElement: $('#chat-embed-main')
    });
adsfadsfa
    var mainChatTitleAdded = false;
    $('#chat-embed-main').on('gitter-chat-toggle', function() {
      if (mainChatTitleAdded) {
        return null;
      }
      mainChatTitleAdded = true;

      $('#chat-embed-main > .gitter-chat-embed-action-bar').prepend(
        '<div class="chat-embed-main-title">' +
          '<span>Free Code Camp\'s Main Chat</span>' +
        '</div>'
      );
    });


    $('#nav-chat-btn').on('click', function() {
      if (!main.chat.isOpen) {

        main.chat.mainChat.toggleChat(true);
      }
    });
  });

  return main;
}(main));

var lastCompleted = typeof lastCompleted !== 'undefined' ?
  lastCompleted :
  '';

main.getMapShares = function getMapShares() {
  var alreadyShared = JSON.parse(
    localStorage.getItem(main.mapShareKey) ||
    '[]'
  );

  if (!alreadyShared || !Array.isArray(alreadyShared)) {
    localStorage.setItem(main.mapShareKey, JSON.stringify([]));
    alreadyShared = [];
  }
  return alreadyShared;
};

main.setMapShare = function setMapShare(id) {
  var alreadyShared = main.getMapShares();
  var found = false;
  alreadyShared.forEach(function(_id) {
    if (_id === id) {
      found = true;
    }
  });
  if (!found) {
    alreadyShared.push(id);
  }
  localStorage.setItem(main.mapShareKey, JSON.stringify(alreadyShared));
  return alreadyShared;
};

$(document).ready(function() {

  var CSRF_HEADER = 'X-CSRF-Token';

  var setCSRFToken = function(securityToken) {
    jQuery.ajaxPrefilter(function(options, _, xhr) {
      if (!xhr.crossDomain) {
        xhr.setRequestHeader(CSRF_HEADER, securityToken);
      }
    });
  };

  setCSRFToken($('meta[name="csrf-token"]').attr('content'));

  $('img').error(function() {
    $(this)
      .unbind('error')
      .attr(
        'src',
        'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png'
      );