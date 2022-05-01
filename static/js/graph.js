function barChart(songTitle) {
    songData.then((data) => {
        var selectedSong = data.find(d => {
            return d.title === songTitle;
        });
        // Console log to see if object can be found
        console.log(selectedSong);
                
        var bpm = selectedSong.bpm;
        var danceability = selectedSong.dnce;
        var energy = selectedSong.nrgy;
        var speech = selectedSong.spch;
        var positivity = selectedSong.val;

        console.log(bpm);
        console.log(danceability);
        console.log(energy);
        console.log(speech);
        console.log(positivity);
    
    // bar chart
        var graphDisplay = d3.select("#bargraph");
            graphDisplay.html("");


        var data1 = [
            {
              x: [bpm, danceability, energy, speech, positivity],
              y: ['BPM', 'Danceability', 'Energy','Speech','Positivity'],
              type: 'bar'
            }
          ];

          var layout = {
            title: 'Song Summary',
            font:{
              family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
              tickangle: -45
            },
            yaxis: {
              zeroline: false,
              gridwidth: 2
            },
            bargap :0.05
          };
          
        Plotly.newPlot('bar', data1, layout);
    });
}

function optionChanged(songTitle) {
    metadataTable(songTitle);
}

init;