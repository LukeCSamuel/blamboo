import { Token } from "../../lexer/tokens/index.ts";
import { parseComment } from "../parsers/parseComment.ts";
import { ExpressionBase, ExpressionMatchResult } from "./ExpressionBase.ts";

export class CommentExpression extends ExpressionBase {
  constructor (public value: string) {
    super('comment');
  }

  static match (tokens: Token[]): ExpressionMatchResult | false {
    const token = tokens[0];
    if (token.type === 'comment') {
      return {
        tokens: [token],
        expression: parseComment(token)
      }
    } else {
      return false;
    }
  }
}