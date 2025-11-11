/**
 * Convert a string to kebab-case.
 * - handles spaces, underscores, camelCase and PascalCase
 * - collapses non-alphanumeric runs to single hyphens
 *
 * @param {string} input
 * @returns {string}
 * @throws {TypeError} if input is not a string
 * @throws {Error} if input is an empty or whitespace-only string
 */
function toKebabCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('toKebabCase: input must be a string');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('toKebabCase: input must not be empty or only whitespace');
    }

    // 1) Break camelCase/PascalCase boundaries
    //    e.g. "fooBar" -> "foo-Bar", "XMLHttpRequest" -> "XML-Http-Request"
    const withBoundaries = trimmed
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z0-9])/g, '$1-$2');

    // 2) Replace spaces/underscores/other non-alphanumerics with hyphens,
    //    collapse multiple hyphens, trim leading/trailing hyphens, and lowercase
    const kebab = withBoundaries
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();

    return kebab;
}

module.exports = toKebabCase;