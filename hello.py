from flask import Flask

app = Flask(__name__, static_url_path="", static_folder="web")

@app.route("/")
def home():
    return app.send_static_file("index.html")

if __name__ == '__main__':
    app.run(host="localhost", port=61003, debug=True)
