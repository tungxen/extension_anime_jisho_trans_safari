browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if( request.message === "sub" ) {
        browser.tabs.query({currentWindow:true}, function(tabs) {
            for(i = 0; i<tabs.length; i++){
                if(tabs[i].title.indexOf('Jisho.org') != -1) {
                    browser.tabs.update(tabs[i].id, {"url": request.url});
                    break;
                }
            }
         });
    }
    if (request.message === "trans") {
        browser.tabs.query({currentWindow:true}, function(tabs) {
            for(i = 0; i<tabs.length; i++){
                if(tabs[i].url.indexOf('translate.google.com') != -1) {
                    browser.tabs.update(tabs[i].id, {
                        url: request.url
                    });
                    break;
                }
            }
         });
    }
    if( request.message === "texttran" ) {
        browser.tabs.query({currentWindow:true}, function(tabs) {
            for(i = 0; i<tabs.length; i++){
                if(tabs[i].title.indexOf('Jisho.org') != -1) {
                    browser.tabs.sendMessage(tabs[i].id, {"message": "texttran", "textvi" : request.textvi, "texten" : request.texten});
                    break;
                }
            }
         } );
    }
});
