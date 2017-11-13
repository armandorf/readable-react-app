/**
 * Hyphenate title. Steps:
 *   1) Replace all non-digit, non-string, non-space, and non-hyphen characters with '',
 *   2) trim, and 
 *   3) then replace all spaces with '-'
 */
export const hyphenateTitle = (str = '') => str.replace(/[^a-zA-Z\d\s\-]/g, '').trim().replace(/ +/g, '-').toLowerCase();
