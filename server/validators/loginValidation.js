const { z } = require("zod");


//creating an object schema

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max({ message: "Email must not be more than 255 characters" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(3, { message: "Password at least 3 characters" })
        .max(10, { message: "Password must not be more than 10 characters" })
});

module.exports = loginSchema;