import { Token, tryToken } from "./tokens/index.ts";

export function tokenize (input: string) {
  let cursor = 0;
  const tokens: Token[] = [];

  while (cursor < input.length) {
    const remaining = input.substring(cursor);
    const token = tryToken(remaining);

    if (token.type === 'unknown') {
      // TODO: compute line & col number
      throw new Error(`Unexpected token: ${token.value}`);
    }

    cursor += token.value.length;
    tokens.push(token);
  }

  return tokens;
}
