// The module 'vscode' contains the VS Code extensibility API

import * as vscode from 'vscode';
import { liveReloadServer, server } from './server';
import { watcher, serverUp, setup, serverDown, destroyTempFolder } from './watcher';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "html-server" is now active!');

	// The command has been defined in the package.json file
	//  Now provide the implementation of the command with registerCommand
	//  The commandId parameter must match the command field in package.json
	let startServer = vscode.commands.registerCommand(
		'html-server.start',
		() => {
			const folders = vscode.workspace?.workspaceFolders;
			const workspace = folders ? folders[0]?.uri.path : 'empty';
			setup(workspace);
			watcher?.on('ready', () => {
				serverUp();
				liveReloadServer.server.once("connection", () => {
					setTimeout(() => {
						liveReloadServer.refresh("/");
						server.on('ready', () => console.log('lol'));
					}, 100);
				});
			});
	
	  	// Display a message box to the user
			setTimeout(() => {
				vscode.window.showInformationMessage(`Started server on folder ${workspace} :D`);
			}, 5000);
		}
	);

	let stopServer = vscode.commands.registerCommand(
		'html-server.stop',
		() => {
			try {
				serverDown();
				liveReloadServer.removeAllListeners();
				liveReloadServer.watcher.close();
				liveReloadServer.close();
				watcher.removeAllListeners();
				watcher.close();
				destroyTempFolder();
				vscode.window.showInformationMessage('Server successfully stoped!');
			} catch (e) {
				console.log(e);
			}
		}
	);

	context.subscriptions.push(startServer);
	context.subscriptions.push(stopServer);
}

// this method is called when your extension is deactivated
export function deactivate() {}
