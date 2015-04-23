//$(".newtab").html($("window").height());
function getQuote() {
    $.getJSON("http://bucifanQuotes.azure-mobile.net/api/readquotes?jsoncallback=?", function (data) {
        $("#QuoteTD").html("Test " + data.Quote);
    });
}
var newQimage = chrome.extension.getURL('/newq.png');
function getQuote1() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://bucifanQuotes.azure-mobile.net/api/readquotes", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            var myquoteRaw = xhr.responseText;
            var myq1 = myquoteRaw.substring(myquoteRaw.indexOf("Quote") + 7).replace("}", "").replace(/\"/g, "");
            var myq2 = myq1.substring(0,myq1.indexOf("Author")-1);
            var auth1 = myq1.substring(myq1.indexOf("Author")+7);
            var auth2 = auth1.substring(0,auth1.indexOf("QuoteID")-1);
            $("#QuoteTD").html(myq2 + " | " + auth2);
            $(".newQuote").show();
        }
    }
    xhr.send();
}
function getQuote2() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://bucifanQuotes.azure-mobile.net/api/readquotes", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            var myquoteRaw = xhr.responseText;
            var myq1 = myquoteRaw.substring(myquoteRaw.indexOf("Quote") + 7).replace("}", "").replace(/\"/g, "");
            var myq2 = myq1.substring(0, myq1.indexOf("Author") - 1);
            var auth1 = myq1.substring(myq1.indexOf("Author") + 7);
            var auth2 = auth1.substring(0, auth1.indexOf("QuoteID") - 1);
            $(".front").html(myq2 + " <br><br> -" + auth2);

        }
    }
    xhr.send();
}
function getQuote3() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://bucifanQuotes.azure-mobile.net/api/readquotes", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            var myquoteRaw = xhr.responseText;
            var myq1 = myquoteRaw.substring(myquoteRaw.indexOf("Quote") + 7).replace("}", "").replace(/\"/g, "");
            var myq2 = myq1.substring(0, myq1.indexOf("Author") - 1);
            var auth1 = myq1.substring(myq1.indexOf("Author") + 7);
            var auth2 = auth1.substring(0, auth1.indexOf("QuoteID") - 1);
            $(".back").html(myq2 + " <br><br> -" + auth2);

        }
    }
    xhr.send();
}
var front = true;
$(".card").flip({ axis: 'x', trigger: 'manual' });
//getQuote1();
getQuote2();
getQuote3();

setInterval(flipQuote, 15000);

function flipQuote() {
    if (front) {
        $(".card").flip(true);
        getQuote3();
        front = false;
    } else {
        $(".card").flip(false);
        getQuote2();
        front = true;
    }
}
$('.wodry').wodry();
$("#getnew").click(function () { getQuote1(); });

var haveSchedule = false;
$("#schedulelink").click(function () {
    if (!haveSchedule) {
        getSchedule();
    } else {
        $("#schedule").slideToggle();
    }
});

function getSchedule() {
   // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "http://bucifanSchedule.azure-mobile.net/api/footballseason?year=2015", true);
    var schHTML = "<table ><tr><th colspan='4'> 2015 Schedule</th></tr>";
    $.getJSON("http://bucifanSchedule.azure-mobile.net/api/footballseason?year=2015", function (data) {
        for (i = 0; i < data.length;i++) {
            schHTML += "<tr data-localid='" + i + "' data-serverid='" + data[i].id + "' ><td><img class='editbut' src='" + chrome.extension.getURL('edit.png') + "' data-localid='" + i + "' ></td><td>" + data[i].GameDateTime + "</td><td><img src='http://www.bucifan.com/img/helmets/illinois1.gif' /></td><td>" + data[i].Opponet + "</td><td>" + data[i].Location + "</td></tr>";
            schHTML += "<tr class='editrow'><td colspan='99'><div class='editrowdiv' data-editdivid='" + i + "' data-servereditid='" + data[i].id + "' ><table><tr><td class='saveedits'  data-localeditid='" + i + "'> save </td><td> Helmet Image: <input type='text' class='editinput'  data-localeditid='" + i + "'/></td></tr></table></div></td></tr>";
        }
        $("#schedule").append(schHTML);

        $(".editbut").click(function () {
            var thisid = $(this).attr("data-localid");
            alert(thisid);
            $("[data-editdivid='" + thisid + "']").slideToggle();
        });
        haveSchedule = true;
        $("#schedule").slideToggle();
    });
 }

function showedit() {
    
}