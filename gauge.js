// function optionChanged(selectedID){

//     // Check value in console
//     console.log(selectedID);
 
    // read json, print to console
    var url = "http://127.0.0.1:5000/data";
    d3.json(url).then(function(data) {
     console.log(data);
    });
    // // Clears menu
    // d3.select("#selDataset").html("");   
    
    // // Select the metadata array and for each item append the item ID and adds ID to dropdown
    // data.metadata.forEach(item =>
    //      {
    //     console.log(item.id);
    //     d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
    //      });
    // // value is passed
    // d3.select("#selDataset").node().value = selectedID;
    
    // // Filter Metadata by ID
    // const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
     
    // // Check the metadata by ID in console
    // console.log(idMetadata);
    
    // const panelDisplay = d3.select("#sample-metadata");
    // panelDisplay.html("");
    // Object.entries(idMetadata[0]).forEach(item=> 
    //    {
    //       panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
    //    });