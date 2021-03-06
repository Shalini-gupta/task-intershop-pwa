import { tsquery } from '@phenomnomnominal/tsquery';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export const kebabCaseFromPascalCase = (input: string): string =>
  input
    .replace(/[A-Z]{2,}$/, m => `${m.substr(0, 1)}${m.substr(1, m.length - 1).toLowerCase()}`)
    .replace(
      /[A-Z]{3,}/g,
      m => `${m.substr(0, 1)}${m.substr(1, m.length - 2).toLowerCase()}${m.substr(m.length - 1, 1)}`
    )
    .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
    .replace(/^-/, '');

const camelCaseFromPascalCase = (input: string): string =>
  `${input.substring(0, 1).toLowerCase()}${input.substring(1)}`;

export class Rule extends Lint.Rules.AbstractRule {
  warnUnmatched = false;
  patterns: { name: RegExp; file: string }[] = [];
  ignoredFiles: RegExp[];
  pathPatterns: RegExp[];

  constructor(options: Lint.IOptions) {
    super(options);
    const config = options.ruleArguments[0];
    if (config) {
      this.warnUnmatched = !!config.warnUnmatched;
      const reusePatterns = config.reusePatterns || {};
      this.patterns = (config.patterns || []).map(p => ({
        name: this.makeRegex(p.name, reusePatterns),
        file: this.makeRegex(p.file, reusePatterns, false),
      }));
      this.ignoredFiles = (config.ignoredFiles || []).map(p => this.makeRegex(p, reusePatterns));
      this.pathPatterns = (config.pathPatterns || []).map(p => this.makeRegex(p, reusePatterns));
    }
  }

  private makeRegex(pattern: string, reusePatterns: { [name: string]: string }, asRegex = true): RegExp | string {
    const newPattern = pattern.replace(/<(.*?)>/g, (original, reuse) => reusePatterns[reuse] ?? original);
    return asRegex ? new RegExp(newPattern) : newPattern;
  }

  apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const isIgnored = this.ignoredFiles.some(ignoredPattern => ignoredPattern.test(sourceFile.fileName));

    if (isIgnored) {
      return [];
    }

    const matchesPathPattern = this.pathPatterns.some(pattern => pattern.test(sourceFile.fileName));
    if (!matchesPathPattern) {
      return [
        new Lint.RuleFailure(sourceFile, 0, 1, `this file path does not match any defined patterns`, this.ruleName),
      ];
    }

    return this.applyWithFunction(sourceFile, ctx => {
      tsquery(ctx.sourceFile, '*')
        .filter(
          node =>
            ts.isVariableDeclaration(node) ||
            ts.isFunctionDeclaration(node) ||
            ts.isInterfaceDeclaration(node) ||
            ts.isClassDeclaration(node)
        )
        .forEach(node => this.visitDeclaration(ctx, node));
    });
  }

  visitDeclaration(ctx: Lint.WalkContext<void>, node: { name?: ts.Node } & ts.Node) {
    const name = node.name.getText();
    const matchingPatterns = this.patterns
      .map(pattern => ({ pattern, match: pattern.name.exec(name) }))
      .filter(x => !!x.match);

    if (matchingPatterns.length >= 1 && matchingPatterns[0].match[1]) {
      const config = matchingPatterns[0];
      const matched = config.match[1];
      const pathPattern = config.pattern.file
        .replace(/<kebab>/g, kebabCaseFromPascalCase(matched))
        .replace(/<camel>/g, camelCaseFromPascalCase(matched));

      if (!new RegExp(pathPattern).test(ctx.sourceFile.fileName)) {
        ctx.addFailureAtNode(node.name, `'${name}' is not in the correct file (expected '${pathPattern}')`);
      }
    } else if (matchingPatterns.length === 0 && this.warnUnmatched) {
      console.warn(`no pattern match for ${name} in file ${ctx.sourceFile.fileName}`);
    }
  }
}
