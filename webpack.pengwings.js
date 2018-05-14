module.exports = {
	entry: 'app',

	output: {
		filename: '[name].js'
	},

	context: path.join(__dirname, 'src'),

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor-[hash].min.js'
		})
	]
};
