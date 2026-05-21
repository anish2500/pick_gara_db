import mongoose from "mongoose"; 
import bcrypt from "bcryptjs";
import { minLength } from "zod";


const adminSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true
    },
    password: {
        type: String, 
        required: true, 
        minLength: 6
    },
},{ timestamps: true});


adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return; 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.confirmPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin; 