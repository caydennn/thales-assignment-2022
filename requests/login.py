import requests
import json
from http.cookies import SimpleCookie
cookie = SimpleCookie()

url = "http://localhost:4000/login"

payload = json.dumps({
  "username": "cayden"
})
headers = {
  'Content-Type': 'application/json',
}

response = requests.request("POST", url, headers=headers, data=payload)
cookie.load(response.cookies)
cookie = {key: value.value  for key, value in cookie.items()}
print(cookie)
print(response.text)
