browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if( request.message === "texttran") {
      $('#texttran').val(request.textvi + '\n' + request.texten);
  }
});

if (window.location.hostname == "tungxen.github.io") {
    $('#video').on('pause', function() {
      var sub = $('#targettrack').text();
      if (sub.trim() != '') {
          var url = 'https://jisho.org/search/' + encodeURIComponent(sub.trim());
          browser.runtime.sendMessage({"message": "sub", "url": url});
      }
    });
}
if (window.location.hostname == "translate.google.com") {
    setTimeout(function () {
        var en = $('textarea').first().val();
        var vi = $('.VIiyi>span>span').text();
        browser.runtime.sendMessage({"message": "texttran", "textvi": vi, "texten": en});
    }, 1500);
}
if (window.location.hostname == "jisho.org") {
    $(document).on('dblclick', '.concept_light-representation', function(){
        var textdata = $(this).parents('.concept_light').find('.meaning-meaning').eq(0).text().trim();
        var url = 'https://translate.google.com/#view=home&op=translate&sl=en&tl=vi&text='+encodeURIComponent(textdata);
        browser.runtime.sendMessage({ message: "trans", url: url });
     });
    $('BODY').append('<div style="position: fixed; left: 0; bottom: 0; width: 100%; font-size: 20px;"><textarea style="font-size: 20px;" id="texttran"  rows="4" cols="50"></textarea></div>');
}
