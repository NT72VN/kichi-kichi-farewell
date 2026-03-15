const express = require("express")
const multer = require("multer")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("public"))
app.use("/uploads", express.static("uploads"))

let wishes = []

// cấu hình upload ảnh

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads")

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + "-" + file.originalname)

    }

})

const upload = multer({ storage })


// gửi lời chúc

app.post("/api/wish", upload.single("image"), (req, res) => {

    const wish = {

        name: req.body.name,
        message: req.body.message,
        image: req.file ? "/uploads/" + req.file.filename : null

    }

    wishes.push(wish)

    res.json({ success: true })

})


// lấy danh sách lời chúc

app.get("/api/wishes", (req, res) => {

    res.json(wishes)

})


app.listen(5000, () => {

    console.log("Server running at http://localhost:5000")

})