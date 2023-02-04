import { CommentToken } from "../../lexer/tokens/comment.ts";
import { CommentExpression } from "../expressions/CommentExpression.ts";

export function parseComment (token: CommentToken): CommentExpression {
  const singleLine = token.value.match(/\/\/\s*([\w\W]*)/);
  if (singleLine) {
    return new CommentExpression(singleLine[1]);
  }

  const multiLine = token.value.match(/\/\*\s*([\w\W*]*)\s*\*\//);
  if (multiLine) {
    return new CommentExpression(multiLine[1]);
  }

  throw new Error(`Comment could not be parsed: \`${token.value}\``);
}