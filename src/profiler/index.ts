import chokidar from "chokidar"
import path from "node:path"
import fs from "node:fs"

import { exec } from "node:child_process"
import { copyFolder } from "./files"

const dir = path.join(process.cwd(), "_temp")
const destDir = path.join(process.cwd(), "src/views")

const profiler = chokidar.watch(dir, {
	ignored: '*.txt'
})

function serverUp() {
	exec("yarn server:dev")
}

function setup() {
	copyFolder(dir, destDir)

	console.log("Setup done. Forwarding..")
}

//TODO: Create reload server function
//TODO: Create shutdown server function

export { profiler, setup, serverUp }
