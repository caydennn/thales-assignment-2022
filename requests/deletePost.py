import requests
import urllib.parse

# TODO: Replace the token below with the token after logging in 
token = "\
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2F5ZGVuIiwiaWF0IjoxNjUzMjMyNTIwLCJleHAiOjE2NTMyMzMxMjB9.V0-0utaC0o54xEY7DLtUbKUS89Uw3kEghJ-DIqoUup4"


# Input the Title of the post you want to delete Eg. 'post 3' (case-sensitive)
post_to_find = "post 3"

post_title_safe = urllib.parse.quote(post_to_find.encode('utf8'))
url = "http://localhost:4000/post/" + post_title_safe

print(url)

payload={}
headers = {
  'Cookie': 'token=' + token
}
response = requests.request("DELETE", url, headers=headers, data=payload)

print(response.status_code)
