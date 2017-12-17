# react-gamefic

React components for Gamefic.

## Requirements

This project requires Node, Ruby, and the Gamefic SDK. The SDK is available as a RubyGem:

    $ gem install gamefic-sdk

## Using React and Gamefic

Run the following commands to create a new Gamefic project that targets the React platform:

    $ gamefic init my-game
	$ cd my-game
	$ gamefic target ReactApp

The SDK will create a React application in targets/reactapp. Run `gamefic build` to compile the application in builds/reactapp.

## How It Works

## Customizing CSS

Modify targets/reactapp/src/style.css to customize the application's style.

## CSS Classes

Each component is wrapped in a CSS class corresponding to its name, e.g., `ActivityScene`, `CommandForm`, etc.

## Console Props

The following props are passed into the Console component when the application starts.

* `sceneComponents` - A hash identifying the component to use for each type of scene, e.g., `Activity: ActivityScene`. If the game includes any custom states, they can be assigned to components here. If a scene type is not assigned to a component, `Console` emits a warning and defaults to `ActivityScene`.
* `outputComponent` - The component for displaying the current state and history (`Output` by default).
* `stateImageKey` - A key in the game state that corresponds to the current scene's image. If an image exists, `Output` displays it via the `StateImage` component.
* `driver` - Required. The Gamefic driver that connects the app to the engine. Gamefic's ReactApp platform installs and configures an Opal engine with an OpalDriver by default.

## Shared Props

The following props are passed to most internal components. (The one exception is the `Turn` component, which only receives a game state.)

* `state` - A hash received from the game engine describing the current state of the game.
* `history` - An chronological array of game states.
* `handleCommand` - A callback that sends commands to the engine, e.g., `this.props.handleCommand('go south')`.
* `stateImageKey` - A key in the game state that corresponds to the current scene's image.

## Components

* `ActivityScene` - The top-level component for Activity scenes.
* `CommandForm` - A form with a text input for accepting typed commands.
* `CommandLink` - A link that triggers a command.
* `Console` - The game screen's parent. Its direct descendant is the current scene component.
* `History` - A collection of previous Turns.
* `MultipleChoiceScene` - The top-level component for Multiple Choice scenes.
* `Output` - The display container for StateImage, History, and the present Turn.
* `PauseScene` - The top-level component for Pause scenes.
* `StateImage` - The scene's image if one exists in the game state's stateImageKey property.
* `Turn` - The display for a single turn's output. Used in History and Output.
* `YesOrNoScene` - The top-level component for Yes-or-No scenes.

## Listening for Game Updates

The `Console` accepts a callback in the `consoleDidUpdate` prop that gets called after component updates, i.e., anytime the game state changes.

## Built-in Styles

The react-gamefic package includes several styles that can be imported into projects. To import the `terminal` style, for example:

    import 'react-gamefic/styles/terminal'; // Import the built-in style first
    import './style.css';                   // Import your own style second to add your customizations

The following styles are available:

* `normal`: A minimal foundation for responsiveness and readability. (Most?) other styles import `normal`.
* `ebook`: A simple black-on-white text style.
* `terminal`: A green-on-black style designed to emulate command-line terminals.
