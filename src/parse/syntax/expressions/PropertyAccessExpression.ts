import { Token } from "../../lexer/tokens/index.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";
import { IdentifierExpression } from "./IdentifierExpression.ts";
import { matchExpressions } from "./index.ts";
import { valueExpressions } from "./ValueExpression.ts";

export class PropertyAccessExpression extends ExpressionBase {

  // TODO instead of expression base, valueexpressions excluding this type
  constructor (public obj: ExpressionBase, public property: IdentifierExpression | PropertyAccessExpression) {
    super('property-access-expression');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof PropertyAccessExpression> | false {
    const obj = matchExpressions(tokens, valueExpressions.filter(t => t !== PropertyAccessExpression));
    if (obj) {
      let position = obj.tokens.length;
      let expects = 'operator' as 'operator' | 'identifier';
      while (position < tokens.length) {
        const currentToken = tokens[position];

        if (currentToken.type === 'whitespace' || currentToken.type === 'comment') {
          position++;
          continue;
        }

        if (expects === 'operator' && currentToken.type === 'operator' && currentToken.value === '.') {
          expects = 'identifier';
          position++;
          continue;
        }

        if (expects === 'identifier') {
          const identifier = matchExpressions(tokens.slice(position), [PropertyAccessExpression, IdentifierExpression]);
          if (identifier) {
            return {
              tokens: tokens.slice(0, position + identifier.tokens.length),
              expression: new PropertyAccessExpression(obj.expression, identifier.expression),
            };
          }
        }

        break;
      }
    }

    return false;
  }
}