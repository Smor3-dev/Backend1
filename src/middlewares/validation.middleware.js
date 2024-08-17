import { userDto } from "../dtos/user.dto.js";

export function validateContact(req, res, next) {
  const { firstName, lastName, email, phone, address } = req.body;

  if (!firstName || !lastName || !email || !phone || !address) {
    return res.status(400).json({
      error: "Falta información",
    });
  }

  console.log(req.body);

  const contact = new userDto(firstName, lastName, email, phone, address);

  req.contact = contact;

  next();
}

export function validate(schema) {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    next();
  };
}

export function transformContact(req, res, next) {
  if (req.body.firstName && req.body.lastName) {
    req.body.name = `${req.body.firstName} ${req.body.lastName}`;
    delete req.body.firstName;
    delete req.body.lastName;
  }

  next();
}