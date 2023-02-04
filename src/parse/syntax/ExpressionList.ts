import { Token } from "../lexer/tokens/index.ts";
import { ExpressionBase } from "./expressions/ExpressionBase.ts";
import { allExpressions, matchExpressions } from "./expressions/index.ts";

// TODO: this is shite, use program expression for programs and get rid of expression list

export class ExpressionList {
  body: ExpressionBase[] = [];
}

function gatherExpressions (tokens: Token[]): ExpressionBase[] {
  const expressions: ExpressionBase[] = [];

  while (tokens.length > 0) {
    const match = matchExpressions(tokens, allExpressions);
    if (match) {
      expressions.push(match.expression);
      tokens = tokens.slice(match.tokens.length);
    } else {
      tokens = tokens.slice(1);
      // TODO: better error depending on type of token
      // throw new Error('Syntax Error: Token sequence does not match any known expressions');
    }
  }

  return expressions;
}

export function buildExpressionTree (tokens: Token[]) {
  const program = new ExpressionList();
  program.body = gatherExpressions(tokens);
  return program;
}
