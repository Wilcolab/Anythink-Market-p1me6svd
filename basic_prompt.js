// basic_prompt.js
// Prompt for implementing a camelCase converter function

const prompt = `Write a JavaScript function named toCamelCase(str) that converts a given string to camelCase.

Requirements:
- Accepts any string containing letters, digits, spaces, hyphens, underscores, and punctuation.
- Treat spaces, hyphens, underscores, and any non-alphanumeric characters as word separators.
- Output is a single camelCase string: the first word all lowercase; each subsequent word with an uppercase first letter and the rest lowercase.
- Preserve digits within words.
- Ignore extra separators and trim leading/trailing separators.
- If the input has no alphanumeric characters, return an empty string.

Examples:
- toCamelCase('hello world') -> 'helloWorld'
- toCamelCase(' Convert_to-Camel CASE! ') -> 'convertToCamelCase'
- toCamelCase('user_id') -> 'userId'`;

module.exports = prompt;