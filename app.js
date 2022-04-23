var url = "http://127.0.0.1:5000/data";
songData = d3.json(url)

function init() {
    var selector = d3.select('#selDataset');
    console.log(songData)

    songData.then(function(data) {
        data.forEach((d) => {
            var songs = d.title;
                selector
                .append('option')
                .text(songs)
                .property('value', songs);
        })
    });
}

init();