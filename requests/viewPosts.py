import requests
import pprint 
import json
url = "http://localhost:4000/posts/"







response = requests.request("GET", url)
json_str = response.content.decode("utf-8")
my_json = json.loads(json_str)
pprint.pprint(my_json, indent=4)
