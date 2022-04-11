import { Command } from "commander"
import { watcher, setup, serverUp } from "./watcher"
import { liveReloadServer } from "./server"

const program = new Command()
let dir: string;

program
  .name('html-server')
	.version('1.0.0')

program
  .command('serve')
	.option('-f separator <char>')
	.action((str) => {
		dir = str.separator as string;
		setup(dir)
	})

program.parse()

watcher.on('ready', serverUp)
watcher.on('change', () => {
	setup(dir)
	liveReloadServer.refresh("/")
})
