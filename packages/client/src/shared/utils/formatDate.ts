export const formatDate = (value: string | number): string => {
	const date = new Date(value);
	let day: number | string = date.getDate();
	let month: number | string = date.getMonth() + 1;
	const year: number = date.getFullYear();
	let hour: number | string = date.getHours();
	let minute: number | string = date.getMinutes();
	let second: number | string = date.getSeconds();
	if (day < 10) day = '0' + day;
	if (month < 10) month = '0' + month;
	if (hour < 10) hour = '0' + hour;
	if (minute < 10) minute = '0' + minute;
	if (second < 10) second = '0' + second;
	return `${day}.${month}.${year} в ${hour}:${minute}:${second}`;
};
