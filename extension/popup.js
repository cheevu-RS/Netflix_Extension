async function get_url(callback){
    tabs =  await chrome.tabs
    tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
    callback(tabs[0].url)
    }
);
};

function postData(input) {
        console.log(input);
        //to obtain movie name,year
        var scrape = new XMLHttpRequest();
        scrape.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let dummy = $(this.responseText);
            var name = $(dummy).find('img.logo')[0]['alt'];
            //Netflix year is last updates year of movie, not what OMDB has.
            //var year = $('.year',dummy).text();
            url = "http://www.omdbapi.com/?apikey=9429ae3b&t="+name;//+"&y="+year;
            console.log(url);
            //to get details from OMDB api
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                stuff = JSON.parse(this.responseText);
                Object.keys(stuff).forEach(function (key) {
                    if(key==='Ratings')
                    {
                        if(stuff[key]!==[])
                        {
                    document.getElementById('status').innerHTML+="<b>"+key+"</b>"+":"+stuff[key]+"<br>"; 
                        }
                    }
                    document.getElementById('status').innerHTML+="<b>"+key+"</b>"+":"+stuff[key]+"<br>"; 
                 });
                //document.getElementById('status').innerHTML=this.responseText;        
                }
            };
        xhttp.open("GET", url, true);
        xhttp.send(); 
        }
        };
        scrape.open("GET", input, true);
        scrape.send();
    }
get_url(postData);
