

export type Tpayload = {
    password: string
    User: TUser
}


export type TUser = {
  name: string;
  email: string;
  password: string;
  bloodType: string;
  location: string;
  age: number;
  role: string;
  bio: string;
  donateBlood: "YES" | "NO";
  lastDonationDate: string;
};



export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
}
