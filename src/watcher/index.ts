import "dotenv/config"
import chokidar from "chokidar"
import path from "node:path"

import { exec } from "node:child_process"
import { copyFolder } from "./files"

const mode = process.env.NODE_ENV
const destDir = path.join(process.cwd(), "_temp")

let watcher: chokidar.FSWatcher

function serverUp() {
	if(mode === "PRODUCTION") {
    exec("yarn server:start")
  } else {
    exec("yarn server:dev")
  }
}

function setup(dir:string) {
  watcher = chokidar.watch(dir, {
    ignored: '*.txt'
  })

	copyFolder(dir, destDir)

	console.log("Setup done. Forwarding..")
}

const profiler = { watcher, setup, serverUp }

export default profiler;
export { setup, serverUp, watcher };