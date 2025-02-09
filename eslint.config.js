import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

import { fileURLToPath } from 'node:url';

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
	js.configs.recommended,
	...ts.configs.stylisticTypeChecked,
	...ts.configs.recommendedTypeCheckedOnly,
	...ts.configs.strict,
	...svelte.configs["flat/recommended"],
	includeIgnoreFile(gitignorePath),
  {
    ignores: [
      "*.{ts,js,mjs,cjs}",
    ]
  },
  {
    // files: ["**/*.svelte"],
    files: ['**/*.{ts,js,mjs,cjs}', "**/*.svelte"],
		languageOptions: {
      parserOptions: {
        parser: ts.parser,
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.svelte']
			}
		}
	},
  {
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				}]
		}
	}
);
