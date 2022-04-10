import chokidar from "chokidar"
import path from "node:path"
import fs from "node:fs"

import { exec } from "node:child_process"

const valid_extensions = [
	".html", ".css", ".js"
]
const dir = path.join(process.cwd(), "_temp")
const destDir = path.join(process.cwd(), "src/views")
const profiler = chokidar.watch(dir, {
	ignored: '*.txt'
})

function hasValidExtension(filename:string) {
	let valids:number[] = []
  
	for (let ext of valid_extensions) {
		if(!filename.includes(ext)) {
			valids.push(0)
		} else {
			valids.push(1)
		}
	}
	
	return valids.some(i => i === 1);
}

function copyFile(filename:string) {
	if(hasValidExtension(filename)) {
		const src = `${dir}/${filename}`
  	const dest = `${destDir}/${
  		filename.includes(".html") ?
   		filename.replace(".html", ".hbs") :
			filename
  	}`

  	fs.cp(src, dest, (err) => (err && console.log(err)))
	}
}

function serverUp() {
	exec("yarn server:dev")
}

function setup() {
	fs.readdir(dir, (err, files) => {
		if (err) {
			console.log(err)
			return;
		}

		console.log(files)
	  //files.forEach(file => copyFile(file))
	})

	console.log("Setup done. Forwarding..")
}

//TODO: Create reload server function
//TODO: Create shutdown server function

export { profiler, setup, serverUp }
