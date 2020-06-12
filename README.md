# [vscode-node-debug-process-picker](https://marketplace.visualstudio.com/items?itemName=aprilandjan.vscode-node-debug-process-picker)

[![Build Status](https://dev.azure.com/merlinye/vscode-node-debug-process-picker/_apis/build/status/aprilandjan.vscode-node-debug-process-picker?branchName=master)](https://dev.azure.com/merlinye/vscode-node-debug-process-picker/_build/latest?definitionId=1?branchName=master)
[![Download Count](https://img.shields.io/visual-studio-marketplace/d/aprilandjan.vscode-node-debug-process-picker)](https://marketplace.visualstudio.com/items?itemName=aprilandjan.vscode-node-debug-process-picker)
[![Download Count](https://img.shields.io/visual-studio-marketplace/i/aprilandjan.vscode-node-debug-process-picker)](https://marketplace.visualstudio.com/items?itemName=aprilandjan.vscode-node-debug-process-picker)

This extension provides configurable pick-process command `PickMatchedProcess` while debugging Node.js program in vscode.

## Usage

The vscode node debugger provides convenient configurations when trying to debug a node.js process. The [Attach to Process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attach-to-node-process-action) task with `command:PickProcess` works perfectly:

> The picker command showed all the the other programs that were launched with one of the various forms of --debug or --inspect arguments.

However, most of times users have to select the specific one manually because of the others are possibly just distractions, and there's no configurations to filter the listed processes.

This extension simply provide a command to find matched node processes. The matching rules can be defined via extension configurations listed below.

With this extension, you can use the command `PickMatchedProcess` to replace `PickProcess` when executing `Attach to Process` debugging configured in `launch.json`, to filter the process you want to focus. For Example:

```json
// ./vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach by Process ID",
      "processId": "${command:PickMatchedProcess}",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

```json
// ./vscode/settings.json
{
  "nodeDebugProcessPicker.match": [
    "**/app.js",
  ]
}
```

When pressing <kbd>F5</kbd> to execute this debugging task, the node process which its command name string matches `**/app.js` will be displayed, makes you focus on your specific program more easily.

## Settings

You can configure the `PickerMatchedProcess` behavior through extension settings. It is recommended to use `workspace settings` to define match patterns in current workspace, rather than `user settings`. The available settings are listed below:

### `nodeDebugProcessPicker.match`

The [glob](https://github.com/isaacs/node-glob#readme) patterns to test against command name string of available processes. The matched result will be included in the picker list. You can define multiple patterns here, if one pattern is matched, it will be in the picker list. For example:

- `**/app.js` will match node program started from `/workspace/foo/bar/app.js`;
- `**/node_modules/electron/**/*` will match electron program started from local `node_modules` directory, which is usually in development
- `!**/server.js` will exclude the programs started from the file name `server.js`.

### `nodeDebugProcessPicker.autoAttach`

If the picker found only one matched process, attach it immediately, without manual pick-confirm. Defaults to `true`.

## Issues & Contribution

Please feel free to submit issues if you have any questions. Contribution is also welcomed :)

## References

- <https://github.com/Microsoft/vscode/issues/50378>
- <https://github.com/microsoft/vscode/issues/95598>
- <https://github.com/microsoft/vscode-node-debug>
- <https://github.com/microsoft/vscode-node-debug2>
- <https://github.com/microsoft/vscode-node-debug/blob/master/src/node/extension/processPicker.ts>

## License

[MIT](./LICENSE)
