const router = require("express").Router();
const bcrypt = require("bcryptjs");
// const authenticate = require("./authenticate.js");

const Users = require("../users/user-model.js")

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    if(user.username && user.password) {
        Users.findBy({ username: user.username })
            .then(foundUser => {
                if (foundUser) {
                    res.status(409).json({ message: "Username already exists"})
                } else {
                    Users.add(user)
                        .then(saved => {
                            res.status(201).json(saved);
                        })
                        .catch(error => {
                            res.status(500).json(error);
                    });
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    } else {
        res.status(400).json({ message: "Username and password are required." })
    }   
});

router.post("/login", (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        // .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                
                req.session.username = user.username;
                
                res.status(200).json({ message: `Login successful, ${user.username}`})
            } else {
                res.status(401).json({ message: "Username and Password incorrect" })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.get("/logout", (req, res) => {
    if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "Error logging out"})
      } else {
        res.status(200).json({ message: "Bye" })
      }
    })
    } else {
      res.status(200).json({ message: "Okay, bye..."})
    }
});



module.exports = router;