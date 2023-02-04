import { tokenize } from "./parse/lexer/tokenizer.ts";
import { buildExpressionTree } from "./parse/syntax/ExpressionList.ts";

const targets = Deno.args;

async function compile (filename: string) {
  if (!filename) {
    console.log('ERROR: No target was specified');
    return;
  }

  try {
    const program = await Deno.readTextFile(filename);

    const tokens = tokenize(program);
    const expressionTree = buildExpressionTree(tokens);

    console.log(expressionTree);

    await Deno.writeTextFile(filename + '.ast.json', JSON.stringify(expressionTree));
  } catch (e) {
    console.log(e.message);
  }
}

for (const target of targets) {
  if (target) {
    compile(target);
  }
}
