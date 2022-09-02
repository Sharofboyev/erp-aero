import Joi from "joi";

type Result<T> = { ok: true; value: T } | { ok: false; message: string };

const validationError: <T>(message: string) => Result<T> = (message) => ({
    ok: false,
    message: message,
});

export function validateLogin(body: unknown): Result <{id: number, password: string}>{
    const {error, value} = Joi.object({
        id: Joi.number().integer().positive().required(),
        password: Joi.string().min(5).required()
    }).validate(body);
    if (error) return validationError(error.details[0].message);
    return {ok: true, value: value};
}

export function validateSignUp(body: unknown): Result <{password: string}>{
    const {error, value} = Joi.object({
        password: Joi.string().min(5).required()
    }).validate(body);
    if (error) return validationError(error.details[0].message);
    return {ok: true, value: value};
}