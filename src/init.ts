import { profiler, setup, serverUp } from "./profiler"

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
