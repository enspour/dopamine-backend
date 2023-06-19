import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DuplicateFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        if (exception.driverError.code === "23505") {
            return res.status(400).json({
                statusCode: 400,
                message: "Duplicate",
                error: "Bad Request",
            });
        }

        res.status(500).json({
            statusCode: 500,
            message: "Unknown error",
            error: "Server error",
        });
    }
}
