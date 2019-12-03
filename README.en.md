# 🌙 Dark Mode Web Page design

- [한국어](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.md)
- [English](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.en.md)
- [日本語](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.jp.md)

## Table of contents
1. [What is the Dark mode?](#what-is-the-dark-mode)
2. [Recognizing Dark mode](#recognizing-dark-mode)
3. [Turn Dark mode on and off](#turn-dark-mode-on-and-off)
4. [Animation](#animation)

## What is the Dark Mode?
On September 20, 2019, at 2:00 a.m., Apple began to release iOS 13, a new operating system for iPhone and iPod Touch. In addition, at WWDC2019 (Apple WorldWide Developers Conference) held in early June of the same year, developers in Apple provided a way for web developers to control Dark Mode for iOS13 and MacOS Mojave. Unlike the previous UI, which shows black letters on the white background, Dark Mode shows white letters on the black background. Because the black color is used a lot in the design of the screen, Dark Mode has the merit that it can reduce power consumption in devices that use OLED displays such as the iPhone 11Pro and relieve eyestrain. For more unified UI and UX, I’ll tell you how to automatically change a website to a dark design when users utilizing Dark Mode access the website for more unified UI and UX.

## Recognizing Dark mode
You have to check out whether or not the device of the users is allowed to use Dark Mode in order to apply Dark Mode the moment users access a website. Here's how you can check for it on CSS and JavaScript:

#### CSS
CSS supports a `prefer-color-cheme` media query that tells you what kind of theme the device of users has. `prefers-color-cheme` can have the following values:

- no-preference: Not telling what kind of theme the device has.
- light: Using light mode.
- dark: Using Dark Mode.

Therefore, you can write CSS codes that work only for users who are using Dark Mode with the code below:
```css
@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

However, some browsers may don’t support `prefers-color-cheme` media queries and have different values from the settings of system-theme on the device of users.

 - ✅ : Supporting prefers-color-cheme media queries.
 - ❌ : Not supporting it or having different values from the settings of system-theme on the device of users.

| OS / Browser  | Safari | Chrome | Firefox | Whale |
| ------------- |:------:|:------:|:-------:|:-----:|
| iOS           |✅      |❌      |❌      |❌     |
| iPadOS        |✅      |❌      |❌      |❌     |
| macOS         |✅      |✅      |✅      |❌     |


#### JavaScript
In JavaScript, after referencing the media query of the CSS, you check out whether or not the device of users is supporting the `prefers-color-cheme` media query, determining compatibility of the device

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
All CSS codes associated with Dark Mode are written in one media query. Therefore, you can activate the whole media code of a file by using the attribute of `media` in `lilnk` tag after writing CSS codes in the file of `dark.css`.

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

## Turn Dark Mode on and off
The recognition function of Dark Mode works only on some browsers and devices, including iOS13, iPadOS, MacOS Mojave. Dark Mode doesn’t work when you don't use the latest apple devices and the browsers supporting the function of prefers-color-scheme media query. From now on, I'll tell you how to make Dark Mode available to users who use a device that does not support Dark Mode function.


You can enable or disable the CSS codes by manipulating the attribute of `media` in `link` tag that you added in order to detach the file. First, make the buttons so that you can control `darkModeSwitch`, the function of JavaScript that turns Dark Mode on/off.
 
 
 
```html
<p>
  Dark Mode:
  <a onclick="darkModeSwitch(true)">ON</a>
  /
  <a onclick="darkModeSwitch(false)">OFF</a>
</p>
```

Then, assign an id to the `link` tag that you added in order to reference `dark.css` above.

```html
<link id="dark-mode-sheet"
      rel="stylesheet"
      href="assets/css/dark.css"
      media="(prefers-color-scheme: dark)">
```

And define the `darkModeSwitch` function above. In this, you will manipulate the attribute of `media` in the `link` tag.
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

By doing this, you can add function of turning on/off Dark Mode. However, Dark Mode will be turned off when users reload the page in your browser or move from one page to another. This problem will be solved if you save the set value in your browser by using Cookie and let the web-page displayed according to the value.

In this article, I use the `JavaScript Cookie` library for controlling cookies.
[Learn more](https://github.com/js-cookie/js-cookie)

First, save it as a cookie when Dark Mode is turned on. You should save the set value after converting it into an integer type because Cookies store values as a string. And add `isDarkMode` function that obtains this value.
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

Programs should manipulate the web page according to this value when the webpage starts. If there is a cookie value, they manipulate the webpage according to the cookie value instead of using the set value of Dark Mode in the device of users. They convert the stored value into a integer because it is a integer string.
```javascript
//the preface omitted
document.addEventListener('DOMContentLoaded', function () {
  const isDm = isDarkMode();
  if (isDm != null) darkModeSwitch(+isDm);
});
```

By doing this, Dark Mode can fully support to all users.

## Animation
You can get much higher quality design of web site if you add an animation that is operated whenever Dark Mode is turned on.

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

You can see the page used in test by clicking [here](https://tmdgus0084.github.io/apple-dark-mode/).
I hope you will explore more resources and develop for a wide variety of experiences of many users. Please click this STAR⭐️ if this article is helpful!!
Thank you for reading.
