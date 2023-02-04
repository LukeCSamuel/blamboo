import { Token } from "../../lexer/tokens/index.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";
import { matchExpressions } from "./index.ts";
import { ValueExpression, valueExpressions } from "./ValueExpression.ts";

export class ParameterListExpression extends ExpressionBase {
  constructor (public parameters: ValueExpression[]) {
    super('parameter-list');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof ParameterListExpression> | false {
    const open = tokens[0];
    const parameters: ValueExpression[] = [];
    let position = 1;
    let expectsNext = 'value' as 'value' | 'operator';

    if (open.type === 'paren' && open.value === '(') {
      while (position < tokens.length) {
        const currentToken = tokens[position];

        if (currentToken.type === 'whitespace' || currentToken.type === 'comment') {
          position++;
          continue;
        }

        // try to match a value
        if (expectsNext === 'value') {
          const parameter = matchExpressions(tokens.slice(position), valueExpressions);

          if (parameter) {
            position += parameter.tokens.length;
            parameters.push(parameter.expression);
            expectsNext = 'operator';
            continue;
          }
        }

        // try to match a comma or end the expression
        if (expectsNext === 'operator' && currentToken.type === 'operator' && currentToken.value === ',') {
          expectsNext = 'value';
          position++;
          continue;
        }

        if (currentToken.type === 'paren' && currentToken.value === ')') {
          return {
            tokens: tokens.slice(0, position),
            expression: new ParameterListExpression(parameters)
          };
        }

        break;
      }
    }

    return false;
  }
}