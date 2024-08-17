/**
 * @param number
 *
 * @returns number
 *
 * Input: 1234567890
 *
 * Output: 1,234,567,890
 */
export const separateDigitsByColon = (number: number) => {
	return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
