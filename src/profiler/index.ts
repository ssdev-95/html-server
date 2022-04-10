import chokidar from "chokidar"
import path from "node:path"
import fs from "node:fs"

import { exec } from "node:child_process"
import { copyFolder } from "./files"

const dir = path.join(process.cwd(), "_temp")
const destDir = path.join(process.cwd(), "src/views")
const PORT = process.env.PORT ?? 9999

const profiler = chokidar.watch(dir, {
	ignored: '*.txt'
})

function serverUp() {
	exec("yarn server:dev")
	console.log(`Server up and running at port ${PORT}`)
}

function setup() {
	copyFolder(dir, destDir)

	setTimeout(
		() => console.log("Setup done. Forwarding.."),
	  20000
	)
}

//TODO: Create reload server function
//TODO: Create shutdown server function

export { profiler, setup, serverUp }
