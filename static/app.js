// Function for changing drop down
function optionChanged(selectedID){

    // Check value in console
    console.log(selectedID);
 
    // read json, print to console
    d3.json("data/samples.json").then((data) => {
     console.log(data);
 
    // Clears menu
    d3.select("#selDataset").html("");   
    
    // Select the metadata array and for each item append the item ID and adds ID to dropdown
    data.metadata.forEach(item =>
         {
        console.log(item.id);
        d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
    // value is passed
    d3.select("#selDataset").node().value = selectedID;
    
    // Filter Metadata by ID
    const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
     
    // Check the metadata by ID in console
    console.log(idMetadata);
    
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });

//Bar
 
    // Filter sample array data
    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
    
    // Slice top 10 sample values
    var sampleValue = idSample[0].sample_values.slice(0,10);
    sampleValue= sampleValue.reverse();
    var otuID = idSample[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    var otuLabels = idSample[0].otu_labels
    otuLabels = otuLabels.reverse();
 
    // Y axis of bar chart
    const yAxis = otuID.map(item => 'OTU' + " " + item);
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
       y: yAxis,
       x: sampleValue,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: '#B3CEE5',
          line: {
             width: 2
         }
        }
       },
       layout = {
       title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
       xaxis: {title: 'Number of Samples'},
       yaxis: {title: 'OTU ID'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    

//Bubble
 
 // Remove Sample value and otuID from individual
 var sampleValue1 =idSample[0].sample_values;
 var otuID1= idSample[0].otu_ids;
 
 // Define the layout and trace object, edit color and orientation
 const trace1 = {
    x: otuID1,
    y: sampleValue1,
    mode: 'markers',
    marker: {
      color: otuID1,
      size: sampleValue1
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 Plotly.newPlot('bubble', [trace1], layout1);
 

 // Gauge Chartgit 
 const gaugeDisplay = d3.select("#gauge");
 gaugeDisplay.html(""); 
 const washFreq = idMetadata[0].wfreq;
 
 const gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
      type: "indicator",
      mode: "gauge+number",     
       gauge: {
       axis: { range: [0,10] },
       bar: { color: "#28F996" },
       steps: [
        { range: [0, 1], color: "#4caf50" },
        { range: [1, 2], color: "#449e48" },
        { range: [2, 3], color: "#3d8c40" },
        { range: [3, 4], color: "#357a38" },
        { range: [4, 5], color: "#2e6930" },
        { range: [5, 6], color: "#265828" },
        { range: [6, 7], color: "#1e4620" },
        { range: [7, 8], color: "#173518" },
        { range: [8, 9], color: "#0f2310" },
        { range: [9, 10], color: "#081108" }
       
                ],
       threshold: {
          value: washFreq
        }
      }
    }
  ]; 
  const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
  Plotly.newPlot('gauge', gaugeData, gaugeLayout); 
 
 });
 }
 
 //starts at ID 940
 optionChanged(940);
 
 // Event on change takes the value and calls the function during dropdown selection
 d3.select("#selDataset").on('change',() => {
 optionChanged(d3.event.target.value);
 
 });