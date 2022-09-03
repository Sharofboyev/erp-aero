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
      Joi.string().email().required(),
      Joi.string().regex(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
      )
    ),
    password: Joi.string().min(5).required()
  }).validate(body);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value: value };
}