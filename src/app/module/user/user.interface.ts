

export type Tpayload = {
    password: string
    User: User
}


export type User = {
    name: string;
    email: string;
    password: string;
    bloodType: string;
    location: string;
    age: number;
    role: string;
    bio: string;
    lastDonationDate: string;
}



export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
}
