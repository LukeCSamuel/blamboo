export type IdentifierTokenType = 'identifier'

export type IdentifierToken = {
  type: IdentifierTokenType
  value: string
}

export function tryIdentifierToken (input: string): IdentifierToken | false {
  const matches = input.match(/^[_\$A-Za-z][_\$A-Za-z0-9]*/);
  if (matches) {
    return {
      type: 'identifier',
      value: matches[0]
    };
  } else {
    return false;
  }
}