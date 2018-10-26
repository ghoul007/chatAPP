import { User } from "./user";

export class Message {
    createAt: Date;
    constructor(public message: string, public sender: User) {
        this.createAt = new Date();
    }
}
