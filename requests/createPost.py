import requests

url = "http://localhost:4000/post"

# TODO: Replace the token below with the token after logging in 
token = "\
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2F5ZGVuIiwiaWF0IjoxNjUzMjMyNTIwLCJleHAiOjE2NTMyMzMxMjB9.V0-0utaC0o54xEY7DLtUbKUS89Uw3kEghJ-DIqoUup4"

payload={}
files=[
  ('qr_code',('frame.png',open('frame.png','rb'),'image/png'))
]
headers = {
  'Cookie': 'token=' + token
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
