import { ProducerInterface } from "./producers";

export interface UserModel {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    phone?: any;
}

export interface StrapiAccess {
    jwt   : string,
    user  : ProducerInterface
}