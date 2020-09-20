from flask import Flask
import waitress

app = Flask("", static_url_path="", static_folder="web/")


@app.route("/")
def home():
    return app.send_static_file("index.html")


if __name__ == '__main__':
    waitress.serve(app, host="0.0.0.0", port=61003)
