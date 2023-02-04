import { Token } from "../../lexer/tokens/index.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";
import { matchExpressions } from "./index.ts";
import { ParameterListExpression } from "./ParameterListExpression.ts";
import { ValueExpression, valueExpressions } from "./ValueExpression.ts";

export class FunctionCallExpression extends ExpressionBase {
  constructor (public func: ValueExpression, public parameters: ParameterListExpression) {
    super('function-call');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof FunctionCallExpression> | false {
    const func = matchExpressions(tokens, valueExpressions);
    if (func) {
      let position = func.tokens.length;
      while (position < tokens.length) {
        const currentToken = tokens[position];

        // ignore whitespace & comments
        if (currentToken.type === 'whitespace' || currentToken.type === 'comment') {
          position++;
          continue;
        }

        // try to match a parameter list
        const params = matchExpressions(tokens.slice(position), [ParameterListExpression]);
        if (params) {
          return {
            tokens: tokens.slice(0, position + params.tokens.length),
            expression: new FunctionCallExpression(func.expression, params.expression),
          }
        }

        break;
      }
    }

    return false;
  }
}