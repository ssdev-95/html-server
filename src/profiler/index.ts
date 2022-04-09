import chokidar from "chokidar"
import path from "node:path"

const dir = path.join(pwd(), "_temp")
const profiler = chokidar.watch(dir)

function serverUp() {
	exec("yarn server:dev")
}

//TODO: Create reload server function
//TODO: Create shutdown server function

export { profiler, serverUp }
