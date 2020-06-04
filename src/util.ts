import * as vscode from 'vscode';
import minimatch from 'minimatch';

export enum ConfigField {
  MATCH = 'nodeDebugProcessPicker.match',
  AUTO_ATTACH = 'nodeDebugProcessPicker.autoAttach',
}

/** the extension configurations */
export interface Config {
  match: string[] | undefined;
  autoAttach: boolean | undefined;
}

/** get extension configurations */
export function getConfig(): Config {
  return {
    match: vscode.workspace.getConfiguration().get<string[]>(ConfigField.MATCH),
    autoAttach: vscode.workspace.getConfiguration().get<boolean>(ConfigField.AUTO_ATTACH),
  };
}

/** check if the command string fulfill the config rules */
export function isMatched(command: string, include: string[] | undefined, exclude: string [] | undefined) {
  //  if `include` is provided, then `exclude` is ignored
  if (Array.isArray(include)) {
    // return include.every((pattern) => minimatch.)
  }
  // if `exclude` is provided, then test match with it
  // no configuration, just consider it as matched
  return true;
}