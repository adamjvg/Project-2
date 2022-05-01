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

    // Console to see if values retrieved
    console.log(bpm);
    console.log(danceability);
    console.log(energy);
    console.log(speech);
    console.log(positivity);

    // bar chart
    var graphDisplay = d3.select("#bargraph");
    graphDisplay.html("");

    var xvalue = ['BPM', 'Danceability', 'Energy', 'Speech', 'Positivity'];
    var yvalue = [bpm, danceability, energy, speech, positivity];

    var data1 = [{
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
    }];

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
}