// http://eslint.org/docs/user-guide/configuring
const isDebug = process.env.NODE_ENV !== 'production'

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	env: {
		browser: true
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: [
		'standard',
		'plugin:vue/essential',
		'@vue/standard'
		// 有了prettier，禁用eslint相关代码格式化规则
		// 'prettier'
	],
	// required to lint *.vue files
	plugins: ['vue', 'filenames', 'prettier'],
	// add your custom rules here
	rules: {
		// 是否启用prettier代码格式化规则校验
		'prettier/prettier': 0,
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': !isDebug ? 2 : 0,
		'space-before-function-paren': 'off',
		'padded-blocks': 0,
		'no-trailing-spaces': 0,
		'no-multiple-empty-lines': 0,
		'no-unused-vars': 0,
		// "indent": ["error", "tab"],
		indent: 0,
		'no-tabs': 0,
		'no-mixed-spaces-and-tabs': 0,
		semi: 0,
		'one-var': 0,
		'spaced-comment': 0,
		camelcase: 0,
		// eslint-plugin-filenames
		'filenames/match-regex': [2, '^[a-z-]+$', true],
		'filenames/match-exported': [2, 'kebab'],
		// 允许index.js作为重新导出
		'filenames/no-index': 0,
		'object-curly-spacing': 0,
		// 取消模板变量空格规则，解决eslint报错TypeError: Cannot read property 'range' of null,
		// https://github.com/babel/babel-eslint/issues/681
		'template-curly-spacing': 'off',
		// 逗号配置
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'ignore',
				imports: 'never',
				exports: 'never',
				functions: 'never'
			}
		]
	}
}