import { Request, RequestStatus } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TToken } from "../Auth/auth.interface";

const DonorRequestIntoDB = async (user: TToken, Payload: Request) => {
   console.log(Payload);
    const result = await prisma.request.create({
        data: {
            donorId: Payload.donorId,
            phoneNumber: Payload.phoneNumber,
            hospitalName: Payload.hospitalName,
            hospitalAddress: Payload.hospitalAddress,
            reason: Payload.reason,
            dateOfDonation: Payload.dateOfDonation,
            requestStatus: RequestStatus.PENDING,
            requesterId: user.id,
            donor:{
                connect: {
                    id: Payload.donorId,
                },
            } as any ,
            requester:{
                connect: {
                    id: Payload.requesterId
                },
            } as any,

        },
        include:{
            donor:true,
            requester:true,
        }
    })

}

export const DonorRequestservice = {
    DonorRequestIntoDB
}