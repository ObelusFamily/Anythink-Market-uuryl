const dotenv = require('dotenv');
const fs = require('fs');
const colors = require('colors');
const mongoose = require("mongoose");

require("./models/User");
require("./models/Item");
require("./models/Comment");
require("./config/passport");

var item = mongoose.model("Item");

// Load ENV variables
dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(e => console.log(e));


// Read The JSON files
const items = JSON.parse(fs.readFileSync(`${__dirname}/mongo-seed/seeds.json`, 'utf-8'));

// Import Sample Data In DB
const importData = async () => {
    try {
        console.log("trying to add items");
        await item.create(items);
        console.log(`Data successfully imported`.green.inverse);
        process.exit();
    } catch (err) {
        console.log("error");

        console.log(err);
    }
}

importData().then();

/* // Delete the data from DB
const deleteData = async () => {
    try {
        await Comment.deleteMany();
        console.log(`Data successfully deleted`.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData().then();
} else if (process.argv[2] === '-d') {
    deleteData().then();
}*/