import { ConstructorReturnType } from "../../../types/ConstructorReturnType.ts";
import { Token } from "../../lexer/tokens/index.ts";

export abstract class ExpressionBase {
  constructor (public type = 'unknown') { }
}

export interface ExpressionMatchResult<T extends ExpressionClass> {
  tokens: Token[]
  expression: ConstructorReturnType<T>
}

export interface ExpressionClass {
  match (tokens: Token[]): ExpressionMatchResult<this> | false
}
