# 🌙 Darkmode web design

- [한국어](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.md)
- [English](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.en.md)

## Table of contents
1. [What is the Dark mode?](#what-is-the-dark-mode)
2. [Recognizing Dark mode](#recognizing-dark-mode)
3. [Turn Dark mode on and off](#turn-dark-mode-on-and-off)
4. [Animation](#animation)

## What is the Dark mode?
At 2:00 a.m. on September 20(GMT+9), 2019, Apple started a deployment of new operating system, iOS 13, for iPhone and iPod touch. Also  on early June, in same year, at the held WWDC2019(The Apple Worldwide Developers Conference), Apple offered the way that web developers can respond to design of Dark mode for new iOS 13 and deployed Macos Mojave previously. Dark mode is the UI that has a  overall dark appearance, with white writing on a black background unlike before that displayed black letters on a white background. Because black color is used a lot in its design, there are advantages that it can reduce power consumption in device with OLED display like iPhone 11Pro and also make user's eyes feel much more comfortable. For more uniformity UI or UX, this article deal with the way that change a website to dark design automatically when Dark mode user access the website.

## Recognizing Dark mode
To apply the Dark mode in the moment that users access a web site, it needs to make sure user's device is in use before anyting else. The manners for this in CSS and JavaScript are following below text.

#### CSS
CSS support `prefers-color-scheme` mediaquery that tell you which theme your device uses CSS. `prefers-color-scheme` mediaquery can have the following result.

- no-preference: Don't notify theme.
- light: Light mode in use.
- dark: Dark mode in use.

Therefore it can be able to write CSS code that only operate for Dark mode users through the code below.
```css
@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

Unfortunatly, some browsers do not support `prefers-color-scheme` mediaquery or have other result with actual user device's system theme setting.

 - ✅ : Supported.
 - ❌ : Not supported or has a different value from the system theme settings.

| OS / Browser  | Safari | Chrome | Firefox | Whale |
| ------------- |:------:|:------:|:-------:|:-----:|
| iOS           |✅      |❌      |❌      |❌     |
| iPadOS        |✅      |❌      |❌      |❌     |
| macOS         |✅      |✅      |✅      |❌     |


#### JavaScript
In JavaScript, you have to borrow mediaquery of CSS and check it. Because CSS depends on mediaquery, compatibility is decided in accordance with support status of `prefers-color-scheme` mediaquery.
```javascript
const darkModeMeidaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function updateForDarkModeChange() {
  if (darkModeMeidaQuery.matches) {
    // Dark mode is on.
  } else {
    // Dark mode is off.
  }
}

darkModeMeidaQuery.addListener(updateForDarkModeChange);
updateForDarkModeChange();
```

Now, we applied the following code and succeed supporting Dark mode.

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #323232;
    color: #fff;
  }

  header {
    background: #111;
  }

  footer {
    background: #111;
  }
}
```

![Dark mode](img/dark-diff.png)

All CSS codes related with Dark mode are in one mediaquery. Therefore, CSS codes of Dark mode are put aside in file named `dark.css` and can be controlled with mediaquery of file-level as utilizing `media` property of `link` tag.

#### dark.css
```css
/*
  media=(prefers-color-scheme: dark)
*/

body {
  background: #323232;
  color: #fff;
}

header {
  background: #111;
}

footer {
  background: #111;
}
```

#### index.html
```html
...
<link rel="stylesheet"
      href="assets/css/dark.css"
      media="(prefers-color-scheme: dark)">
...
```

## Turn Dark mode on and off
The above-mentioned Dark mode recognition syntax only operates some browsers of more than iOS 13, iPadOS, MacOS Mojave. If you don't use  Apple devices of the latest version or supported browser, it doesn't operate. The following contents handle with methods how to encourage end users to access the Dark mode.

 By controlling the `link` properties of the `media` element added to detach a file in the last time, you can enable or disable the CSS. First of all, the JavaScript function that turns off and turns on dark mode is called `darkModeSwitch` and create a button to manipulate it.
```html
<p>
  Dark Mode:
  <a onclick="darkModeSwitch(true)">ON</a>
  /
  <a onclick="darkModeSwitch(false)">OFF</a>
</p>
```

And grant id to added `link` tag for calling in `dark.css` from above.
```html
<link id="dark-mode-sheet"
      rel="stylesheet"
      href="assets/css/dark.css"
      media="(prefers-color-scheme: dark)">
```

Define  above-mentioned `darkModeSwitch`function. Here, we will manipulate the `link` properties of the `media` element.
```javascript
function darkModeSwitch(status) {
  document
  .querySelector('#dark-mode-sheet')
  .setAttribute(
    'media',
    status? 'screen' : 'not screen'
  );
}
```

We have added the function to switch the dark mode off and on easily. However, if the user refreshes the webpage or moves to another page, dark mode is turned off. To solve this problem, save settings to browser by using Cookie and always try to decorate your web page according to this setting.

In this article, we use the `JavaScript Cookie` library to manipulate a Cookie.
[Learn more](https://github.com/js-cookie/js-cookie)

First, save it as Cookie whenever you change to dark mode. State values have been converted to integer and saved because Cookie saves values as string. And add `isDarkMode` function bringing this value.
```javascript
function isDarkMode() {
  return Cookies.get('darkmode');
}

function darkModeSwitch(status) {
  Cookies.set('darkmode', +status);
  document
  .querySelector('#dark-mode-sheet')
  //omitted
}
```

You should now manipulate the page based on this value when the webpage starts. If there is Cookie value, ignore the dark mode setting of device and manipulate the page according to the cookie value. If there is no Cookie value, no operation is performed. The stored value is an integer string and changes it back to an integer.
```javascript
//the preface omitted
document.addEventListener('DOMContentLoaded', function () {
  const isDm = isDarkMode();
  if (isDm != null) darkModeSwitch(+isDm);
});
```

Now, you can fully support dark mode for all users.

## Animation
When it changes to dark mode, adding an animation results in a more complete web design.

![Animation](img/ani.gif)
```css
body {
  transition: .5s background, .5s color;
}

header {
  transition: .5s background;
}

footer {
  transition: .5s background;
}
```

The page used for the test can be found by pressing [here](https://tmdgus0084.github.io/apple-dark-mode/).
I hope you will explore and develop more resources for user experience of a variety of users.
If this article helps, press the star⭐️ please!
Thank you.
