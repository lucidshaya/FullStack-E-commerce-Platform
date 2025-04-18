router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    
    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User Already exists"})
        // res.send({name, email, password});
        user = new User({   name, email, password});
        await user.save();

        res.status(201).json({
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }

});