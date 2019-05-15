$(document).ready(function(){
  randomImage();

  $('#js-img').on('click', function() {
    randomImage();
  });

  function randomImage() {
    $('#js-img').attr('src', '/images/loading.gif');

    $.ajax({
      url: 'https://api.giphy.com/v1/gifs/random',
      type: 'GET',
      dataType: 'JSON',
      data: {
        api_key: 'CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt',
        tag: 'cat'
      },
      success: function(response) {
        var url = response['data']['images']['original']['url'];
        $('#js-img').attr('src', url);
      }
    });
  }
});
