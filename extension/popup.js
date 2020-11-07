window.browser = (function () {
    return window.msBrowser ||
      window.browser ||
      window.chrome;
  })();

function getUrl(){
    browser.tabs.query({active: true, currentWindow: true},postData)
}

function postData(tabs) {
    url = tabs[0].url;
    
    // get title of current page for movie name
    fetch(url,{method: "GET", credentials:"omit"})
    .then(res => {
        return res.text();
    })
    .then((data) => {
        let page = $(data);
        let title = $(page).filter('title').text().split("|")[0].trim();

        //to get details from OMDB api
        OMDBAPIUrl = "http://www.omdbapi.com/?apikey="+OMDB_API_KEY+"&t=" + title;
        fetch(OMDBAPIUrl, {method:"GET"})
        .then(res => {return res.json()})
        .then(data => {
            document.getElementById('result').innerHTML += '<img src="'+data["Poster"]+'" height="100px" width="100px" /><br>'
            Object.keys(data).forEach(function (key) {
                if (key !== "Ratings" && key !== "Poster")
                    document.getElementById('result').innerHTML += "<b>" + key + "</b>" + ":" + data[key] + "<br>";
            });
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log( error );
    })    
}

getUrl();