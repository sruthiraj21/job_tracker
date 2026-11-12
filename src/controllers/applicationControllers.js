import { applications } from "../data/application.js";
import ApiError from "../Error/ApiError.js";

export const getApplications = (req, res, next) => {
    try {
        const { status, search } = req.query;

        let filteredApplications = [...applications];

        if (status) {
            filteredApplications = filteredApplications.filter(
                (app) =>
                    String(app.status ?? "").toLowerCase() ===
                    status.toLowerCase()
            );
        }

        if (search) {
            filteredApplications = filteredApplications.filter(
                (app) =>
                    String(app.company ?? "")
                        .toLowerCase()
                        .includes(search.toLowerCase())
            );
        }

        res.status(200).json({
            success: true,
            count: filteredApplications.length,
            data: filteredApplications
        });

    } catch (error) {
        next(error);
    }
};

export const getApplicationById = (req, res) => {
    const id = Number(req.params.id);

    const application = applications.find(
        app => app.id === id
    );

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    res.status(200).json({
        success: true,
        data: application
    });
};

export const createApplication = (req, res) => {
    const newApplication = {
        id: applications.length > 0
            ? Math.max(...applications.map(app => app.id)) + 1
            : 1,

        company: req.body.company.trim(),
        role: req.body.role.trim(),
        status: req.body.status,
        location: req.body.location || "",
        appliedDate: req.body.appliedDate || new Date().toISOString().slice(0, 10)
    };

    applications.push(newApplication);

    res.status(201).json({
        success: true,
        message: "Application created successfully",
        data: newApplication
    });
};

export const updateApplication = (req, res) => {
    const id = Number(req.params.id);

    const application = applications.find(
        app => app.id === id
    );

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    const allowedFields = [
        "company",
        "role",
        "status",
        "location",
        "appliedDate"
    ];

    const updates = Object.keys(req.body);

    if (
        updates.length === 0 ||
        updates.some(field => !allowedFields.includes(field))
    ) {
        throw new ApiError(400, "Invalid or empty update fields");
    }

    const { company, role, status, location, appliedDate } = req.body;

    if (company !== undefined &&
        (typeof company !== "string" || !company.trim())) {
        throw new ApiError(400, "Company must be a non-empty string");
    }

    if (role !== undefined &&
        (typeof role !== "string" || !role.trim())) {
        throw new ApiError(400, "Role must be a non-empty string");
    }

    if (status !== undefined &&
        !["Applied", "Interview", "Selected", "Rejected"].includes(status)) {
        throw new ApiError(400, "Invalid application status");
    }

    if (location !== undefined && typeof location !== "string") {
        throw new ApiError(400, "Location must be a string");
    }

    if (appliedDate !== undefined &&
        (typeof appliedDate !== "string" || Number.isNaN(Date.parse(appliedDate)))) {
        throw new ApiError(400, "Applied date must be valid");
    }

    Object.assign(application, {
        ...req.body,
        ...(company !== undefined ? { company: company.trim() } : {}),
        ...(role !== undefined ? { role: role.trim() } : {})
    });

    res.status(200).json({
        success: true,
        message: "Application updated successfully",
        data: application
    });
};

export const deleteApplication = (req, res) => {
    const id = Number(req.params.id);

    const index = applications.findIndex(
        app => app.id === id
    );

    if (index === -1) {
        throw new ApiError(404, "Application not found");
    }

    applications.splice(index, 1);

    res.status(204).send();
};