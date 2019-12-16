# react-native-cycle-text
A simple React Native component which lets you randomly cycle through an array of text Strings.

It is compatible with [react-native-web](https://github.com/necolas/react-native-web), and also has built-in hyperlink support!

## 🚀 Getting Started
Using [npm](https://www.npmjs.com/package/@cawfree/react-native-cycle-text):
```
npm install --save @cawfree/react-native-cycle-text
```

Using [yarn](https://www.npmjs.com/package/@cawfree/react-native-cycle-text):
```
yarn add @cawfree/react-native-cycle-text
```

## ✍️ Example
```
import TextCycler from '@cawfree/react-native-cycle-text';

export default ({ ...extraProps }) => (
  <TextCycler
    onPress={(url) => {
      // Returned if a user tapped on a hyperlink.
    }}
    duration={2000}
    nextMessage={() => {
      return Math.random() > 0.5 ? [
        'https://github.com/Cawfree are now welcome!',
        'Pull requests',
      ] : [
        'There\'s no better feeling than when somebody contributes to your repo on https://github.com/Cawfree.',
        'GitHub',
      ];
    }}
  />
);

```

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)

<p align="center">
  <a href="https://www.buymeacoffee.com/cawfree">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy @cawfree a coffee" width="232" height="50" />
  </a>
</p>
