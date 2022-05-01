// Function to generate BPM gauge
function bpmGauge(songTitle) {
    songData.then((data) => {
        var selectedSong = data.find(d => {
            return d.title === songTitle;
        });

        // Gauge Chart
        var gaugeDisplay1 = d3.select("#gauge1");
            gaugeDisplay1.html("");

        // BPM variable for gauge
        var bpm = selectedSong.bpm;

        // Gauge Data
        var gaugeData1 = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: bpm,
            title: { text: "<b>Speed!</b><br>In Beats Per Minute" },
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
        }]; 

        // Gauge Layout
        var gaugeLayout1 = {  width: 600, 
            height: 600, 
            margin: { t: 10, b: 0 }, 
        };

        // Generate Plotly
        Plotly.newPlot('gauge1', gaugeData1, gaugeLayout1); 
    });
};