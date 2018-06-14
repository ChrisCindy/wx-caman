module.exports = {
  root: true,
  parser: 'babel-eslint',
	parserOptions: {
    ecmaFeatures: {
      "modules": true,
      "classes": true
    },
    ecmaVersion: 6
  },
  globals: {
    wx: false
  },
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'semi': ['error', 'never'],
		'indent': 0,
		'space-before-function-paren': 0,
    'eol-last': 0
    // 'babel/semi': 1
	}
}
