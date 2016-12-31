var webpack=require('webpack');
var path=require('path');
var loaders=require('./webpack.loaders');
var CopyWebpackPlugin=require('copy-webpack-plugin');
module.exports={
	entry:[
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './index.jsx'
	],
	devtool:process.env.WEBPACK_DEVTOOL||'source-map',
	output:{
		path:path.join(__dirname,'build'),
		filename:'bundle.js'
	},
	resolve:{
		extensions:['','.js','.jsx']
	},
	module:{
		loaders:loaders
	},
	devServer:{
		contentBase:'./build',
		noInfo:true,
		hot:true,
		inline:true
	},
	plugins:[
       new webpack.DefinePlugin({
       	  'process.env':{
       	  	 'NODE_ENV':JSON.stringify('production')
       	  }
       }),
       new CopyWebpackPlugin([
           {from:'./index.html'}
       ])
	]
}