import util from 'util';

export default function print(obj) {
	// console.log(util.inspect(obj, false, 12, true));
	console.log(util.inspect(obj, false, 12, true).length);
}
