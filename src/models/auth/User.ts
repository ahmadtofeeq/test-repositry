import { Authority } from "./Authority";
import { Principal } from "./Principal";

export class User {

    authorities: Authority[];

    authenticated: boolean;

    name: string;

    principal: Principal;

}