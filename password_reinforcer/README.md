# Password strength checker

## 1. Download the model

Download the model's pickle file from Google Drive - 
Link to [Google Drive](https://drive.google.com/file/d/1SPZQY0wt3XjNJ-fCE5GhxE1gY5--GncU/view?usp=sharing)

Alternatively, open Google Colab file and run the notebook to produce the model - Link to [Google Colab](https://drive.google.com/file/d/1n1UYPi2E9Q-r6vuOavTjC7ybmGCmawn-/view?usp=sharing)

## 2. Place the model 

Place the downloaded pickle file of the model in the `model` directory

## 3. Create Docker container

```bash
docker build -t app-name .

docker run -p 80:80 app-name
```
## 4. Open FAST API docs UI

- Go to URL - http://localhost/docs
- This will open the FAST API docs UI
- Make a GET request to check app health
- Make a POST request with the password in the text field below
```
{
  "text": "password"
}
```
- The reponse should indicate if the password is Weak, Medium or Strong


