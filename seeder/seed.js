
var dbconfig=require('../dbconfig/db');
dbconfig.connect(function (error) {
    if(error)
    {
        console.log("db unable to connect");
        process.exit(1);

    }
    else{
        console.log("connect Successfully....");
        dbconfig.get().collection('see').insertMany([

            {imagePath: "https://upload.wikimedia.org/wikipedia/commons/5/51/1_Milford_Sound.jpg"},
            {imagePath: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Whanganui_River.jpg" },
            {imagePath: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Santuaryoftruth2.jpg"},
            {imagePath:"https://upload.wikimedia.org/wikipedia/commons/a/a4/KAZIRANGA.JPG"}

        ])

    }

});