import { StringToken } from "../../lexer/tokens/string.ts";
import { StringExpression } from "../expressions/StringExpression.ts";

export function parseString (token: StringToken) {
  const value = token.value;
  return new StringExpression(value);
}