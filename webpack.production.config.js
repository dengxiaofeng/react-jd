var webpack=require('webpack');
var path=require('path');
var loaders=require('./webpack.loaders');
var CopyWebpackPlugin=require('copy-webpack-plugin');
var fs=require('fs');
var buildPath='./build/';
var folder_exists=fs.existsSync(buildPath);
if(folder_exists==true){
	var dirList=fs.readdirSync(buildPath);
	dirList.forEach(function(filename){
		fs.unlinkSync(buildPath+filename)
	});
	console.log('clearing'+buildPath)
}
module.exports={
	entry:[
       './index.jsx'
	],
	output:{
		exports:['','.js','.jsx']
	},
	module:[
      loaders:loaders
	],
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