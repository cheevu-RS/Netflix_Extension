async function get_url(callback){
    console.log('yo2323');
    tabs =  await chrome.tabs
    tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
    callback(tabs[0].url)
    }
);
};

function postData(input) {
        console.log(input);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            console.log(this.responseText);
            document.getElementById('status').innerHTML=this.responseText;        
           }
        };
        xhttp.open("POST", "http://127.0.0.1:5000/", true);
        console.log('sending');
        xhttp.send(input); 
        console.log('sent');
    }
get_url(postData);
