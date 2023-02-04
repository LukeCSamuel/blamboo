import { Token } from "../../lexer/tokens/index.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";
import { FunctionCallExpression } from "./FunctionCallExpression.ts";
import { matchExpressions } from "./index.ts";

export class StatementExpression extends ExpressionBase {
  constructor (public statement: ExpressionBase) {
    super('statement');
  }

  static match (tokens: Token[]): ExpressionMatchResult<typeof this> | false {
    // a statement is
    //   a class declaration
    //   a function declaration
    //   a function call
    //   a set operation
    //   a control flow operation
    
    const match = matchExpressions(tokens, [
      FunctionCallExpression
    ]);

    if (match) {
      return {
        expression: new StatementExpression(match.expression),
        tokens: match.tokens
      };
    } else {
      return false;
    }
  }
}