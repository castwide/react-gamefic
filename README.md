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

## The Basics

The generated app is designed to be as mininal as possible while still providing the base functionality of a playable game. The only required
component library is `react-gamefic`, although it also uses `react-modal` to power the menu options. Most styles and UI elements should be
easy to modify, extend, or replace altogether.

### The `Console` Component

The `Console` is the top-level game container. It accepts a `driver` prop and provides a context for other components.

The `driver` prop accepts a Driver object as defined in the [gamefic-driver](https://github.com/castwide/gamefic-driver) package.

The `Terminal` provides a common component for rendering scenes.

### Scenes

The `Terminal` takes a `typedScenes` prop that provides components for rendering different types of scenes.

* `Activity` - The top-level component for Activity scenes.
* `MultipleChoice` - The top-level component for Multiple Choice scenes.
* `YesOrNo` - A specialized `MultipleChoice` scene.
* `Pause` - The top-level component for Pause scenes.
* `Conclusion` - The top-level component for Conclusion scenes.

All the scene components are exported into the project for ease of customization.

It's also possible to configure a `namedScenes` prop to use specialized components for user-defined scenes. One possible use
for a named scene component is a minigame that the player must complete before proceeding with the story.

### Scene Components

* `CommandForm` - A form with a text input for accepting typed commands.
* `CommandLink` - A link that triggers a command.
* `Turn` - The display for a single turn's output.
* `History` - A collection of previous Turns.
* `HtmlText` - A display container for messages.
* `OptionList` - A list of command links, such as the options in a Multiple Choice scene.

## Built-in Styles

The react-gamefic package includes several styles that can be imported into projects. To import the `terminal` style, for example:

```
import 'react-gamefic/styles/terminal'; // Import the built-in style first
import './style.css';                   // Import your own style second to add your customizations
```

The following styles are available:

* `normal`: A minimal foundation for responsiveness and readability. The other built-in styles import `normal` first.
* `ebook`: A simple black-on-white text style.
* `terminal`: A green-on-black style designed to emulate command-line terminals.

The app's stylesheet is limited to four classes: `.component`, `.terminal`, `.modal`, and `.overlay` (a helper element for modals). Styles can
be customized by modifying or replacing `web/src/style.css`. Even the stylesheet imported from react-gamefic is optional.

## Testing the Component Library Locally

If you're working on the react-gamefic library itself and need to link to a local copy of react-gamefic, you might run into
invalid hook errors. One solution is to add the following aliases to the test app's webpack config, as mentioned in
[this Stack Overflow discussion](https://stackoverflow.com/questions/66488492/solve-having-more-than-one-copy-of-react-in-the-same-app/66497721):

```
resolve: {
    alias: {
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom')
    }
}
```

## More Info

Refer to the [official website](https://gamefic.com) or the [Gamefic SDK repo](https://gamefic.com/castwide/gamefic-sdk) for more information
about developing with Gamefic.
