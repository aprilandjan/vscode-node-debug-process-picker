# vscode-node-debug-process-picker

This extension provides configurable pick-process command while debugging Node.js program in vscode. Currently working in process.

## Usage

The vscode node debugger provides convenient configurations when try to debug a node.js process. The [Attach to Process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attach-to-node-process-action) task with `command:PickProcess` works perfectly:

> The picker command showed all the the other programs that were launched with one of the various forms of --debug or --inspect arguments.

However, most of times users have to select the specific one manually because of the others are possibly just distractions, and there's no configurations to filter the listed processes.

This extension simply provide a command to find filtered node processes. The filtering rule can be defined via extension configurations listed below.

So, you can use this command `PickFilteredProcess` to replace `PickProcess` when executing `Attach to Process` debugging in config file `launch.json`, to filter the process you care. For Example:

```json
// ./vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach by Process ID",
      "processId": "${command:PickFilteredProcess}",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

```json
// ./vscode/settings.json
{
  "nodeDebugProcessPicker.include": [
    "*/app.js",
  ]
}
```

When pressing <kbd>F5</kbd> to execute debugging task, the node process which its command name string matches `*/app.js` will be displayed, makes you focus your program more easily.

## Setting

The available setting are listed below:

### `nodeDebugProcessPicker.include`

Glob patterns to test against command string of available processes. The matched result will be included in the picker display list. If this setting is defined valid, the `exclude` setting below will be ignored.

For example, `*/app.js` will match:

```

```

### `nodeDebugProcessPicker.exclude`

Glob patterns to test against command string of available processes. The matched result will be excluded from the picker display list. Only works if the `include` setting above is defined valid.

For example:

```

```

### `nodeDebugProcessPicker.autoAttach`

If the picker found only one matched process, attach it immediately, without manual pick-confirm. Defaults to `true`.

## References

- <https://github.com/Microsoft/vscode/issues/50378>
- <https://github.com/microsoft/vscode/issues/95598>
- <https://github.com/microsoft/vscode-node-debug>
- <https://github.com/microsoft/vscode-node-debug2>
- <https://github.com/microsoft/vscode-node-debug/blob/master/src/node/extension/processPicker.ts>

## License

[MIT](./LICENSE)
