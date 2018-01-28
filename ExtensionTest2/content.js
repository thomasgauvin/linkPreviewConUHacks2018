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

var enabled = false;
console.log("Enabled: " + enabled);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
        if (enabled == false)
            enabled = true;
        else
            enabled = false;
        console.log("Browser action click set enabled to " + enabled);
    }
  }
);

//Adds our popup text to the html file
var delayInMilliseconds = 3000;//3 seconds

var HEIGHT = window.screen.availHeight;
var WIDTH = window.screen.availWidth;

var block_to_insert = document.createElement('div');

//$( document.body ).css( 'pointer-events', 'none' );

$(block_to_insert).attr("id", "popup");
$(block_to_insert).attr("style","background-color:#FFFFFF;border-style:double;border-width:3px;position:absolute;width: 330px; maxLength:250px; visibility: hidden; padding-top: 10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;");
//$(paragraph).attr("style", "padding-top: 50px;padding-right: 10px;padding-bottom: 50px;padding-left: 10px;");
var title = document.createElement('p');
var paragraph = document.createElement('p');
paragraph.innerHTML = '<img src="https://www.wallies.com/filebin/images/loading_apple.gif" id="spinner" alt="loading..." style="display: block; margin-left:auto; margin-right:auto; width:80px; height:80px;" />'
block_to_insert.appendChild(title);
block_to_insert.appendChild(paragraph);

document.body.appendChild(block_to_insert);

var titleOfNextPage = "";

$("a").hover(function (event) {
    console.log("Hovering a link while enabled is " + enabled);
    if (enabled == true) {
        var destination = $(this).attr("href");
        titleOfNextPage = $(this).attr("title");
        $(this).attr("title", "");
        document.getElementById("popup").innerHTML = '<img src="https://www.wallies.com/filebin/images/loading_apple.gif" id="spinner" alt="loading..." style="display: block; margin-left:auto; margin-right:auto; width:80px; height:80px;" />';


        $.ajax({
            url: destination, success: function (data) {
                var content = document.createElement('span');
                content.innerHTML = data;


                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api.meaningcloud.com/summarization-1.0",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    "data": {
                        "key": "3413bd9e45d666fd46aa5e8f17e8e180",
                        "txt": content.innerHTML,
                        "url": "",
                        "doc": "",
                        "sentences": "2"
                    }
                }


                $.ajax(settings).done(function (response) {
                    if (!(response.summary.includes("undefined"))) {
                        setTimeout(function () { document.getElementById("popup").innerHTML = "<strong>" + titleOfNextPage + "</strong>" + ": " + response.summary; }, 700);
                    }
                    else {
                        document.getElementById("popup").style.visibility = "hidden";
                        $(this).attr("title", titleOfNextPage);
                    }

                })
                ;
            }
        })

    }
},

function () {
    document.getElementById("popup").style.visibility = "hidden";
    $(this).attr("title",titleOfNextPage);

})

$("#popup").hover(function (event) {
    if (enabled == true)
        document.getElementById("popup").style.visibility = "visible";

}
,

function () {
    document.getElementById("popup").style.visibility = "hidden";
    $(this).attr("title",titleOfNextPage);

});



$("a").hover(function (event) {
    if (enabled == false)
        return;
    var destination = $(this).attr("href");
    document.getElementById("popup").innerHTML = '<img src="https://www.wallies.com/filebin/images/loading_apple.gif" id="spinner" alt="loading..." style="display: block; margin-left:auto; margin-right:auto;width:80px; height:80px;" />';
    $.ajax({
        url: destination, success: function (data) {
            var x, y;
            if (event.clientX<380){
              if(event.clientY+200>HEIGHT){
                x=event.pageX+10;
                y=event.pageY-130;
              }
              else {
                x=event.pageX+10;
                y=event.pageY+15;
              }
            }
            else{
              if(event.clientY+200>HEIGHT){
                x=event.pageX-350;
                y=event.pageY-130;
              }
              else {
                x=event.pageX-350;
                y=event.pageY+15;
              }
            }

            //Data contains the html file of the hovered webpage
            //TODO: Grab only the content text from the html document
            //so that it can be passed to the summarizer
            //var content;
            //content = data.innerText;
            //console.log(content);


            //TODO: Set the inner html to the output of the summarizer (use
            //callback functions
            //document.getElementById("popup").innerHTML = data;
            document.getElementById("popup").style.left = x + 'px';
            document.getElementById("popup").style.top = y + 'px';
            document.getElementById("popup").style.visibility = "visible";
        }
    });

}

/*,function() {
    document.getElementById("popup").style.visibility = "hidden";
}*/,

function () {
    document.getElementById("popup").style.visibility = "hidden";
});
