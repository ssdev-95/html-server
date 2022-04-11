//TODO: Get flags and setup.chokidar using them
import { Command } from "commander"

const program = new Command()

program
  .name('html-server')
	.version('1.0.0')

program
  .command('serve')
	.option('-f separator <char>')
	.action((str, options) => {
		console.log(str)
	})

program.parse()
