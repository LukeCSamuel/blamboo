export type NumberTokenType = 'number'

export type NumberToken = {
  type: NumberTokenType
  value: string
}

export function tryNumberToken (input: string): NumberToken | false {
  const matches = input.match(/^(?:[0-9]+(?:\.[0-9]*)|0x[0-9a-fA-F]+|0b[01]+)/);
  if (matches) {
    return {
      type: 'number',
      value: matches[0]
    };
  } else {
    return false;
  }
}
