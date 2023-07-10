import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { BucketsService } from "@buckets/buckets.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
export class AuthQueueController {
    constructor(private bucketService: BucketsService) {}

    @EventPattern("auth.create.user")
    async handleCreateUser(@Payload() user: CreateUserDto) {
        const bucket = `users-${user.id}`;
        await this.bucketService.createOne(bucket, []);
    }
}
