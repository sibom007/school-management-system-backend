import httpStatus from "http-status";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { Tlogin } from "./auth.interface";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { UserStatus } from '@prisma/client';

const LoginIntoDB = async (payload: Tlogin) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const currentpassword = await bcrypt.compare(payload.password, userData.password);
    if (!currentpassword) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password is not match",)
    }

    const token = jwtHelpers.generateToken({
        name: userData.name,
        email: userData.email,
        role: userData.role
    },
        config.accesToken_secret as Secret,
        "30d"

    );

    const refreshToken = jwtHelpers.generateToken({
        name: userData.name,
        email: userData.email,
        role: userData.role
    },
        config.refreshToken_secret as Secret,
        "30d"

    );
    return { token, userData, refreshToken, }
};



const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(token, 'abcdefghgijklmnop');
    }
    catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    });

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    },
        config.accesToken_secret as Secret,
        "30d"
    );

    return {
        accessToken,
    };

}

const ChangePassword = async (payload: any, user: any) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    })


    const iscurrectPassword = await bcrypt.compare(payload.oldPassword, userData?.password);

    if (!iscurrectPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password incorrect!")
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
        }
    })

    return null

}



export const Authservice = {
    LoginIntoDB,
    refreshToken,
    ChangePassword,
}