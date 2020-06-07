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


/** generate filter functions from glob patterns */
export function getFilter(patterns?: string[]) {
  //  if not provide with valid patterns, return true always
  if (!Array.isArray(patterns) || patterns.length === 0) {
    return (cmd: string) => true;
  }
  //  prepare all filters
  const filters: any[] = patterns.map(pattern => minimatch.filter(pattern));
  //  if one of the filter is passed, consider it matched.
  return (cmd: string) => filters.some(filter => filter(cmd));
}
