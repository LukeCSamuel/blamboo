import { Token } from "../../lexer/tokens/index.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";

export class IdentifierExpression extends ExpressionBase {
  constructor (public identifier: string) {
    super('identifier');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof IdentifierExpression> | false {
    const token = tokens[0];
    if (token.type === 'identifier') {
      return {
        tokens: [token],
        expression: new IdentifierExpression(token.value)
      };
    } else {
      return false;
    }
  }
}