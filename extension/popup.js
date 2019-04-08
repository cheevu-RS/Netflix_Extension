window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();
function get_url(){
    browser.tabs.query({active: true, currentWindow: true},postData)
}

function postData(input) {
    //to obtain movie name,year
    var scrape = new XMLHttpRequest();
    scrape.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let dummy = $(this.responseText);
            let name = $(dummy).find('img.logo').attr('alt');
            console.log(name);
            //Netflix year is last updates year of movie, not what OMDB has.
            //var year = $('.year',dummy).text();
            url = "http://www.omdbapi.com/?apikey=9429ae3b&t=" + name; //+"&y="+year;
            //to get details from OMDB api
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    stuff = JSON.parse(this.responseText);
                    Object.keys(stuff).forEach(function (key) {
                        if (key !== "Ratings")
                            document.getElementById('status').innerHTML += "<b>" + key + "</b>" + ":" + stuff[key] + "<br>";
                    });
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }
    };
    scrape.open("GET", input, true);
    scrape.send();
}
get_url();