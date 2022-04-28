import chokidar from "chokidar";
import { copyFolder, destroyTempFolder } from "./files-handler";
import { liveReloadServer } from "../server";

import path from "node:path";
import { exec, ChildProcess } from "node:child_process";

const mode = process.env.NODE_ENV;
const destinationDir = path.join(process.cwd(), "_temp");

let watcher:chokidar.FSWatcher;
let childProcess:ChildProcess;

function serverUp() {
  switch (mode) {
    case "PRODUCTION":
      childProcess = exec("yarn server:prod");
      break;
    default:
      childProcess = exec("yarn server:dev");
      break;
  }
}

function serverDown() {
  childProcess.kill(childProcess.pid);
}

function setup(currentDir:string) {
  watcher = chokidar.watch(currentDir);
  copyFolder(currentDir, destinationDir);
  console.log("Setup done, fastforwarding..");
}

export { watcher, destroyTempFolder, serverUp, serverDown, setup, exec };
