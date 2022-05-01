// Api for use in deployment
var url = 'https://dravgas.herokuapp.com/data';
// For use in development
    // var url = '/data/data.json'
songData = d3.json(url)

// Function to generate metadata table
function metadataTable(songTitle) {
    var infoBoxTitle = d3.select('.panel-title');
    infoBoxTitle.html('');
    var infoBox = d3.select('#sample-metadata');
    infoBox.html('');

    // Wait for API response then generate metadata table based on user selection
    songData.then((data) => {
        var selectedSong = data.find(d => {
            return d.title === songTitle;
        });
                
        // Variables for object metadata
        tableArray = {
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

        // Update Table with current selected song data
        Object.entries(tableArray).forEach(([key, value]) => {
            infoBox.append('p').text(`${key}: ${value}`);
        });
        infoBoxTitle.text(`${selectedSong.artist} - ${selectedSong.title}`);
    });
}

// Feed user selection into functions
function optionChanged(songTitle) {
    metadataTable(songTitle);
    bpmGauge(songTitle);
    barChart(songTitle);
}

// Define init function
function init() {
    var selector = d3.select('#selDataset');

    // Wait for API response then generate dropdown options
    songData.then(function(data) {
        data.forEach((d) => {
            var songTitle = d.title;
                selector
                    .append('option')
                    .text(songTitle)
                    .property('value', songTitle);
        });
        
        // Generate first table info
        optionChanged(data[0].title);
    });
}

// Call init
init();