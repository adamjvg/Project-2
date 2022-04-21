#################################################
# Import Dependencies
#################################################
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import os

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/data.sqlite")

# Reflect database & tables
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save reference to table
sptfy = "spotify"
Spotify = Base.classes.sptfy


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query table
    results = session.query(Spotify).all()
    
    # Convert into dictionary
    spotify_dict = dict(results)

    session.close()

    # JSONify spotify table
    return jsonify(spotify_dict)


if __name__ == '__main__':
    app.run(debug=True)