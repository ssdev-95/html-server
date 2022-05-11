import chokidar from "chokidar";
import { copyFolder, destroyTempFolder } from "./files-handler";
import { liveReloadServer } from "../server";

import path from "node:path";
import { exec, ChildProcess } from "node:child_process";

const mode = process.env.NODE_ENV;
const destinationDir = path.join(process.cwd(), "_temp");

let watcher:chokidar.FSWatcher;
let childProcess:ChildProcess;

const KILL_SIGNAL = "SIGTERM";

function serverUp() {
  switch (mode) {
    case "PRODUCTION":
      childProcess = exec(
				"yarn server:prod",
				{ killSignal: KILL_SIGNAL }
			);
      break;
    default:
      childProcess = exec(
				"yarn server:dev",
				{ killSignal: KILL_SIGNAL }
			);
      break;
  }
}

function serverDown() {
  childProcess.kill(KILL_SIGNAL);
	console.log(`Process PID:${childProcess.pid} has sucessfully terminated`);
}

function setup(currentDir:string) {
  watcher = chokidar.watch(currentDir);
  copyFolder(currentDir, destinationDir);
  console.log("Setup done, fastforwarding..");
}

export { watcher, destroyTempFolder, serverUp, serverDown, setup, exec };
