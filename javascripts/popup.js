$(document).ready(function(){
  var gifUrls;
  var loaded;
  var offset = 25;
  var index = 0;

  showFirstUrl();

  $('#js-img').on('click', function() {
    showNextUrl();

    if (index !=0 && index % 10 == 0) {
      loadMoreUrl();
    }
  });

  function showFirstUrl() {
    chrome.storage.sync.get(['gifUrls', 'loaded'], function(result) {
      gifUrls = result['gifUrls'];
      loaded = result['loaded'];

      if (loaded) {
        $('#js-img').attr('src', gifUrls[index]);
        index = index + 1;
      }
    });
  }

  function showNextUrl() {
    if (!loaded) {
      showFirstUrl();
    } else {
      $('#js-img').attr('src', gifUrls[index]);
      index = index + 1;
    }
  }

  function loadMoreUrl() {
    $.ajax({
      url: 'https://api.giphy.com/v1/gifs/search',
      type: 'GET',
      dataType: 'JSON',
      data: {
        api_key: 'CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt',
        q: 'cat',
        offset: offset
      },
      success: function(response) {
        var data = response['data']
        for (var i = 0; i < data.length; i++) {
          var url = data[i]['images']['original']['url'];
          gifUrls.push(url);
        }

        offset = offset + 25;
      }
    });
  }
});
