
var dbconfig=require('../dbconfig/db');
dbconfig.connect(function (error) {
    if(error)
    {
        console.log("db unable to connect");
        process.exit(1);

    }
    else{
        console.log("connect Successfully....");
        dbconfig.get().collection('product').insertMany([
    {
    imagePaths:"https://www.technocrazed.com/wp-content/uploads/2015/12/quote-wallpaper_33.jpg",
    }
])

    }

});