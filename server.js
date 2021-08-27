const express = require("express")
const connectDB = require("./config/connectDB")
const User = require("./models/User")
require("dotenv").config({ path: "./config/.env" })
const app = express()

app.use(express.json())
connectDB()

//POST :  ADD A NEW USER TO THE DATABASE 
app.post('/users/add', async (req, res) => {
    const { fullName, email, phone } = req.body;
    const newUser = new User({
        fullName,
        email,
        phone
    })
    try {
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        console.error(error.message);
    }
})
//  GET :  RETURN ALL USERS 
app.get('/users/get', async (req, res) => {
    try {
        let users = await User.find()
        res.send(users)
    } catch (error) {
        console.error(error.message);
    }
})

//  DELETE : REMOVE A USER BY ID 
app.delete('/users/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send("utilisateur supprimé avec succès")
    } catch (error) {
        console.error(error.message);
    }
})
//  PUT : EDIT A USER BY ID 
app.put('/users/update/:id', async (req, res) => {
    try {
        let editedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.send(editedUser)
    } catch (error) {
        console.error(error.message);
    }
})
const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => err ? console.log(err) : console.log(`serveur s'exécutant sur le port ${PORT}`))
