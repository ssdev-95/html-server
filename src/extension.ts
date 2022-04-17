// The module 'vscode' contains the VS Code extensibility API

import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "html-server" is now active!');

	// The command has been defined in the package.json file
	//  Now provide the implementation of the command with registerCommand
	//  The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'html-server.helloWorld',
		() => {
	  	// Display a message box to the user
		  vscode.window.showInformationMessage('Hello World from html-server!');
		}
	);

	let start = vscode.commands.registerCommand(
		'html-server.start',
		() => {
			const workspaceName = vscode.workspace.name as string;
			const folderPath:unknown = `${process.cwd()}/${workspaceName}`;
		  const workspace = vscode.workspace.getWorkspaceFolder(folderPath as vscode.Uri);
			console.log(workspace?.uri);
			vscode.window.showInformationMessage(`Started server on folder ${workspace}!`);
		}
	);

	let stop = vscode.commands.registerCommand(
		'html-server.stop',
		() => {
			vscode.window.showInformationMessage('Server successfully stoped!');
		}
	);

	context.subscriptions.push(disposable);
	context.subscriptions.push(start);
	context.subscriptions.push(stop);
}

// this method is called when your extension is deactivated
export function deactivate() {}
