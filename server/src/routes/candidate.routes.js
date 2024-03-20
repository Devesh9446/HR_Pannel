import {Router} from 'express'
import {upload} from "../middleware/multer.middleware.js"
import { candidateForm } from '../controllers/candidate.controller.js';
import { allCanditateFetch } from '../controllers/candidate.controller.js';
import { candidateStatusModify } from '../controllers/candidate.controller.js';
import { candidateFetch } from '../controllers/candidate.controller.js';

const router=Router()

router.route("/Candidate").post(
    upload.fields([
    {
        name:"resume",
        maxCount:1
    },
    {
        name:"coverLetter",
        maxCount:1
    }
]),candidateForm);
router.route("/candidate/:id").get(candidateFetch);

router.route("/allCandidate").get(allCanditateFetch);
router.route("/allCandidate/:id").patch(candidateStatusModify);


export default router;
