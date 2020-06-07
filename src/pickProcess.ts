/**
 * Core codes are copied from https://github.com/microsoft/vscode-node-debug/blob/master/src/node/extension/pickProcess.ts
 */

import * as vscode from 'vscode';
import * as nls from 'vscode-nls';
import { basename } from 'path';
import { getProcesses } from './processTree';
import { analyseArguments } from './protocolDetection';
import { getConfig, Config, getFilter } from './util';

const localize = nls.loadMessageBundle();

interface ProcessItem extends vscode.QuickPickItem {
	pidOrPort: string;	// picker result
	sortKey: number;
	command: string;
	args: string;
}

/**
 * Process picker command (for launch config variable)
 * Returns as a string with these formats:
 * - "12345": process id
 * - "inspector12345": port number and inspector protocol
 * - "legacy12345": port number and legacy protocol
 * - null: abort launch silently
 */
export function pickProcess(ports: boolean = true): Promise<string | null> {

	return listProcesses(!!ports).then(items => {
		const config: Config = getConfig();
		const filter = getFilter(config.match);
		const matched = items.filter(item => filter(item.command));

		//	no matched founded, show tip message
		if (matched.length === 0) {
			vscode.window.showWarningMessage(`No matched process founded. Current matching rules:\n${config.match?.join('\n')}`);
			return null;
		}

		// 	only one matched founded, and user decides to auto attach
		if (matched.length === 1 && config.autoAttach) {
			return matched[0].pidOrPort;
		}

    // 	prompt picker panel as usual
		let options: vscode.QuickPickOptions = {
			placeHolder: localize('pickNodeProcess', "Pick the node.js process to attach to"),
			matchOnDescription: true,
			matchOnDetail: true
		};
		return vscode.window.showQuickPick(matched, options).then(item => item ? item.pidOrPort : null);
	}).catch(err => {
		return vscode.window.showErrorMessage(localize('process.picker.error', "Process picker failed ({0})", err.message), { modal: true }).then(_ => null);
	});
}

function listProcesses(ports: boolean): Promise<ProcessItem[]> {

	const items: ProcessItem[] = [];

	const NODE = new RegExp('^(?:node|iojs)$', 'i');

	let seq = 0;	// default sort key

	return getProcesses((pid: number, ppid: number, command: string, args: string, date?: number) => {
		if (process.platform === 'win32' && command.indexOf('\\??\\') === 0) {
			// remove leading device specifier
			command = command.replace('\\??\\', '');
		}

		const executable_name = basename(command, '.exe');

		let port = -1;
		let protocol: string | undefined = '';
		let usePort = true;

		if (ports) {
			const x = analyseArguments(args);
			usePort = x.usePort;
			protocol = x.protocol;
			port = x.port;
		}

		let description = '';
		let pidOrPort = '';

		if (usePort) {
			if (protocol === 'inspector') {
				description = localize('process.id.port', "process id: {0}, debug port: {1}", pid, port);
			} else {
				description = localize('process.id.port.legacy', "process id: {0}, debug port: {1} (legacy protocol)", pid, port);
			}
			pidOrPort = `${protocol}${port}`;
		} else {
			if (protocol && port > 0) {
				description = localize('process.id.port.signal', "process id: {0}, debug port: {1} ({2})", pid, port, 'SIGUSR1');
				pidOrPort = `${pid}${protocol}${port}`;
			} else {
				// no port given
				if (NODE.test(executable_name)) {
					description = localize('process.id.signal', "process id: {0} ({1})", pid, 'SIGUSR1');
					pidOrPort = pid.toString();
				}
			}
		}

		if (description && pidOrPort) {
			items.push({
				// render data
				label: executable_name,
				description: args,
				detail: description,

				// picker result
				pidOrPort: pidOrPort,
				// sort key
				sortKey: date ? date : seq++,
				// help to apply match
				command,
				args,
			});
		}

	}).then(() => items.sort((a, b) => b.sortKey - a.sortKey));		// sort items by process id, newest first
}
