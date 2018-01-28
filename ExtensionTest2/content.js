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
var block_to_insert = document.createElement('div');

$(block_to_insert).attr("id", "popup");
$(block_to_insert).attr("style","background-color:#FFFFFF;position:absolute;width: 300px;visibility: hidden;")

var paragraph = document.createElement('p');
paragraph.innerHTML = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
block_to_insert.appendChild(paragraph);
document.body.appendChild(block_to_insert);

/*
<div id="popup" style="background-color:#0000FF;
        position:absolute;
        width: 300px;
        max-height: 250px;
        visibility: hidden;">
<p>
</p>
</div>"
*/

$("#popup").hover(function (event) {
    document.getElementById("popup").style.visibility = "visible";
}
, function () {
    document.getElementById("popup").style.visibility = "hidden";
});


$("a").hover(function (event) {
    
    document.getElementById("popup").innerHTML = $(this).attr("href");
    var x = event.pageX, y = event.pageY + 10;
    document.getElementById("popup").style.left = x+'px';
    document.getElementById("popup").style.top = y+'px';
    document.getElementById("popup").style.visibility = "visible";
}
,function() {
    document.getElementById("popup").style.visibility = "hidden";
});



