
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
         
        
        // Gauge Chart
 var gaugeDisplay = d3.select("#gauge");
 gaugeDisplay.html(""); 
 var decibel = selectedSong.dB;

var gaugeData = [
 {
   domain: { x: [0, 1], y: [0, 1] },
   value: decibel,
   title: { text: "<b>Loudness! </b><br> In Decibels" },
   type: "indicator",
   mode: "gauge+number",     
    gauge: {
    axis: { range: [-12,0] },
    bar: { color: "F5EED5" },
    steps: [
     { range: [-12, -11], color: "#33cc33" },
     { range: [-11, -10], color: "#66ff33" },
     { range: [-10, -9], color: "#99ff33" },
     { range: [-9, -8], color: "#ccff66" },
     { range: [-8, -7], color: "#ccff33" },
     { range: [-7, -6], color: "#ffff66" },
     { range: [-6,-5], color: "#ffff00" },
     { range: [-5,-4], color: "#ffcc66" },
     { range: [-4, -3], color: "#ff9933" },
     { range: [-3, -2], color: "#ff6600" },
     { range: [-2, -1], color: "#ff3300" },
     { range: [-1, 0], color: "#ff0000" }
    
             ],
    threshold: {
       value: decibel
     }
   }
 }
]; 
var gaugeLayout = {  width: 600, 
                height: 400, 
                margin: { t: 0, b: 0 }, 
                 };

Plotly.newPlot('gauge', gaugeData, gaugeLayout); 
    });
}
// Feed user selection into functions
function optionChanged(songTitle) {
    metadataTable(songTitle);
}
//init function
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