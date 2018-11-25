from requests import get
import requests
from bs4 import BeautifulSoup
import json
from flask import Flask
app = Flask(__name__)
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# email = "shreyasthirumalai@gmail.com"
# pwd = "Nitt@12345"
# options = Options()
# options.add_argument("--headless")
# driver = webdriver.Chrome('./chromedriver')#,options=options)
# url = "https://www.netflix.com/in/Login"
# driver.get(url)
# ele = driver.find_element_by_name('userLoginId')
# ele.send_keys(email)
# ele1 = driver.find_element_by_name('password')
# ele1.send_keys(pwd)
# sub = driver.find_element_by_css_selector("button[class ='btn login-button btn-submit btn-small']")
# sub.click()
# driver.find_elements_by_class_name("profile-icon")[2].click()
# driver.get(url1)

# def main():
url1 = requests.get('/scrape.py', params=params)
#url1 = "https://www.netflix.com/in/title/80235864"
print (url1)
response = get(url1)
html_soup = BeautifulSoup(response.text, 'html.parser')
mov = html_soup.find('script', type='application/ld+json')
movie = json.loads(mov.text)['name']

url2 = "https://www.imdb.com/search/title?title="+movie
res = get(url2)
soup1 = BeautifulSoup(res.text,'html.parser')
movie_containers = soup1.find('div', class_ = 'inline-block ratings-imdb-rating')
print (movie_containers.text)

# if __name__ == "__main__":
#     x=main()
#     return x
