const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("base de données connectée ....")
    } catch (error) {
        console.error(error.message);
    }
}
module.exports = connectDB;