export type BraceTokenType = 'brace'

export type BraceToken = {
  type: BraceTokenType
  value: '{' | '}'
}

export function tryBraceToken (input: string): BraceToken | false {
  const matches = input.match(/^(?:\{|\})/);
  if (matches) {
    return {
      type: 'brace',
      value: matches[0] as '{' | '}'
    };
  } else {
    return false;
  }
}
