// var url = 'http://127.0.0.1:5000/data';
var url = '/data/data.json'
songData = d3.json(url)

// Function to generate metadata table
function metadataTable(songTitle) {
    var infoBoxTitle = d3.select('.panel-title');
        infoBoxTitle.html('');
    var infoBox = d3.select('#sample-metadata');
        infoBox.html('');
    songData.then((data) => {
        var selectedSong = data.find(d => {
            return d.title === songTitle;
        });
                
        // Variables for object metadata
        tableArray = {
            // 'Song Title': selectedSong.title,
            // 'Artist': selectedSong.artist,
            'Duration': `${(selectedSong.dur / 60).toFixed(2)} minutes`,
            'Year Released': selectedSong.yearreleased,
            'BPM': selectedSong.bpm,
            'Decibel Level': selectedSong.dB,
            'Acoustic': selectedSong.acous,
            'Danceability': selectedSong.dnce,
            'Energy': selectedSong.nrgy,
            'Speech': selectedSong.spch,
            'Genre': selectedSong.topgenre.toUpperCase(),
            'Positivity': selectedSong.val
        }

        // Update Table
        Object.entries(tableArray).forEach(([key, value]) => {
            infoBox.append('p').text(`${key}: ${value}`);
        });
        infoBoxTitle.text(`${selectedSong.artist} - ${selectedSong.title}`);
    });
}

// Create barChart function


// Feed user selection into functions
function optionChanged(songTitle) {
    metadataTable(songTitle);
}

// function genreChanged(genre) {
//     songData.then((g) => {
//         genreData = g.filter(d => 
//             d.topgenre === genre);
//     });
// }

// Define init function
function init() {
    var selector = d3.select('#selDataset');
    var genreSelector = d3.select('#selGenre');
    songGenre = [];
    // genreData = [];

    songData.then(function(data) {
        data.forEach((d) => {
            var songTitle = d.title;
            // var uniqueID = d.uniqueID;
                selector
                    .append('option')
                    .text(songTitle)
                    .property('value', songTitle);

            var genreToFind = d.topgenre;
            var isGenrePresent = songGenre.some((g) =>
                g === d.topgenre);
            
            if (!isGenrePresent) {
                songGenre.push(genreToFind);
            }
        });
        songGenre.forEach((g) => {
            genreSelector
                .append('option')
                .text(g.toUpperCase())
                .property('value', g);
        });
        
        // Generate first table info
        metadataTable(data[0].title);
    });
}

init();