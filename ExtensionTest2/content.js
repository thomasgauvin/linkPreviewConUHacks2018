// content.js

//Sends an alert to the user
//alert("Hello there.")

/* Example of replacing text
var s="<div>hello world <br/><li>First LI</li><li>Second LI</li></div>";   
s = s.replace(/<li>/g, "#");  
s = s.replace(/<\/li>/g,"<br/>"); 
alert(s);
*/
//var page = document.body
//alert(page)
/*
var s = document.createElement('script');

s.src = chrome.extension.getURL('content.js');

document.head.appendChild(s);
*/

$("a").hover(function() {
    console.log("test");
}, function() {
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);
      
      chrome.runtime.sendMessage({"message":"open_new_tab", "url": firstHref});
    }
  }
);
