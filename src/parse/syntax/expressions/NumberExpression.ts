import { Token } from "../../lexer/tokens/index.ts";
import { parseNumber } from "../parsers/parseNumber.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";

export class NumberExpression extends ExpressionBase {
  constructor (public value: number) {
    super('number');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof this> | false {
    const token = tokens[0];
    if (token.type === 'number') {
      return {
        tokens: [token],
        expression: parseNumber(token)
      };
    } else {
      return false;
    }
  }
}