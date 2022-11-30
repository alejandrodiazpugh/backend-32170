export const generateString = (length) => {
	const CHARACTERS = 'ABCDEFGHOJKLMNOPQRSTUVWXYZ';
	let result = ' ';
	for (let i = 0; i < length; i++) {
		result += CHARACTERS.charAt(
			Math.floor(Math.random() * CHARACTERS.length)
		);
	}
	return result;
};
