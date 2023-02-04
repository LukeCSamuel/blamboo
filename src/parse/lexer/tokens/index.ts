import { BraceToken, BraceTokenType, tryBraceToken } from "./brace.ts";
import { BracketToken, BracketTokenType, tryBracketToken } from "./bracket.ts";
import { CommentToken, CommentTokenType, tryCommentToken } from "./comment.ts";
import { IdentifierToken, IdentifierTokenType, tryIdentifierToken } from "./identifier.ts";
import { KeywordToken, KeywordTokenType, tryKeywordToken } from "./keywords.ts";
import { NumberToken, NumberTokenType, tryNumberToken } from "./number.ts";
import { OperatorToken, OperatorTokenType, tryOperatorToken } from "./operator.ts";
import { ParenToken, ParenTokenType, tryParenToken } from "./paren.ts";
import { StringToken, StringTokenType, tryStringToken } from "./string.ts";
import { createUnknownToken, UnknownToken, UnknownTokenType } from "./unknown.ts";
import { tryWhitespaceToken, WhitespaceToken, WhitespaceTokenType } from "./whitespace.ts";

export type TokenType =
  | CommentTokenType
  | NumberTokenType
  | StringTokenType
  | ParenTokenType
  | BracketTokenType
  | BraceTokenType
  | OperatorTokenType
  | KeywordTokenType
  | IdentifierTokenType
  | WhitespaceTokenType
  | UnknownTokenType

export type Token =
  | CommentToken
  | NumberToken
  | StringToken
  | ParenToken
  | BracketToken
  | BraceToken
  | OperatorToken
  | KeywordToken
  | IdentifierToken
  | WhitespaceToken
  | UnknownToken

export function tryToken (input: string): Token {
  return tryCommentToken(input)
    || tryNumberToken(input)
    || tryStringToken(input)
    || tryParenToken(input)
    || tryBracketToken(input)
    || tryBraceToken(input)
    || tryOperatorToken(input)
    || tryKeywordToken(input)
    || tryIdentifierToken(input)
    || tryWhitespaceToken(input)
    || createUnknownToken(input);
}