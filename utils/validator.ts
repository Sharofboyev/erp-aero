import Joi from "joi";

type Result<T> = { ok: true; value: T } | { ok: false; message: string };

const validationError: <T>(message: string) => Result<T> = (message) => ({
  ok: false,
  message: message
});

export function validateUser(
  body: unknown
): Result<{ id: string; password: string }> {
  const { error, value } = Joi.object({
    id: Joi.alternatives(
      Joi.string().email().required().max(128),
      Joi.string()
        .regex(/^(\+?\d{7,15})\b$/)
        .required()
    ).required(),
    password: Joi.string().min(5).required()
  }).validate(body);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value: value };
}

export function validateFileQuery(
    params: unknown
): Result<{ id: string; password: string }> {
  const { error, value } = Joi.object({
    list_size: Joi.number().min(1).integer().positive().max(100).default(10),
    page: Joi.number().min(1).integer().positive().default(1)
  }).validate(params);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value: value };
}
