from flask import Flask, request, render_template, redirect, url_for, jsonify
from pylti.flask import lti

app = Flask(__name__)

# Configurations for LTI
app.config.from_object('config')
app.secret_key = 'dosamantes'

# Sample LTI key and secret
app.config['LTI_OAUTH_CREDENTIALS'] = {
    'consumer_key': 'amada',
    'shared_secret': 'enemiga'
}

# LTI launch URL
@app.route('/lti', methods=['POST', 'GET'])
@lti(request='initial', app=app)
def lti_launch(lti):
    return render_template('index.html')

# Content selection URL
@app.route('/content_selection', methods=['POST', 'GET'])
@lti(request='session', app=app)
def content_selection(lti):
    # Implement your content selection logic here
    return render_template('content_selection.html')

if __name__ == '__name__':
    app.run(debug=True)
