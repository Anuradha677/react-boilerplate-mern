// @flow


export default async (name: string, password: string) => {
	if (password === 'letmein') {
		console.log (`* creating session for ${name}`);

		return {id: new Date ().getTime (), name};
	}
}