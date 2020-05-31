import * as vscode from 'vscode';
import { pickProcess } from './pickProcess';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.nodeDebugProcessPicker.pick', async (args: any) => {
		const result = await pickProcess();
		console.log('pick result:', result);
		vscode.window.showInformationMessage('Result:\n' + result);
		return result;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
