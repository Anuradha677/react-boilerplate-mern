// @flow

import React, {Component} from 'react';

import {getSession, login, logout} from 'components/lib/session';


type Props = {};

type State = {
	session?: Object
};


const credentials = {
	username: 'demo',
	password: 'letmein'
};

export default class SessionCheck extends Component <Props, State> {

	constructor (props: Props) {
		super (props);

		this.state = {};
	}

	componentDidMount () {
		this.checkSession ();
	}

	async checkSession () {
		await logout ();
		await login (credentials);

		const session = await getSession ()
			.catch ((err: Error) =>
				console.log ('get session error', err)
			);

		this.setState ({session});
	}

	render () {
		const {session} = this.state;

		return session ? (
			<pre className="text-left">
				{JSON.stringify (session, null, 2)}
			</pre>
		) : null;
	}
}