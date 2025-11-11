/**
 * Convert an arbitrary string into camelCase.
 *
 * This function:
 *  - Throws a TypeError if input is null, undefined, or not a string.
 *  - Trims surrounding whitespace from the input.
 *  - Splits the trimmed string on any sequence of non-alphanumeric characters
 *    (spaces, underscores, hyphens, punctuation, etc.).
 *  - If the resulting parts array is empty (e.g. the string contained only
 *    separators or whitespace), returns an empty string.
 *  - Lowercases the first part entirely.
 *  - For each subsequent part, lowercases the part then capitalizes its first
 *    character (so "USER_ID" -> ["user","id"] -> "userId").
 *  - Preserves digits and treats them as part of words (e.g. "v1_release" -> "v1Release").
 *
 * Notes and edge cases:
 *  - Leading, trailing, and repeated separators are collapsed by the split/filter logic.
 *  - Non-ASCII letters are treated according to JavaScript string methods (toLowerCase/toUpperCase).
 *  - If a part begins with a digit, capitalizing the first character will have no effect on that character.
 *
 * @function toCamelCase
 * @param {string} input - The input string to convert. Must be a non-null, defined string.
 * @returns {string} The camelCase representation of the input. Returns an empty string for empty or separator-only input.
 * @throws {TypeError} If input is null or undefined, or if input is not of type string.
 *
 * @example
 * toCamelCase('first name');    // -> 'firstName'
 * @example
 * toCamelCase('user_id');       // -> 'userId'
 * @example
 * toCamelCase('SCREEN_NAME');   // -> 'screenName'
 * @example
 * toCamelCase('mobile-number'); // -> 'mobileNumber'
 * @example
 * toCamelCase('trying_out');    // -> 'tryingOut'
 * @example
 * toCamelCase('   ');           // -> ''
 * @example
 * toCamelCase('_leading__sep'); // -> 'leadingSep'
 */

/**
 * Convert an arbitrary string into dot.case (lowercase words separated by dots).
 *
 * This function:
 *  - Throws a TypeError if input is null, undefined, or not a string.
 *  - Trims surrounding whitespace from the input.
 *  - Inserts separators for camelCase / PascalCase boundaries so that
 *    compound identifiers become separate tokens:
 *      - Splits between a lowercase/digit followed by an uppercase (fooBar -> foo.Bar)
 *      - Splits between a run of uppercase letters and an uppercase followed by lowercase/digit
 *        (HTTPServer -> HTTP.Server)
 *  - Replaces any sequence of non-alphanumeric characters with a single dot.
 *  - Collapses consecutive dots into a single dot, and trims leading/trailing dots.
 *  - Converts the entire result to lowercase.
 *  - Preserves digits as part of words (e.g. "version2Alpha" -> "version2.alpha").
 *
 * Notes and edge cases:
 *  - Acronyms are handled by the boundary rules so that HTTPServer becomes "http.server" after lowercasing.
 *  - If the input reduces to no tokens (only separators/whitespace), the function returns an empty string.
 *
 * @function toDotCase
 * @param {string} input - The input string to convert. Must be a non-null, defined string.
 * @returns {string} The dot.case (lowercased, dot-separated) representation of the input. Returns an empty string for empty or separator-only input.
 * @throws {TypeError} If input is null or undefined, or if input is not of type string.
 *
 * @example
 * toDotCase('first name');    // -> 'first.name'
 * @example
 * toDotCase('user_id');       // -> 'user.id'
 * @example
 * toDotCase('SCREEN_NAME');   // -> 'screen.name'
 * @example
 * toDotCase('mobile-number'); // -> 'mobile.number'
 * @example
 * toDotCase('tryingOut');     // -> 'trying.out'
 * @example
 * toDotCase('HTTPServer');    // -> 'http.server'
 * @example
 * toDotCase('...multiple---separators__'); // -> 'multiple.separators'
 */
 * Convert a string to camelCase.
 *
 * Examples:
 *  toCamelCase('first name')   -> 'firstName'
 *  toCamelCase('user_id')      -> 'userId'
 *  toCamelCase('SCREEN_NAME')  -> 'screenName'
 *  toCamelCase('mobile-number')-> 'mobileNumber'
 *  toCamelCase('trying_out')   -> 'tryingOut'
 *
 * Throws a TypeError for null/undefined or non-string inputs (e.g. toCamelCase(1)).
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
    if (input === null || input === undefined) {
        throw new TypeError('toCamelCase: input is null or undefined; expected a non-empty string');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`toCamelCase: expected a string but received ${typeof input}`);
    }

    const str = input.trim();
    if (str.length === 0) return '';

    // Split on any sequence of non-alphanumeric characters (space, underscore, hyphen, punctuation, etc.)
    const parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    const first = parts[0].toLowerCase();
    const rest = parts.slice(1).map(p => {
        const lower = p.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return [first, ...rest].join('');
}

/**
 * Convert a string to dot.case (lowercase words separated by dots).
 *
 * Examples:
 *  toDotCase('first name')    -> 'first.name'
 *  toDotCase('user_id')       -> 'user.id'
 *  toDotCase('SCREEN_NAME')   -> 'screen.name'
 *  toDotCase('mobile-number') -> 'mobile.number'
 *  toDotCase('tryingOut')     -> 'trying.out'
 *
 * Throws a TypeError for null/undefined or non-string inputs.
 *
 * @param {string} input
 * @returns {string}
 */
function toDotCase(input) {
    if (input === null || input === undefined) {
        throw new TypeError('toDotCase: input is null or undefined; expected a non-empty string');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`toDotCase: expected a string but received ${typeof input}`);
    }

    const str = input.trim();
    if (str.length === 0) return '';

    // Insert separators for camelCase / PascalCase boundaries, then replace non-alphanumerics with dots.
    const withBoundaries = str
        .replace(/([a-z0-9])([A-Z])/g, '$1.$2')         // fooBar -> foo.Bar
        .replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1.$2');  // HTTPServer -> HTTP.Server

    const parts = withBoundaries
        .replace(/[^A-Za-z0-9]+/g, '.') // non-alnum -> dot
        .replace(/\.+/g, '.')           // collapse multiple dots
        .replace(/^\.*|\.*$/g, '')      // trim leading/trailing dots
        .toLowerCase();

    return parts;
}

module.exports = { toCamelCase, toDotCase };

