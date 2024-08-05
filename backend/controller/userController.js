import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userScheme.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"
import mongoose from 'mongoose';
import { Appointment } from "../models/appointmentSchema.js";



export const patientRegister = catchAyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,nic,role} = req.body;
    if(!firstName|| !lastName || !email|| !phone || !password|| !gender || !dob || !nic || !role){
        return next(new ErrorHandler("Please Fill Full Form",400))
    }
    let user = await User.findOne({email})
    if(user){
        return next(new ErrorHandler("User Already Registered ",400));
    }
    user = await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role});

   
    // res.status(200).json({
    //     success: true,
    //     message : "User Registered",
    // }) 
    //this res.status can be replaced by 
    generateToken(user,"User Registered",200,res)

})

export const login = catchAyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role} = req.body;
    if(!email|| !password|| !confirmPassword|| !role){
        return next(new ErrorHandler("Please provide all details",400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and confirm password do not match",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email",400))
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role not found ",400))
    }

    generateToken(user,"User Login Successfullt ",200,res)

})


export const addNewAdmin = catchAyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,nic} = req.body;

    if(!firstName|| !lastName || !email|| !phone || !password|| !gender || !dob || !nic){
        return next(new ErrorHandler("Please Fill Full Form",400))
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(` ${isRegistered.role} with this email already exixts `))
    }
    const admin = await User.create({firstName,lastName,email,phone,password,gender,dob,nic,role: "Admin"})
    res.status(200).json({
        success : true,
        message: "New Admin Registered"
    })
})

export const getAllDoctors = catchAyncErrors(async(req,res,next) =>{
    const doctors = await User.find({role : "Doctor"});
    res.status(200).json({
        success : true,
        doctors
    })
})

export const deleteDoctorById = catchAyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid _id", 400));
    }
    
    const deletedDoctor = await User.findById(id);
  
    if (!deletedDoctor) {
        return next(new ErrorHandler("Doctor Not Found!", 404));
    }

    // Assuming you want to delete all appointments related to the doctor
    await Appointment.deleteMany({ doctorId: id });

    await User.findByIdAndDelete(id);
    
    res.status(200).json({
        success: true,
        message: "Doctor Deleted!",
    });
});


// export const deleteDoctorById = catchAyncErrors(async (req, res) => {
//     const { id } = req.params;
    
//     console.log('Received id:', id);
//       const deletedDoctor = await User.findById(id);
  
//       if (!deletedDoctor) {
//         return next(new ErrorHandler("Doctor Not Found!", 404));
//       }
  
//       await appointment.deleteOne();
//     res.status(200).json({
//       success: true,
//       message: "Doctor Deleted!",
//     });
//     } )

// export const getAllUsers = catchAyncErrors(async(req,res,next) =>{
//     const patient = await User.find({role : "Patient"});
//     res.status(200).json({
//         success : true,
//         patient
//     })
// })
export const getAllUsers = catchAyncErrors(async (req, res, next) => {
    const { search = "", limit = 10, page = 1 } = req.query;

    const query = {
        role: "Patient",
        $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } }
        ]
    };

    const totalUsers = await User.countDocuments(query);
    
    let patients;
    if (Number(limit) === 0) {
        patients = await User.find(query); // Get all users without pagination
    } else {
        patients = await User.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
    }

    res.status(200).json({
        success: true,
        patients,
        totalUsers,
        totalPages: limit === 0 ? 1 : Math.ceil(totalUsers / limit)
    });
});



export const getUserDetails = catchAyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success : true,
        user, 
    })
})

export const logoutAdmin  = catchAyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly : true,
        expires: new Date(Date.now())

    }).json({
        success:true,
        message: "Admin logout Successfully"
    })
}) 

export const logoutPatient  = catchAyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly : true,
        expires: new Date(Date.now())

    }).json({
        success:true,
        message: "Patient logout Successfully"
    })
}) 

export const addNewDoctor = catchAyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avtar Required",400))
    } 
    const {docAvatar} = req.files;
    const allowedFormats = ["image/png" , "image/jpeg","image/webp"]
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported!",400))
}
const {firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment} = req.body;
if(!firstName || !lastName || !email|| !phone|| !password|| !gender|| !dob||!nic||!doctorDepartment){
    return next(new ErrorHandler("Please Provide Full Details ",400))
}
    const isRegistered = await  User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`,400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)

        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log("Cloudinary Error" ,cloudinaryResponse.error ||  "Unknown Cloudinary Error " ) 
        }
    
        const doctor = await User.create({
            firstName,lastName,email,phone,password,gender,dob,nic,doctorDepartment, role: "Doctor",docAvatar:{
                public_id : cloudinaryResponse.public_id,
                url : cloudinaryResponse.secure_url
            }
        })
        res.status(200).json({
            success: true,
            message: "New Doctor Registered ",
            doctor
        })

})

export  const updateDoctor = catchAyncErrors(async (req, res, next) => {
    try {
      // Check if doctor avatar is being updated
      let cloudinaryResponse;
      if (req.files && req.files.docAvatar) {
        const { docAvatar } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  
        // Check if file format is supported
        if (!allowedFormats.includes(docAvatar.mimetype)) {
          return next(new ErrorHandler("File Format Not Supported!", 400));
        }
  
        // Upload new avatar to Cloudinary
        cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
  
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return next(new ErrorHandler("Error uploading avatar to Cloudinary", 500));
        }
      }
  
      // Fetch existing doctor details
      let doctor = await User.findById(req.params.id);
  
      if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 404));
      }
  
      // Update doctor's details
      const { firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment } = req.body;
      doctor.firstName = firstName;
      doctor.lastName = lastName;
      doctor.email = email;
      doctor.phone = phone;
      doctor.password = password; // Consider encrypting if not already done
      doctor.gender = gender;
      doctor.dob = dob;
      doctor.nic = nic;
      doctor.doctorDepartment = doctorDepartment;
  
      // Update avatar if new one is uploaded
      if (cloudinaryResponse) {
        doctor.docAvatar = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url
        };
      }
  
      // Save updated doctor details
      doctor = await doctor.save();
  
      res.status(200).json({
        success: true,
        message: "Doctor details updated successfully",
        doctor
      });
    } catch (error) {
      next(error);
    }
  });


  


  export const getUserAppointments = async (req, res) => {
    try {
      // Fetch appointments where patientId matches the logged-in user's ID
      const userAppointments = await Appointment.find({ patientId: req.user._id });
  
      if (!userAppointments) {
        return res.status(404).json({
          success: false,
          message: "No appointments found for this user",
        });
      }
  
      res.status(200).json({
        success: true,
        appointments: userAppointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };