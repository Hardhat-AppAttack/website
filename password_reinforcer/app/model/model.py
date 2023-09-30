import __main__
import pickle
# from sklearn.feature_extraction.text import TfidfVectorizer
from pathlib import Path

__version__ = "0.1.0"


def word(password):
    character=[]
    for i in password:
        character.append(i)
    return character

__main__.word = word

BASE_DIR = Path(__file__).resolve(strict=True).parent


with open(f"{BASE_DIR}/random_forest_model-{__version__}.pkl", "rb") as f:
    model = pickle.load(f)


with open(f"{BASE_DIR}/tfidf-vectorizer.pkl", "rb") as f:
    tdif = pickle.load(f)




def predict_pipeline(text):
    # tdif = TfidfVectorizer(tokenizer=word)
    text = tdif.transform([text]).toarray()
    pred = model.predict(text[:, :140])
    return pred[0]
