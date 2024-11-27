const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const JWT=require('jsonwebtoken');

const registerUser=async(req,res)=>{
    const {name,email,password,pic}=req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
    try{
        const userExists=await User.findOne({email});
        if(userExists){
           return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword=await bcrypt.hash(password,12);
        const user=await User.create({
            name,
            email,
            password:hashPassword,
            pic,
        })
        if(user){
            const jwtToken = JWT.sign({ id: user._id },process.env.JWT_SECRET,{ expiresIn: '30d' });
            res.status(201).json({_id:user._id,name:user.name,email:user.email,pic:user.pic,token:jwtToken})
        }else{
             return res.status(500).json({ message: "Failed to create user" }); 
        }
    }catch(error){
       return res.status(500).json({ message: error.message || "Server Error" });
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await User.findOne({email:email});
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
            const hashPassword=await bcrypt.compare(password,user.password);
            if(hashPassword){
                const jwtToken = JWT.sign({ id: user._id },process.env.JWT_SECRET,{ expiresIn: '30d' });
                return res.status(200).json({ token: jwtToken });
            }else{
                return res.status(401).json({ message: 'Incorrect password' });
            }
            
        
    }catch(err){
         return res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// /user/allUsers?search=munis &lastname=sekhar
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports={
    registerUser,
    loginUser,
    allUsers
}