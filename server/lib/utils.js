import JWT from "jsonwebtoken"

export const generateToken = (userId)=> {
    const token = JWT.sign({userId}, process.env.JWT_SECRET);
    return token;
}