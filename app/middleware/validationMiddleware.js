import {body} from "express-validator";

// export const validateTutorApplication = [
//     body('education').notEmpty().withMessage('Education is required'),
//     body('hourlyRate').isNumeric().withMessage('Hourly rate must be a number'),
//     body('expertise').isArray().withMessage('Expertise must be an array'),
//     body('subjects').isArray().withMessage('Subjects must be an array'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({errors: errors.array()});
//         }
//         next();
//     }
// ];

export const validateUser = [
    body('username')
        .isString()
        .isLength({min: 3, max: 30})
        .withMessage('Username must be between 3 and 30 characters long.'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address.'),
    body('first_name')
        .isString()
        .isLength({min: 1, max: 100})
        .withMessage('First name is required and must be less than 100 characters.'),
    body('last_name')
        .isString()
        .isLength({min: 1, max: 100})
        .withMessage('Last name is required and must be less than 100 characters.'),
    body('contact_number')
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
        .withMessage('Contact number must be a valid phone number.'),
    body('role')
        .isIn(['student', 'tutor', 'admin'])
        .withMessage('Role must be either student, tutor, or admin.')
];

export const validateTutor = [
    body('hourly_rate')
        .isDecimal({decimal_digits: '0,2'})
        .withMessage('Hourly rate must be a decimal number with up to 2 decimal places.'),
    body('description')
        .isString()
        .withMessage('Description is required.'),
    body('qualification')
        .isJSON()
        .withMessage('Qualification must be a valid JSON object.'),
    body('proof_url')
        .isURL()
        .withMessage('Proof URL must be a valid URL.'),
    body('availability')
        .optional()
        .isJSON()
        .withMessage('Availability must be a valid JSON object.')
];

export const validateSession = [
    body('start_time')
        .isISO8601()
        .withMessage('Start time must be a valid ISO 8601 date.'),
    body('end_time')
        .isISO8601()
        .withMessage('End time must be a valid ISO 8601 date.'),
    body('duration_minutes')
        .isInt({min: 1})
        .withMessage('Duration must be a positive integer.'),
    body('meeting_link')
        .optional()
        .isURL()
        .withMessage('Meeting link must be a valid URL.'),
];

