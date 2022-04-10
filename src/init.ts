import { profiler, setup, serverUp } from "./profiler"
import { server } from "./server"

//TODO: Starts first server with current files inside _temp folder
//TODO: Resets server on changes in files insie _temp folder

profiler.on("ready", props => {
	try {
		setup()
	} catch (err) {
		throw err
	}
	finally {
		serverUp()
	}
})

profiler.on(
	"change",
	() => {
		console.log("Files changed, reloading...")
		setup()
	}
)

profiler.on("close", () => server.close())
