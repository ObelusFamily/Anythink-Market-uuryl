const dotenv = require('dotenv');
const fs = require('fs');
const colors = require('colors');
const mongoose = require("mongoose");

require("./models/User");
require("./models/Item");
require("./models/Comment");
require("./config/passport");

var user = mongoose.model("User");
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
/* const users = JSON.parse(fs.readFileSync(`${__dirname}/mongo-seed/seeds.json`, 'utf-8')); */

let users = [];
let numOfUsers = 100;
for (var i = 0; i < numOfUsers; i++) {
    users.push({
        username: `user${i}`,
        email: `${i}@email.com`,
        password: `${i}`
    });
}


let items = [];
let numOfItems = 100;
for (var i = 0; i < numOfItems; i++) {
    items.push({
        title: `Item #${i}`,
        description: `How it works #${i}`,
        image: "",
    });
}

console.log(items);

// Import Sample Data In DB
const importUsers = async () => {
    try {
        console.log("trying to add users");
        await user.create(users);
        console.log(`Users successfully imported`.green.inverse);
    } catch (err) {
        console.log(err);
    }
    try {
        console.log("trying to add items");
        await item.create(items);
        console.log(`Items successfully imported`.green.inverse);
    } catch (err) {
        console.log(err);

    }

    process.exit();

}

const importItems = async () => {


}

importUsers();

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