/**
 * @Description: ""
 * @Author: YOYO [792611446@qq.com]
 * @LastEditors:   YOYO [792611446@qq.com]
 * @Date:   2019-07-25 09:29:25
 * @LastEditTime: 2019-07-25 10:33:09
 */

let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');

let server = http.createServer((req, res) => {
	// 1.获取请求地址
	let reqUrl = url.parse(req.url)
	let pathName = reqUrl.pathname

	// 2. 路径处理
	if (pathName.indexOf('.') == -1) {
		pathName += '/index.html'
	}

	// 3. 路径拼接
	let fileUrl = './' + path.normalize('dist' + pathName)

	// 4. 根据路径读取文件
	fs.readFile(fileUrl, (err, data) => {
		// 4.1 没有找到文件
		if(err) {
			console.log(1, fileUrl)
			// throw err
			res.writeHead(404, {'Content-Type': 'text/html;charset=UTF-8'})
			res.end('<h1>404, 没有找到该页面</h1>')
		} else {
			console.log(2, fileUrl)
			// 4.2 找到文件，根据后缀返回相应的'Content-Type'和文件
			let extname = path.extname(pathName)
			getContentType(extname, (contentType) => {
				res.writeHead(200, {'Content-Type': contentType})
				res.end(data)
			})
		}	
	})
	// res.end('ok!')
})

server.listen(8080, '127.0.0.1')

// 把常见的Content-Type生成一个json文件（mime），通过以下函数调用返回
function getContentType (extname, callback) {
	fs.readFile('./mime.json', (err, data) => {
		if (err) {
			throw err;
			return;
		}
		let mimeJson = JSON.parse(data)
		let contentType = mimeJson[extname] || 'text/plain'
		callback(contentType)
	})
}