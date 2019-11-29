# 🌙 Darkmode web design

- [한국어](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.md)
- [English](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.en.md)

## Table of contents
1. [What is the Dark mode?](#what-is-the-dark-mode)
2. [Recognizing Dark mode](#recognizing-dark-mode)
3. [Turn Dark mode on and off](#turn-dark-mode-on-and-off)
4. [Animation](#animation)

## What is the Dark mode?
At 2:00 a.m. on September 20, 2019, Apple started a deployment of new operating system, ios 13, for iPhone and iPod touch. Also  on early June, in same year, at the held WWDC2019(The Apple Worldwide Developers Conference), Apple offered the way that web developers can respond to design of Dark mode for new ios13 and deployed Macos Mojave previously. Dark mode is the UI that has a  overall dark appearance, with white writing on a black background unlike before that displayed black letters on a white background. Because black color is used a lot in its design, there are advantages that it can reduce power consumption in device with OLED display like iPhone 11Pro and also make one's eyes feel much more comfortable. For more uniformity UI or UC, this article deal with the way that change a website to dark design automatically when Dark mode user acess the website.

## Recognizing Dark mode
To apply the Dark mode in the moment that users acess a web site, it needs to make sure user's device is in use before anyting else. The manners for this in CSS and JavaScript are following below text.

#### CSS
CSS support 'prefers-color-scheme' mediaquery that tell you which theme your device uses CSS. 'prefers-color-scheme' mediaquery can have the following result.

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

Unfortunatly, some browsers do not apply 'prefers-color-scheme' mediaquery or have other result with actual user device's system theme settiong.

 - ✅ : Supported.
 - ❌ : Not supported or has a different value from the system theme settings.

| OS / Browser  | Safari | Chrome | Firefox | Whale |
| ------------- |:------:|:------:|:-------:|:-----:|
| iOS           |✅      |❌      |❌      |❌     |
| iPadOS        |✅      |❌      |❌      |❌     |
| macOS         |✅      |✅      |✅      |❌     |


#### JavaScript
In JS, you have to borrow CSS's mediaquery and check it. Because CSS depends on mediaquery, compatibility is decided in accordance with support status of 'prefers-color-scheme' mediaquery.
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

All CSS codes related with Dark mode are in one mediaquery. Therefore, CSS codes of Dark mode are put aside in file named 'dark.css' and can be controlled with mediaquery of file-level as utilizing 'media' property of 'link' tag.

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
위에서 언급한 다크모드 인식 문법은 iOS13 이상, iPadOS, MacOS Mojave 이상의 일부 브라우저에서만 작동합니다. 최신 버전의 애플 기기가 아니거나 지원하지 않는 브라우저를 사용하고 있다면 작동하지 않습니다. 아래부터는 일반 사용자가 다크모드에 접근하도록 유도하는 방법을 다룹니다.

앞서 파일을 분리하기 위해 추가한 `link` 요소의 `media` 속성을 조작하는 것으로 해당 CSS를 활성화하거나 비활성화할 수 있습니다. 우선 다크모드를 끄고 켜는 JavaScript 함수를 `darkModeSwitch`라고 하고 이를 조작할 버튼을 만듭니다.
```html
<p>
  Dark Mode:
  <a onclick="darkModeSwitch(true)">ON</a>
  /
  <a onclick="darkModeSwitch(false)">OFF</a>
</p>
```

그리고 위에서 `dark.css`를 불러오기 위해 추가한 `link` 태그에 id를 부여합니다.
```html
<link id="dark-mode-sheet"
      rel="stylesheet"
      href="assets/css/dark.css"
      media="(prefers-color-scheme: dark)">
```

위에서 언급한 `darkModeSwitch` 함수를 정의해줍니다. 여기서 `link` 요소의 `media` 속성을 조작할 것입니다.
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

어렵지 않게 다크모드를 끄고 켜는 기능을 추가하였습니다. 하지만 사용자가 웹 페이지를 새로고침하거나 다른 페이지로 이동할 경우 다크모드는 해제됩니다. 이를 해결하기 위해 Cookie를 사용해 브라우저에 설정값을 저장하고 항상 이 설정에 따라 웹 페이지를 꾸미도록 합니다.

이 글에서는 쿠키의 조작을 위해 `JavaScript Cookie` 라이브러리를 사용합니다.
[자세히보기](https://github.com/js-cookie/js-cookie)

우선 다크모드로 변경할 때 마다 이를 쿠키로 저장합니다. 쿠키는 문자열로 값을 저장하기 때문에 상태값을 정수형으로 변환해서 저장하였습니다. 그리고 이 값을 가져오는 함수 `isDarkMode`도 추가합니다.
```javascript
function isDarkMode() {
  return Cookies.get('darkmode');
}

function darkModeSwitch(status) {
  Cookies.set('darkmode', +status);
  document
  .querySelector('#dark-mode-sheet')
  //중략
}
```

이제 웹 페이지가 시작될 때 이 값에 따라 페이지를 조작해야 합니다. 쿠키값이 있다면 사용자 기기의 다크모드 설정을 무시하고 쿠키값에 따라 페이지를 조작합니다. 만약 쿠키값이 없다면 아무런 조작도 하지 않습니다. 저장된 값은 정수로 이루어진 문자열이므로 이를 다시 정수형으로 변경해줍니다.

```javascript
//전략
document.addEventListener('DOMContentLoaded', function () {
  const isDm = isDarkMode();
  if (isDm != null) darkModeSwitch(+isDm);
});
```

이제 다크모드를 모든 사용자에게 완벽하게 지원할 수 있게 됩니다.

## 애니메이션
다크모드로 변할 때 애니메이션을 추가하면 더욱 완성도 있는 웹 디자인이 됩니다.

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

테스트에 사용된 페이지는 [여기](https://tmdgus0084.github.io/apple-dark-mode/)를 눌러 확인할 수 있습니다.
다양한 사용자의 사용자 경험을 위해 더 많은 자료를 탐색하고 발전하길 기원합니다.
이 글이 도움이 되었다면 스타⭐️를 눌러주세요!
감사합니다.
