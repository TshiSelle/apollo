const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a new schema instance which defines the structure for a page every time one is created
//page has a title and a body
const pageSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
		},
		_UID: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

//creating a model of the schema above to show for the interface
const Page = mongoose.model('Page', pageSchema);

//exporting the Page model for outside scripts to read
module.exports = { Page };
