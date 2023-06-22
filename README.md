# 🍱 Figma + FigJam Plugin Samples

Sample plugins using the [Figma + FigJam Plugin API][docs].

To make a feature request, file a bug report, or ask a question about
developing plugins, check out the available [resources][help].

## Getting Started
Now you can import the Bar Chart plugin from within the Figma desktop app (`Plugins > Development > Import plugin from manifest...` from the right-click menu)!

The code for each plugin is in `code.ts` in that plugin's subdirectory. If a
plugin shows some UI, the HTML will be in `ui.html`.

For example, the code for the Bar Chart sample plugin is in
[barchart/code.ts](barchart/code.ts), and the HTML for its UI is in
[barchart/ui.html](barchart/ui.html).

## Other Figma Plugin Samples + Starters

- [Create Figma Plugin](https://yuanqing.github.io/create-figma-plugin/) - A comprehensive toolkit for developing Figma plugins.
- [Figma Plugin Boilerplate](https://github.com/thomas-lowry/figma-plugin-boilerplate) - A starter project for creating Figma Plugins with HTML, CSS (+ SCSS) and vanilla Javascript without any frameworks.
- [Figsvelte](https://github.com/thomas-lowry/figsvelte) - A boilerplate for creating Figma plugins using Svelte.
- [Figplug](https://rsms.me/figplug/) - A small program for building Figma plugins. It offers all the things you need for most projects: TypeScript, React/JSX, asset bundling, plugin manifest generation, etc.

[docs]: https://www.figma.com/plugin-docs/figma-figjam-plugins/
[help]: https://www.figma.com/plugin-docs/get-help
[ts]: https://www.typescriptlang.org/
[node]: https://nodejs.org/en/download/
[webpack]: #webpack
