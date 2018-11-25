import requests
from bs4 import BeautifulSoup,SoupStrainer
from flask import Flask,request
import json
import os

app = Flask(__name__)
@app.route("/",methods = ['POST', 'GET'])
def main():
    url=request.data.decode('ascii')
    #print(url)
    response = requests.get(url)
    strainer = SoupStrainer('script')
    html_soup = BeautifulSoup(response.text, 'html.parser',parse_only=strainer)
    mov = html_soup.find('script', type='application/ld+json')
    movie = json.loads(mov.text)['name']
    print (movie)
    url2 = "https://www.imdb.com/search/title?title="+movie
    res = requests.get(url2)
    soup1 = BeautifulSoup(res.text,'html.parser')
    movie_containers = soup1.find('div', class_ = 'inline-block ratings-imdb-rating',)
    text = movie_containers.text
    text = os.linesep.join([s for s in text.splitlines() if s])
    print (text)
    return text
if __name__ == '__main__':
   app.run(debug = True)
