import { Token } from "../../lexer/tokens/index.ts";
import { parseString } from "../parsers/parseString.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";

export class StringExpression extends ExpressionBase {
  constructor (public value: string) {
    super('string');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof this> | false {
    const token = tokens[0];
    if (token.type === 'string') {
      return {
        tokens: [token],
        expression: parseString(token)
      };
    } else {
      return false;
    }
  }
}