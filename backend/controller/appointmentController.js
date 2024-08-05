import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userScheme.js";
import { sendEmail } from "../utils/notifications.js";

export const postAppointment = catchAyncErrors(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointmentDate,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointmentDate ||
        !department ||
        !doctor_firstName||
        !doctor_lastName||
        !address 
    ){
        return next(new ErrorHandler("Please Fill Full Form",400))
    }
    const isConflict = await User.find({
        firstName : doctor_firstName,
        lastName : doctor_lastName,
        role:"Doctor",
        doctorDepartment: department

    })
    if(isConflict.length === 0){
        return next(new ErrorHandler("Doctor not found!",400))
    }
    if(isConflict.length > 1){
        return next(new ErrorHandler("Doctors Conflict Please Contact Through Email or Phone",400))
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointmentDate,
        department,
        doctor:{
            firstName : doctor_firstName,
            lastName : doctor_lastName
        },
        hasVisited,
        address,
        doctorId,
        patientId
    })

    res.status(200).json({
        success:true,
        message:"Appointment sent successfully",
        appointment,
    })
})

export const getAllAppointments = catchAyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  });;

  // export const updateAppointmentStatus = catchAyncErrors(
  //   async (req, res, next) => {
  //     const { id } = req.params;
  //     const { status } = req.body;
  //     let appointment = await Appointment.findById(id);
  //     if (!appointment) {
  //       return next(new ErrorHandler("Appointment not found!", 404));
  //     }
  //     const message = `Your appointment status has been updated to: ${status}`;
  
  //     // Send email notification
  //     sendEmail(appointment.user.email, "Appointment Status Update", message);
  //     appointment = await Appointment.findByIdAndUpdate(id, req.body, {
  //       new: true,
  //       runValidators: true,
  //       useFindAndModify: false,
  //     });
  //     res.status(200).json({
  //       success: true,
  //       message: "Appointment Status Updated!",
  //       appointment
  //     });
  //   }
  // );

 export const updateAppointmentStatus = catchAyncErrors(
    async (req, res, next) => {
      const { id } = req.params;
      const { status } = req.body;
      
      // Fetch appointment
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
      }
  
      const message = `Hello, ${appointment.firstName} ${appointment.lastName} \nYour appointment for doctor ${appointment.doctor.firstName} ${appointment.doctor.lastName} in ${appointment.department} department has been ${status} for date ${appointment.appointmentDate}  \n \nThanks and Regards \nZeeCare+ Medical Institute` ;
  
      // Send email and text message notifications
      sendEmail(appointment.email, "Appointment Status Update", message);
      // sendTextMessage(appointment.phone, message);
  
      // Update appointment status
      appointment.status = status;
      await appointment.save();
  
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment
      });
    }
  );
  
  export const deleteAppointment = catchAyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  });



  