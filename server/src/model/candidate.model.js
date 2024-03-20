import mongoose from "mongoose"

const candidateInfoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        requred:true,
    },
    phone:{
        type:String,
        required:true,
    },
    resume:{
        type:String,
        required:true,
    },
    coverLetter:{
        type:String,
        required:true,
    },
    workingExperience:{
        type:String,
        default:null,
    },
    workingExperienceYears:{
        type:Number,
        default:0,
    },
    applyForPosition:{
        type:String,
        required:true,
    },
    shortlistingLevel:{
        type:String,
        enum:['Initial Screening','Intermediate Evaluation','Final Evaluation'],
        default:'Initial Screening',
    },
    shortlistingLevelPosition:{
        type:String,
        enum:['Rejected','Held','Shortlisted'],
        default:'Held',
    }
},{timestamps:true});

export const candidateInfo = mongoose.model('candidateInfo', candidateInfoSchema);