// @flow

import mongoose from 'mongoose';


import type {MongooseDocument} from 'mongoose';

type schemaFields = {
	name: string
};

export type ExampleMongooseDoc = MongooseDocument & schemaFields;


const schema = new mongoose.Schema ({

	name: {
		type: String,
		required: true,
		unique: true,
		index: true
	}

}, {
	versionKey: false
});

export default mongoose.model ('ExampleModel', schema)