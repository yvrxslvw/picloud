module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2021,
		sorceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'react-refresh', 'react-hooks'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['/dist', '/.eslintrc.cjs', '/node_modules', '/vite.config.ts'],
	rules: {
		'import/prefer-default-export': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,
		semi: 2,
		'no-console': 1,
		'no-multi-spaces': 2,
		'space-infix-ops': 2,
		'arrow-spacing': 2,
		'func-style': [2, 'expression'],
		indent: [2, 'tab', { SwitchCase: 1 }],
		'eol-last': 2,
		'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0 }],
		'react-hooks/exhaustive-deps': 0,
		'react/react-in-jsx-scope': 0,
		'react/display-name': 0,
		'react/prop-types': 0,
	},
};
