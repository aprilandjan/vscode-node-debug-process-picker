import * as vscode from 'vscode';
import minimatch from 'minimatch';

export enum ConfigField {
  INCLUDE = 'nodeDebugProcessPicker.include',
  EXCLUDE = 'nodeDebugProcessPicker.exclude',
  AUTO_ATTACH = 'nodeDebugProcessPicker.autoAttach',
}

/** the extension configurations */
export interface Config {
  include: string[] | undefined;
  exclude: string[] | undefined;
  autoAttach: boolean | undefined;
}

/** get extension configurations */
export function getConfig(): Config {
  return {
    include: vscode.workspace.getConfiguration().get<string[]>(ConfigField.INCLUDE),
    exclude: vscode.workspace.getConfiguration().get<string[]>(ConfigField.EXCLUDE),
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