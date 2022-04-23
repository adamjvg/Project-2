#################################################
# Import Dependencies
#################################################
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/data.sqlite")

# Reflect database & tables
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save reference to table
Spotify = Base.classes.spotify


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

    # Query table data
    results = session.query(Spotify.uniqueID, Spotify.title, Spotify.artist, Spotify.topgenre, Spotify.yearreleased, Spotify.bpm, Spotify.nrgy, Spotify.dnce, Spotify.dB,
                            Spotify.live, Spotify.val, Spotify.dur, Spotify.acous, Spotify.spch, Spotify.pop, Spotify.topyear, Spotify.artisttype).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all songs
    spotify_table = []
    for uniqueID, title, artist, topgenre, yearreleased, bpm, nrgy, dnce, dB, live, val, dur, acous, spch, pop, topyear, artisttype in results:
        song_dict = {}
        song_dict['uniqueID'] = uniqueID
        song_dict['title'] = title
        song_dict['artist'] = artist
        song_dict['topgenre'] = topgenre
        song_dict['yearreleased'] = yearreleased
        song_dict['bpm'] = bpm
        song_dict['nrgy'] = nrgy
        song_dict['dnce'] = dnce
        song_dict['dB'] = dB
        song_dict['live'] = live
        song_dict['val'] = val
        song_dict['dur'] = dur
        song_dict['acous'] = acous
        song_dict['spch'] = spch
        song_dict['pop'] = pop
        song_dict['topyear'] = topyear
        song_dict['artisttype'] = artisttype
        spotify_table.append(song_dict)


    # JSONify spotify table
    return jsonify(spotify_table)


if __name__ == '__main__':
    app.run(debug=True)