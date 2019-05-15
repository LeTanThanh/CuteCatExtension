chrome.runtime.onInstalled.addListener(function() {
  var gifUrls = []
  var offset = 0;
  var loaded = true;

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

      chrome.storage.sync.set({gifUrls: gifUrls}, function() {
        console.log('\nInitialized gifUrls: ');
        for (var i = 0; i < gifUrls.length; i++) {
          console.log(gifUrls[i]);
        }
      });

      chrome.storage.sync.set({offset: offset}, function() {
        console.log('\nInitialized offset: ' + offset);
      });

      chrome.storage.sync.set({loaded: loaded}, function() {
        console.log('\nInitialized done');
      });
    }
  });
});
