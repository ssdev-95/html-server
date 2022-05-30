import chokidar from "chokidar";
import { FileHandler } from "./files-handler";
import { liveReloadServer, server } from "../server";

import path from "node:path";
import { exec, ChildProcess } from "node:child_process";


class CustomServer {
	private KILL_SIGNAL = "SIGTERM";
	private MODE = process.env.NODE_ENV;
	private destinationDir = path.join(process.cwd(),"_temp");

	public watcher:chokidar.FSWatcher;
	public childProcess:ChildProcess;
	public fileHandler: typeof FileHandler;

	public constructor() {
		this.fileHandler = new FileHandler()
	}

	setup(currentDir:string) {
		this.watcher = chokidar.watch(currentDir);
		this
			.fileHandler
			.copyFolder(currentDir, this.destinationDir);
		console.log("Setup done, fastforwarding..");
	}


	serverUp() {
		switch (this.MODE) {
			case "PRODUCTION":
			  this.childProcess = exec(
					"yarn server:prod",
					{ killSignal: this.KILL_SIGNAL }
				);
		    break;
			default:
				this.childProcess = exec(
					"yarn server:dev",
					{ killSignal: this.KILL_SIGNAL }
				);
	      break;
		}

		liveReloadServer.server.once("connection", () => {
			setTimeout(() => {
				liveReloadServer.refresh("/");
				server.on('ready', () => console.log('lol'));
			}, 100);
		});
	}

	serverDown() {
		this.childProcess.kill(this.KILL_SIGNAL);
		console.log(
			`Process PID:${childProcess.pid} has sucessfully terminated`
		);
	}
	
	removeListeners() {
		server.down()
		liveReloadServer.removeAllListeners();
		liveReloadServer.watcher.close();
		liveReloadServer.close();
		
		this.watcher.removeAllListeners();
		this.watcher.close();
		this.fileHandler.destroyTempFolder();
	}
}
export { CustomServer };
