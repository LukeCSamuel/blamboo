import { NumberToken } from "../../lexer/tokens/number.ts";
import { NumberExpression } from "../expressions/NumberExpression.ts";

export function parseNumber (token: NumberToken) {
  const value = +token.value;
  return new NumberExpression(value);
}