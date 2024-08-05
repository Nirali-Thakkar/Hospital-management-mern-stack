import express from "express"
import { addNewAdmin, addNewDoctor, deleteDoctorById, getAllDoctors, getAllUsers, getUserAppointments, getUserDetails,  login, logoutAdmin, logoutPatient, patientRegister, updateDoctor } from "../controller/userController.js";
import { isAdminAuthenticated ,isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.get("/doctors", getAllDoctors)
router.get("/allusers", getAllUsers)
router.delete('/doctors/delete/:id', deleteDoctorById);
router.put('/doctors/update/:id', updateDoctor);
router.get("/patient/appointment", isPatientAuthenticated,getUserAppointments)
router.get("/admin/me", isAdminAuthenticated,getUserDetails)
router.get("/patient/me", isPatientAuthenticated,getUserDetails)
router.get("/admin/logout", isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout", isPatientAuthenticated,logoutPatient)
router.post("/doctor/addnew",isAdminAuthenticated, addNewDoctor)
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);


export default router;