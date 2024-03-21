import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {apiResponse} from "../utils/apiResponse.js";
import {candidateInfo} from "../model/candidate.model.js"

const candidateForm=asyncHandler(async(req,res)=>{
    const {name,email,college,phone,workingExperience,workingExperienceYears,applyForPosition}=req.body;
    if(!(name||email||college||phone||workingExperience||workingExperienceYears||applyForPosition)){
        throw new apiError("All fields required");
    }
    const resumePath = req.files['resume'][0].path;
    const coverLetterPath = req.files['coverletter'] ? req.files['coverletter'][0].path : null;

    const resume = await uploadOnCloudinary(resumePath)
    const coverLetter = await uploadOnCloudinary(coverLetterPath)
    
    try{
        const newApplication = new candidateInfo({
            fullName: name,
            email: email,
            phone: phone,
            resume: resume,
            college:college,
            coverLetter: coverLetter,
            workingExperience: workingExperience,
            workingExperienceYears:workingExperienceYears,
            applyForPosition: applyForPosition,
        });
        const resp=await newApplication.save();
        res.status(200).json(new apiResponse(200,resp,"data saved successfully"));
    }catch(error){
        throw new apiError(400,`ERROR:${error}`);
    }
})

const  allCanditateFetch=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const{shortlistingLevel}=req.body;
    if(!(shortlistingLevel)){
        throw new apiError(400,"Shorlisting Level is required")
    }
    try{
        const data=await candidateInfo.find({shortlistingLevel:shortlistingLevel});
        res.status(200).json(new apiResponse(200,data,"Data send successfully"));
    }catch(error){
        throw new apiError(400,`Error:${error}`);
    }
})

const candidateStatusModify = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new apiError(400, "ID is required");
      }
  
      console.log(req.body);
      const { shortlistingLevel, shortlistingLevelPosition } = req.body;
  
      if (!shortlistingLevel || !shortlistingLevelPosition) {
        throw new apiError(
          400,
          "shortlistingLevel or shortlistingLevelPosition is required"
        );
      }
  
      const resp = await candidateInfo.findByIdAndUpdate(
        id,
        {
          $set: {
            shortlistingLevelPosition: shortlistingLevelPosition,
            shortlistingLevel: shortlistingLevel,
          },
        },
        {
          new: true,
        }
      );
  
      res.status(200).json(new apiResponse(200, resp, "Data Sent Successfully"));
    } catch (error) {
      throw new apiError(`Error:${error}`);
    }
  });
  

const candidateFetch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) {
        throw new apiError(400, "Candidate Id is required");
    }
    try {
        const data = await candidateInfo.findById(id);
        if (!data) {
            throw new apiError(404, "Candidate not found");
        }
        res.status(200).json(new apiResponse(200, data, "Data sent successfully"));
    } catch (error) {
        console.error("Error fetching candidate data:", error);
        throw new apiError(500, "Internal Server Error");
    }
});


export {
    candidateForm,
    allCanditateFetch,
    candidateStatusModify,
    candidateFetch
}