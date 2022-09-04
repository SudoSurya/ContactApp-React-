const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerUser = require("./RegisterSchema");
const jwt = require("jsonwebtoken");
const LoginMiddleware = require("./LoginMiddleware");
const ContactSchema = require("./ContactSchema");
const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.nkarxtv.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/get", (req, res) => {
  res.send("server Working");
});

app.post("/register", async (req, res) => {
  try {
    const { username, number, email_address, password, c_password } = req.body;
    let exist = await registerUser.findOne({ email_address: email_address });
    if (exist) {
      return res.status(400).send("user Already Exists");
    }
    if (password !== c_password) {
      return res.status(400).send("Password Mismacth");
    }
    let newUser = new registerUser({
      username,
      number,
      email_address,
      password,
      c_password,
    });
    await newUser.save();
    res.status(200).send("register Sucessfully");
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/addcontact", async (req, res) => {
  try {
    const { name, number, email, admin_mail } = req.body;
    let number_exist = await ContactSchema.findOne({ number: number });
    if (number_exist) {
      return res.status(500).send("Number Already Exist");
    }
    let newContact = new ContactSchema({
      name,
      number,
      email,
      admin_mail,
    });
    await newContact.save();
    res.status(200).send("Contact Addeded Sucessfully");
  } catch (error) {
    res.status(500).send("Error in Code");
    console.log(error);
  }
});
app.get("/contacts", async (req, res) => {
  try {
    let data = await ContactSchema.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email_address, password } = req.body;
    let exist = await registerUser.findOne({ email_address: email_address });
    if (!exist) {
      return res.status(500).send("user Not found");
    }
    if (exist.password !== password) {
      return res.status(500).send("invalid password");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server Error");
  }
});

app.get("/dashboard", LoginMiddleware, async (req, res) => {
  try {
    let exist = await registerUser.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("user not found");
    }
    // res.json(exist);
    res.send(exist);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server Error");
  }
});

app.delete('/delete/:id', async(req,res)=>{
  try {
    await ContactSchema.findByIdAndDelete(req.params.id)
    return res.status(200).send("record Deleted")
  } catch (error) {
    console.log(error);
    return res.status(500).send("eroor")
  }
})

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
