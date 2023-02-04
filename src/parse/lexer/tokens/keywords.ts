export type KeywordTokenType = 'keyword'

export const keywords = [
  'arguments',
  'as',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'finally',
  'float',
  'for',
  'function',
  'if',
  'import',
  'in',
  'inject',
  'instanceof',
  'int',
  'let',
  'new',
  'null',
  'of',
  'provide',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'type',
  'typeof',
  'undefined',
  'var',
  'void',
  'while',
  'with',
  'yield',
] as const;

const exp = new RegExp(`^(?:${keywords.join('|')})`)

export type KeywordToken = {
  type: KeywordTokenType
  value: (typeof keywords)[number]
}

export function tryKeywordToken (input: string): KeywordToken | false {
  const matches = input.match(exp);
  if (matches) {
    return {
      type: 'keyword',
      value: matches[0] as (typeof keywords)[number]
    };
  } else {
    return false;
  }
}
