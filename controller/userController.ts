import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const userController = (user: any) => {
    async function createUser(req: any, res: any) {
        try {
            const hashedPass = bcrypt.hashSync(req.body.password, 8);
            const newUser = await user.create({
                'username': req.body.username,
                'password': hashedPass
            })
            if (newUser) {
                //console.log(newUser);
                const secret = process.env.secretKey;
                if (typeof secret === 'undefined')
                    throw Error;
                const jwtToken = jwt.sign({ id: newUser._id }, secret, {
                    expiresIn: 86400
                })
                res.status(200);
                res.send({ auth: true, token: jwtToken });

            }
        }
        catch (error) {
            res.status(500);
            res.send(error);
        }
    }
    return { createUser }
}