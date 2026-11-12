const validateApplication = (req, res, next) => {

    const { company, role, status, location, appliedDate } = req.body;

    const errors = {};

    if (!company || typeof company !== "string" || !company.trim()) {
        errors.company = "Company name is required";
    }

    if (!role || typeof role !== "string" || !role.trim()) {
        errors.role = "Job role is required";
    }

    const validStatuses = [
        "Applied",
        "Interview",
        "Selected",
        "Rejected"
    ];

    if (!validStatuses.includes(status)) {
        errors.status = "Status must be Applied, Interview, Selected or Rejected";
    }

    if (location !== undefined && typeof location !== "string") {
        errors.location = "Location must be a string";
    }

    if (
        appliedDate !== undefined &&
        (
            typeof appliedDate !== "string" ||
            Number.isNaN(Date.parse(appliedDate))
        )
    ) {
        errors.appliedDate = "Applied date must be a valid date";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

export default validateApplication;