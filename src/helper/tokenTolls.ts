import jwt from 'jsonwebtoken'

export const encodeToken = (payload: any) => {
    const secureKey = process.env.MY_SECCRET_KEY;

    const token = jwt.sign(payload, secureKey, { expiresIn: "1h" })
    return token;
}

export const decodeToken = (token: any) => {
    const secureKey = process.env.MY_SECCRET_KEY;
    const decoded = jwt.verify(token, secureKey)
    
    return decoded;
}