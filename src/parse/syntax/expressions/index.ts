import { Token } from "../../lexer/tokens/index.ts";
import { ExpressionClass, ExpressionMatchResult } from "./ExpressionBase.ts";
import { StatementExpression } from "./StatementExpression.ts";

export const allExpressions = [
  StatementExpression,
] as const;

export function matchExpressions<T extends ExpressionClass> (tokens: Token[], expressions: readonly T[]): ExpressionMatchResult<T> | false {
  for (const expression of expressions) {
    const result = expression.match(tokens);
    if (result) {
      return result;
    }
  }

  return false;
}
