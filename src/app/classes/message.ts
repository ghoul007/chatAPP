import { User } from "./user";

export class Message {

    constructor(public message: string, public sender: User, public createAt?) {
          this.createAt = new Date();
    }
}
