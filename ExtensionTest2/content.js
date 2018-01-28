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


//Adds our popup text to the html file
var delayInMilliseconds = 700; //1 second

var block_to_insert = document.createElement('div');

$(block_to_insert).attr("id", "popup");
$(block_to_insert).attr("style","background-color:#FFFFFF;border-style:double;position:absolute;max-width: 340px; visibility: hidden; padding-top: 25px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;");
//$(paragraph).attr("style", "padding-top: 50px;padding-right: 10px;padding-bottom: 50px;padding-left: 10px;");
var paragraph = document.createElement('p');
paragraph.innerHTML = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
block_to_insert.appendChild(paragraph);
document.body.appendChild(block_to_insert);


$("a").hover(function (event) {
    var destination = $(this).attr("href");
    document.getElementById("popup").innerHTML = destination;
    //httpDestination = destination.substring(0,3) + destination.substring(4);

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
                document.getElementById("popup").innerHTML=response.summary;
              })
          ;}})


})

$("#popup").hover(function (event) {
    document.getElementById("popup").style.visibility = "visible";
}
,

function () {
    document.getElementById("popup").style.visibility = "hidden";
});



$("a").hover(function (event) {
    var destination = $(this).attr("href");
    document.getElementById("popup").innerHTML = destination;
    $.ajax({
        url: destination, success: function (data) {
            var x = event.pageX-350, y = event.pageY +10;
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
}*/);
