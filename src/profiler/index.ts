import chokidar from "chokidar"
import path from "node:path"

const dir = path.join(pwd(), "_temp")
const profiler = chokidar.watch(dir)

export { profiler }
