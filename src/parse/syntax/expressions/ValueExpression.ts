import { ConstructorReturnType } from "../../../types/ConstructorReturnType.ts";
import { IdentifierExpression } from "./IdentifierExpression.ts";
import { NumberExpression } from "./NumberExpression.ts";
import { PropertyAccessExpression } from "./PropertyAccessExpression.ts";
import { StringExpression } from "./StringExpression.ts";

// Parenthesis Expression
// Operator Expression
export const valueExpressions = [
  PropertyAccessExpression,
  IdentifierExpression,
  StringExpression,
  NumberExpression,
] as const;

export type ValueExpression = ConstructorReturnType<(typeof valueExpressions)[number]>
