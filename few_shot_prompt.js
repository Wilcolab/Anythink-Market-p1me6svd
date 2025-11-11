// few_shot_prompt.js
// Converts a string to camelCase.
// Examples:
//   "first name"   -> "firstName"
//   "user_id"      -> "userId"
//   "SCREEN_NAME"  -> "screenName"
//   "mobile-number"-> "mobileNumber"

function toCamelCase(input) {
    if (typeof input !== 'string') return '';
    // Split on any sequence of non-alphanumeric characters (spaces, underscores, hyphens, etc.)
    const parts = input.split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    return parts
        .map((part, idx) => {
            const lower = part.toLowerCase();
            if (idx === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

module.exports = toCamelCase;

// Quick manual tests (uncomment to run)
// console.log(toCamelCase('first name'));       // firstName
// console.log(toCamelCase('user_id'));          // userId
// console.log(toCamelCase('SCREEN_NAME'));      // screenName
// console.log(toCamelCase('mobile-number'));    // mobileNumber