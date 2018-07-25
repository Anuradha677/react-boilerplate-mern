// @flow

import express from 'express';


import type {$Response} from 'express';
import type {PassportRequest} from 'server/session/passport';


export default express.Router ()

	.use ('*', (req: PassportRequest, res: $Response) =>
		res
			.status (404)
			.json ({
				message: 'not implemented'
			})
	);