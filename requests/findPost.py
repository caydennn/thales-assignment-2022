import requests
import urllib.parse
import json
import pprint 




# Input the Title of the post you want to find Eg. 'post 3' (case-sensitive)
post_to_find = "post 3"

post_title_safe = urllib.parse.quote(post_to_find.encode('utf8'))
url = "http://localhost:4000/post/" + post_title_safe


payload={}


response = requests.request("GET", url, data=payload)
json_str = response.content.decode("utf-8")
my_json = json.loads(json_str)
pprint.pprint(my_json, indent=4)
# print(response.text)