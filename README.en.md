# 🌙 Darkmode web design

- [한국어](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.md)
- [English](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.en.md)

## Table of contents
1. [What is the Dark mode?](#what-is-the-dark-mode)
2. [Recognizing Dark mode](#recognizing-dark-mode)
3. [Turn Dark mode on and off](#turn-dark-mode-on-and-off)
4. [Animation](#animation)

## What is the Dark Mode?
On September 20, 2019, at 2:00 a.m., Apple began to release iOS 13, a new operating system for iPhone and iPod Touch. In addition, at WWDC2019 (Apple WorldWide Developers Conference) held in early June of the same year, developers in Apple provided a way for web developers to control Dark Mode for iOS13 and MacOS Mojave. Unlike the previous UI, which shows black letters on the white background, Dark Mode shows white letters on the black background. Because the black color is used a lot in the design of the screen, Dark Mode has the merit that it can reduce power consumption in devices that use OLED displays, such as the iPhone 11Pro and relieve eyestrain. In this article, I’ll tell you how to automatically change a website to a dark design when users utilizing Dark Mode access the website for more unified UI and UX.

## Recognizing Dark mode
You have to check out whether or not the device of the users is allowed to use Dark Mode in order to apply Dark Mode the moment users access a website. Here's how you can check it on CSS and JavaScript:

#### CSS
CSS supports a 'prefer-color-cheme' media query that tells you what kind of theme the device of users have. 'prefers-color-cheme' can have the following values:

- no-preference: Not telling what kind of theme the device has.
- light: Using light mode.
- dark: Using Dark Mode.

Therefore, you can create CSS codes that work only for users who are using Dark Mode with the code below.
```css
@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

However, some browsers may don’t support prefers-color-cheme media queries and have different values from the settings of system-theme on the device of users.

 - ✅ : Supporting prefers-color-cheme media queries.
 - ❌ : Not supporting it or having different values from the settings of system-theme on the device of users.

| OS / Browser  | Safari | Chrome | Firefox | Whale |
| ------------- |:------:|:------:|:-------:|:-----:|
| iOS           |✅      |❌      |❌      |❌     |
| iPadOS        |✅      |❌      |❌      |❌     |
| macOS         |✅      |✅      |✅      |❌     |


#### JavaScript
In JavaScript, after referencing the media query of the CSS, you check out whether or not the device of users is supporting the prefers-color-cheme media query, determining compatibility of the device

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

You can succeed in supporting Dark Mode by applying the following code: 

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
All CSS codes associated with dark mode are written in one media query. Therefore, you can activate the whole media code of a file by using the attribute of media in lilnk tag after writing CSS codes in the file of dark.css 

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
The recognition function of Dark Mode works only on some browsers and devices, including iOS13, iPadOS, MacOS Mojave. Dark Mode doesn’t work if you use the latest apple devices or the browsers that’s not supporting the function of prefers-color-scheme media query.

You can enable or disable the CSS codes by manipulating the attribute of media in link tag that you added in order to detach the file. First, make the buttons so that you can control darkModeSwitch, the function of JavaScript that turns off/on Dark Mode.
 
 
 
```html
<p>
  Dark Mode:
  <a onclick="darkModeSwitch(true)">ON</a>
  /
  <a onclick="darkModeSwitch(false)">OFF</a>
</p>
```

Then, assign an id to the link tag that you added in order to reference dark.cs above.

// 여기까지 번역 완료.
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
