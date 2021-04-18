function errorResponse(schemaErrors: any) {
    const errors = schemaErrors.map((error: any) => {
        const { path, message } = error;
        return { path, message };
    });

    return {
        status: 'failed',
        errors
    };
}

export function validateSchema(schema: any) {
    return (req: any, res: any, next: any) => {
        const { error } = schema.validate(req.query, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
}
