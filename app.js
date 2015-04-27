var fs = require('fs');
var readline = require('readline');
var geoip = require('geoip-lite');

var rawData = process.argv[2];

if(!rawData){
    console.log("No input!");
    process.exit(1);
}

console.log("ip|name|router-port|directory-port|flags|uptime|version|contactinfo|country|region|city|latitude|longitude");

var rd = readline.createInterface({
    input: fs.createReadStream(rawData),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    var lineParts = line.split('|');

    // Fix rows with pipes in contact info
    if(lineParts.length>8){
        var contact = lineParts.slice(7).join("");
        var parts = lineParts.slice(0,7);
        parts.push(contact);     
        line = parts.join("|");
    }

    var geo = geoip.lookup(lineParts[0]);

    if(geo){
        console.log(line+"|"+geo.country+"|"+geo.region+"|"+geo.city+"|"+geo.ll[0]+"|"+geo.ll[1]);
    }
});
