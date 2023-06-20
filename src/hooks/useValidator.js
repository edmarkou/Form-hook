import Joi from "joi";

const validator = {
  email: Joi.string()
    .min(3)
    .max(320)
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: false } }),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .pattern(new RegExp("[a-zA-Z0-9]")),
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .pattern(new RegExp("[a-zA-Z0-9_ ]")),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
  phone: Joi.string().length(12).required().pattern(new RegExp("[0-9-]")),
  birthYear: Joi.number().min(1900).max(2023).required(),
};

const labels = {
  name: "Name",
  email: "Email address",
  phone: "Phone",
  birthYear: "Birth year",
  password: "Password",
  confirmPassword: "Password confirmation",
  "ref:password": "matching the password",
};

function useValidator() {
  const findLabel = (inputString, regex) => {
    const matches = inputString.match(regex);

    if (matches && matches.length > 0) {
      const key = matches[0].slice(1, -1);
      return labels[key];
    }
  };

  const findWordBetweenQuotes = (inputString) => {
    const regex = /"([^"]+)"/g;
    return findLabel(inputString, regex);
  };

  const findWordBetweenBrackets = (inputString) => {
    const regex = /\[([^[\]]+)\]/g;
    return findLabel(inputString, regex);
  };

  const formatErrorMessage = (message) => {
    const quoteReplacement = findWordBetweenQuotes(message);
    let formatedMessage = message.replace(/"(.*?)"/g, quoteReplacement);

    const bracketReplacement = findWordBetweenBrackets(message);
    if (bracketReplacement) {
      formatedMessage = formatedMessage.replace(
        /\[[^\]]+\]/g,
        bracketReplacement
      );
    }
    return formatedMessage;
  };

  const validate = (data) => {
    const dataToValidate = Object.keys(data).reduce((prev, curr) => {
      if (validator[curr]) prev[curr] = validator[curr];
      return prev;
    }, {});
    const scheme = Joi.object(dataToValidate);
    return scheme.validate(data);
  };

  return { validate, formatErrorMessage };
}

export default useValidator;
