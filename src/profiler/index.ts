import chokidar from "chokidar"
import path from "node:path"
import fs from "node:fs"

import { exec } from "node:child_process"

const dir = path.join(process.cwd(), "_temp")
const destDir = path.join(process.cwd(), "src/views")
const profiler = chokidar.watch(dir, {
	ignored: '*.txt'
})

function copyFile(filename:string) {
	const src = `${dir}/${filename}`
	const dest = `${destDir}/${filename.replace(".html", ".hbs")}`
	fs.copyFile(src, dest, 0, err => {
		if (err) {
			console.log("Falied to copy file.\n", err)
		}
  })
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

	  files.forEach(file => {
			if (file.includes(".html")) {
				copyFile(file)
			}
		})
	})

	console.log("Setup done. Forwarding..")
}

//TODO: Create reload server function
//TODO: Create shutdown server function

export { profiler, setup, serverUp }
