import express from "express";

import {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} from "../controllers/applicationControllers.js";

import validateApplication from "../middleware/validateApplication.js";

const router = express.Router();

router.get("/", getApplications);

router.get("/:id", getApplicationById);

router.post("/", validateApplication, createApplication);

router.patch("/:id", updateApplication);

router.delete("/:id", deleteApplication);

export default router;