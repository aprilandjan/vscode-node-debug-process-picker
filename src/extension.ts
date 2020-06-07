import * as vscode from 'vscode';
import { pickProcess } from './pickProcess';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.nodeDebugProcessPicker.pick', async () => {
		return pickProcess();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
