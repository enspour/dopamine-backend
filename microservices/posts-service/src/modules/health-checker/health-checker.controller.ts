import { Controller, Get } from "@nestjs/common";

@Controller("health-checker")
export class HealthCheckerController {
    @Get("live")
    checkout() {
        return "ok";
    }
}
