const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ======================
// MongoDB Connection
// ======================


mongoose.connect("mongodb://127.0.0.1:27017/walletDB")

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log(err);
});


// ======================
// Wallet Schema
// ======================

const walletSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        required: true
    },

    transactions: [
        {
            type: String
        }
    ]

});


const Wallet = mongoose.model("Wallet", walletSchema);


// ======================
// CREATE USER
// ======================

app.post("/create", async (req, res) => {

    try {

        const { name, balance } = req.body;

        const newWallet = new Wallet({

            name,
            balance,

            transactions: [
                `Wallet created with ₹${balance}`
            ]

        });

        await newWallet.save();

        res.json({
            message: "Wallet Created Successfully"
        });

    }

    catch (error) {

        res.status(500).json(error);

    }

});


// ======================
// GET ALL USERS
// ======================

app.get("/users", async (req, res) => {

    try {

        const users = await Wallet.find();

        res.json(users);

    }

    catch (error) {

        res.status(500).json(error);

    }

});


// ======================
// SEARCH USER
// ======================

app.get("/search/:name", async (req, res) => {

    try {

        const user = await Wallet.find({

            name: req.params.name

        });

        res.json(user);

    }

    catch (error) {

        res.status(500).json(error);

    }

});


// ======================
// UPDATE BALANCE
// ======================

app.put("/update/:id", async (req, res) => {

    try {

        const amount = req.body.balance;

        const user = await Wallet.findById(req.params.id);

        user.balance = amount;

        user.transactions.push(
            `Balance updated to ₹${amount}`
        );

        await user.save();

        res.json({
            message: "Balance Updated"
        });

    }

    catch (error) {

        res.status(500).json(error);

    }

});


// ======================
// DELETE USER
// ======================

app.delete("/delete/:id", async (req, res) => {

    try {

        await Wallet.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted"
        });

    }

    catch (error) {

        res.status(500).json(error);

    }

});


// ======================
// SERVER
// ======================

app.listen(5000, () => {

    console.log("Server running on port 5000");

});