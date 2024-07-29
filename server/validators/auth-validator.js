const { z } = require("zod");

const signupSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3 , {message: "Name must be 3 character long"})
    .max(255 , {message : "Name must not exceed 255 characters"}),

    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid Email address"})
    .min(3 , {message: "Email must be 3 character long"})
    .max(255 , {message : "Email must not exceed 255 characters"}),

    phone: z
    .string({required_error: "Phone number is required"})
    .trim()
    .min(10 , {message: "Phone number must be 10 digits long"})
    .max(20 , {message : "Phone must not exceed 20 digits   "}),

    password: z
    .string({required_error: "Password is required"})
    .min(7 , {message: "Password must be atleast 6 characters"})
    .max(1024 , {message : "Password cannot be greater thrn 1024 chatacters"}),


});

module.exports = signupSchema; 