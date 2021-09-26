import firebase_admin
from firebase_admin import credentials, db
from flask import Flask, render_template

app = Flask(__name__)

cred = credentials.Certificate("./hack-gald-firebase-adminsdk-key.json")
options = {
    "databaseURL": "https://hack-gald-default-rtdb.firebaseio.com/"
}
firebase_app = firebase_admin.initialize_app(credential=cred, options=options)

@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route("/api/get_firebase_data/<username>", methods=['GET'])
def get_firebase_data(username):
    ref = db.reference(username.lower())

    try:
        data = ref.get()
        return data, 200
    except Exception as e:
        print(str(e))
        return "Request failed. Please try again.", 500