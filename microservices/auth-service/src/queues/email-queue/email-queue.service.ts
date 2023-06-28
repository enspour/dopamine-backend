import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import constants from "@constants";

const { EMAIL_QUEUE } = constants.injections;

@Injectable()
export class EmailQueueService {
    constructor(@Inject(EMAIL_QUEUE) private queue: ClientProxy) {}

    sendECCode(email: string, code: string) {
        this.queue.emit("email.codes.send.EC", { email, code });
    }

    sendTFACode(email: string, code: string) {
        this.queue.emit("email.codes.send.TFA", { email, code });
    }
}
