import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { User } from "../model/user.js";

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please provide all the details",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // Set default role as 'user'
    let role = "user";
    if (email === ENV.ADMIN) role = "admin";

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPass,
      role,              // set role
      requestEducator: false, // default false
    });

    const token = jwt.sign(
      { userId: newUser._id },
      ENV.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: newUser.role === "admin"
          ? `Welcome Back Admin ${newUser.fullName}`
          : `Welcome Back ${newUser.fullName}`,
        success: true,
      });

  } catch (error) {
    console.log(`Error in register backend: ${error}`);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all the details"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Error in email or password"
            })
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if (!isPassCorrect) {
            return res.status(400).json({
                message: "Provide Correct Password"
            })
        }

        if (user.email === ENV.ADMIN) {
            console.log(user.email,ENV.ADMIN)
            user.admin = true
            await user.save()
        }

        const token = jwt.sign(
            { userId: user._id },
            ENV.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({
                message: user.admin
                    ? `Welcome Back Admin ${user.fullName}`
                    : `Welcome Back ${user.fullName}`
            })

    } catch (error) {
        console.log(`Error from Login Backend, ${error}`)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
export const getUser=async(req,res)=>{
    try{
      const userId=req.user._id;
      const user=await User.findOne(userId)
      if(!user){
        return res.status(401).json({
                message: "User not found",
                
            })
      }
      return res.status(201).json(user);
    }catch(error){
        console.log(`error from get User, ${error}`)
    }
};
export const logoutApi=async(req,res)=>{
    try{
                return res.cookie("token","").status(201).json({
                    message:"User LOgged Out"
                })
    }catch(error){

console.log(error,"from log out")
    }
}


export const makeeducator = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent changing admin role
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot change admin role" });
    }

    // Check if user is already educator
    if (user.role === "educator") {
      return res.status(400).json({ message: "User is already an educator" });
    }

    // Update role
    user.role = "educator";
    await user.save();

    res.status(200).json({
      message: `${user.fullName} is now an educator`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};