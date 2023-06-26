import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @EventPattern("send:code:email_confirmation")
    async sendEmailConfirmationCode(@Payload() data: any) {
        const { email, code } = data;

        await this.appService.sendEmailConfirmationCode(email, code);
    }

    @EventPattern("send:code:TFA")
    async sendTFACode(@Payload() data: any) {
        const { email, code } = data;

        await this.appService.sendTFACode(email, code);
    }
}
