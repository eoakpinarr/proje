const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const jwt = require('jsonwebtoken')

mongoose.connect("mongodb+srv://ogulcanakpinarrr:h3673m33c7.O@cluster0.jckqvf8.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MONGO DB BAĞLANTISI BAŞARILI")
}).catch((error) => {
    console.log("Bir sorun oluştu", error)
})

app.listen(port, () => {
    console.log("Server", port, "portunda çalışıyor.")
})

const User = require("./models/user")
const Post = require("./models/post")

//endpoint to register a user in the backend
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne(email)

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        //create a new user
        const newUser = new User({ name, email, password })

        //Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")

        //Save the user to the database
        await newUser.save()

        //Send the verification to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken)

        res.status(200).json({ message: "Registration Succesfull, Please Check Your Email for Verification" })

    } catch (error) {
        console.log("Error Registering User:", error)
        res.status(500).json({ message: "Error Registering User" })
    }
})

const sendVerificationEmail = async (email, verificationToken) => {
    //Create a Nodemailer transport 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ogulcan.akpinarrr@gmail.com",
            pass: "imhacimnbfvkcpxc"
        }
    })

    //Compose the email message
    const mailOptions = {
        from: "threads.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email http://localhost:3000/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Error sending mail:", error)
    }
}

app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token
        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(404).json({ message: "Invalid token" })
        }
        user.verified = true
        user.verificationToken = undefined
        await user.save()
        res.status(200).json({ message: "Email verified succesfully" })
    } catch (error) {
        console.log("Error Getting Token", error)
        res.status(500).json({ message: "Email verification failed" })
    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey
}

const secretKey = generateSecretKey()

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "Invalid email" })
        }

        if (user.password != password) {
            return res.status(404).json({ message: "Invalid password" })
        }

        const token = jwt.sign({ userId: user._id }, secretKey)
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({ message: "Login failed" })
        console.log("Error", error)
    }
})