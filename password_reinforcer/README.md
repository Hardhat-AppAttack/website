# Password strength checker

## 1. Run the code from this Google Colab notebook

[Open Colab](https://drive.google.com/file/d/1n1UYPi2E9Q-r6vuOavTjC7ybmGCmawn-/view?usp=sharing)

## 2. Create Docker container

```bash
docker build -t app-name .

docker run -p 80:80 app-name
```
## 3. Go to http://localhost/docs

- This will open the FAST API docs UI
- Make a GET request to check app health
- Make a POST request with the password in the text field below
```
{
  "text": "password"
}
```
- The reponse should indicate if the password is Weak, Medium or Strong


