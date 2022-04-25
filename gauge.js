
var url = "http://127.0.0.1:5000/data";
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
        // Console log to see if object can be found
        console.log(selectedSong);
                
        // Variables for object metadata
        tableArray = {
            // 'Song Title': selectedSong.title,
            'Artist': selectedSong.artist,
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
// Feed user selection into functions
function optionChanged(songTitle) {
    metadataTable(songTitle);
}
//Gauge
function buildGauge(dB) {
    var gauge = d3.select('#gauge');
    gauge.html('');

    var ggData = [{
        domain: {x: [0, 1], y: [0, 1]},
        value: wfreq,
        title: '<b>Loudness</b><br>In decibels',
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
            axis: {range: [null, 9]},
            steps: [
                {range: [0, 1], color: '#f9f2ec'},
                {range: [1, 2], color: '#f5f0e4'},
                {range: [2, 3], color: '#e9e7c8'},
                {range: [3, 4], color: '#e4e9b0'},
                {range: [4, 5], color: '#d5e599'},
                {range: [5, 6], color: '#b7cc8e'},
                {range: [6, 7], color: '#8ac187'},
                {range: [7, 8], color: '#89bc8d'},
                {range: [8, 9], color: '#85b588'}
            ],
            threshold: {
                line: {color: 'red', width: 4},
                thickness: 0.75,
                value: wfreq
            }
        }
    }];

    var layout = {
        width: 550,
        height: 400,
        margin: {
            t: 0,
            b: 0
        }
    };
    Plotly.newPlot('gauge', ggData, layout);
};


function init() {
    var selector = d3.select('#selDataset');

    songData.then(function(data) {
        data.forEach((d) => {
            var song = d.title;
                selector
                .append('option')
                .text(song)
                .property('value', song);
        });
    // Generate first table info
    metadataTable(data[0].dB);
});
}


init();