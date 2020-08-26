# react-gamefic

React components for Gamefic.

## Requirements

This project requires Node, Ruby, and the Gamefic SDK. The SDK is available as a RubyGem:

    $ gem install gamefic-sdk

## Using React and Gamefic

Run the following commands to create a new Gamefic project that targets the React platform:

    $ gamefic init my-game
	$ cd my-game
	$ rake web:generate
    $ rake web:build

The `web:generate` task creates the React application in the web directory. The `web:build` task compiles the application in builds/web.

## How It Works

The default JSX generated by the Gamefic SDK looks something like this:

```
<Console driver={driver}>
  <Terminal />
</Console>
```

### The `Console` Component

The `Console` is the top-level game container. It accepts two props, `driver` and `consoleDidUpdate`.

The `driver` prop accepts a Driver object as defined in the [gamefic-driver](https://github.com/castwide/gamefic-driver) package.

The `consoleDidUpdate` prop is an optional callback to execute when the game state changes.

### The `Terminal` Component

`Terminal` is a text-based user interface. It should be familiar to [Inform](http://inform7.com/) users and anyone who's played traditional adventure games.

### Terminal Props

The following props are passed into the `Terminal` component when the application starts.

* `sceneComponents` - A hash identifying the component to use for each type of scene, e.g., `Activity: ActivityScene`. If the game includes any custom states, they can be assigned to components here. If a scene type is not assigned to a component, `Console` emits a warning and defaults to `ActivityScene`.

### Shared Props

The following props are automatically passed into the `Console` component's children.

* `state` - A hash received from the game engine describing the current state of the game.
* `history` - An chronological array of game states.
* `handleCommand` - A callback that sends commands to the engine, e.g., `this.props.handleCommand('go south')`.

### `Terminal` Subcomponents

The `Terminal` uses the following components to render the user interface:

* `ActivityScene` - The top-level component for Activity scenes.
* `MultipleChoiceScene` - The top-level component for Multiple Choice scenes.
* `YesOrNoScene` - The top-level component for Yes-or-No scenes.
* `PauseScene` - The top-level component for Pause scenes.
* `CommandForm` - A form with a text input for accepting typed commands.
* `CommandLink` - A link that triggers a command.
* `History` - A collection of previous Turns.
* `Turn` - The display for a single turn's output. Used in History and Output.
* `Output` - The display container for History and the present Turn.

## Built-in Styles

The react-gamefic package includes several styles that can be imported into projects. To import the `terminal` style, for example:

    import 'react-gamefic/styles/terminal'; // Import the built-in style first
    import './style.css';                   // Import your own style second to add your customizations

The following styles are available:

* `normal`: A minimal foundation for responsiveness and readability. The other built-in styles import `normal` first.
* `ebook`: A simple black-on-white text style.
* `terminal`: A green-on-black style designed to emulate command-line terminals.

## Custom Components

Developers can create their own React components to replace the `Terminal` component with a custom user interface. Components inside the `Console` automatically inherit shared props like `state`.
