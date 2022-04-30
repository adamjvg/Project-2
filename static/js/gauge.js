
var url = "http://127.0.0.1:5000/data";
var json = "/data/data.json"
songData = d3.json(json)

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
         
        
// Gauge Chart 1
        var gaugeDisplay1 = d3.select("#gauge1");
            gaugeDisplay1.html(""); 
        var bpm = selectedSong.bpm;

        var gaugeData1 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: bpm,
            title: { text: "<b>Speed! </b><br> In Beats Per Minute " },
            type: "indicator",
            mode: "gauge+number",     
            gauge: {
                axis: { range: [70,210] },
                bar: { color: "ECEBE8" },
                steps: [
                    { range: [70, 80], color: "#33cc33" },
                    { range: [80, 90], color: "#66ff33" },
                    { range: [90, 100], color: "#99ff33" },
                    { range: [100, 110 ], color: "#ccff66" },
                    { range: [110, 120], color: "#ccff33" },
                    { range: [120, 130], color: "#ffff66" },
                    { range: [130, 140], color: "#ffff00" },
                    { range: [140, 150], color: "#ffcc66" },
                    { range: [150, 160], color: "#ff9933" },
                    { range: [160, 170], color: "#ff6600" },
                    { range: [170, 180], color: "#ff3300" },
                    { range: [180, 190], color: "#ff0000" },
                    { range: [190, 200], color: "#ff0066" },
                    { range: [200, 210], color: "#ff3399" }
                ],
                threshold: {
                value: bpm
                }
            }
        }
        ]; 
var gaugeLayout1 = {  width: 600, 
                height: 600, 
                margin: { t: 10, b: 0 }, 
                 };
                
Plotly.newPlot('gauge1', gaugeData1, gaugeLayout1); 

var bpm = selectedSong.bpm;
        var danceability = selectedSong.dnce;
        var energy = selectedSong.nrgy;
        var speech = selectedSong.spch;
        var positivity = selectedSong.val;
// bar chart
var graphDisplay = d3.select("#bargraph");
graphDisplay.html("");

var xvalue = ['BPM', 'Danceability', 'Energy','Speech','Positivity'];
var yvalue = [bpm, danceability, energy, speech, positivity];

var data1 = [
{
  y: yvalue,
  x: xvalue,
  type: 'bar',
//   text: yvalue.map(String),
  textposition: 'auto',
  
  marker: {
    color: ['rgba(0,128,0,1)', 'rgba(255,255,0,1)','rgba(255,125,0,1)', 'rgba(255,0,0,1)', 'rgba(255,0,125,1)'],
    opacity: 0.6,
    line: {
      color: 'rgb(0,0,0)',
      width: 2
    }
  }  
}
];

var layout = {
title: 'Summary',
font:{
  family: 'Raleway, sans-serif',
  size: 12
},
showlegend: false,
xaxis: {
  tickangle: -90
},
yaxis: {
  zeroline: true,
  gridwidth: 2
},
bargap :0.05
};

Plotly.newPlot('bargraph', data1, layout);

});
                
    };
                
// Feed user selection into functions
function optionChanged(songTitle) {
    metadataTable(songTitle);
}
//init function
function init() {
    var selector = d3.select('#selDataset');
    var genreSelector = d3.select('#selGenre');
    songGenre = [];

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

        

        // Generate first table info
        metadataTable(data[0].title);
    });
}

init;