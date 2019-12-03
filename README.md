
# 🌙 다크모드 웹 페이지 디자인

- [한국어](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.md)
- [English](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.en.md)
- [日本語](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.jp.md)

> この文書はまだ翻訳作業中です。

## 목차
1. [다크모드란?](#다크모드란)
2. [다크모드 인식하기](#다크모드-인식하기)
3. [다크모드 끄고 켜기](#다크모드-끄고-켜기)
4. [애니메이션](#애니메이션)

## 다크모드란?
2019년 9월 20일 새벽 2시, 애플은 아이폰과 아이팟 터치를 위한 새로운 운영체제인 iOS 13를 배포하기 시작했습니다. 또한 같은 해 6월 초에 열렸던 WWDC2019(애플 세계 개발자 회의)에서는, 웹개발자가 iOS13과 MacOS Mojave를 위한 다크모드를 제어할 수 있는 방법을 제공했습니다. 흰 바탕에 검은 글씨를 띄우던 기존의 UI와는 달리, 다크모드는 검은 바탕에 흰 글씨를 띄우며 전체적으로 어두운 모습을 보여주는 UI입니다. 디자인에 검은색이 많이 사용되기 때문에 아이폰11Pro와 같이 OLED 디스플레이를 사용하는 기기에서는 전력 소모를 줄일 수 있으며 눈도 한결 편안해진다는 장점을 가지고 있습니다. 이 글에서는 보다 통일성 있는 UI 및 UX를 위해 다크모드를 사용 중인 사용자가 웹 사이트에 접속할 경우 자동으로 웹 사이트를 어두운 디자인으로 변경하는 방법을 다룹니다.

## 다크모드 인식하기
사용자가 웹 사이트에 접속한 순간 다크모드를 적용하려면 우선 사용자의 기기가 다크모드를 사용하고 있는지 확인해야 합니다. CSS와 JavaScript에서 이를 확인하는 방법은 다음과 같습니다.

#### CSS
CSS는 사용자 기기가 어떤 테마를 사용하는지 알려주는  `prefers-color-scheme`미디어쿼리를 지원합니다.  `prefers-color-scheme`는 다음과 같은 값을 가질 수 있습니다.

- no-preference: 테마를 알리지 않음.
- light: 라이트모드를 사용중임.
- dark: 다크모드를 사용중임.

따라서 아래와 같은 코드를 통해 다크모드를 사용중인 사용자에게만 작동하는 CSS 코드를 작성할 수 있습니다.
```css
@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

그러나, 일부 브라우저는  `prefers-color-scheme`미디어쿼리를 지원하지 않거나 실제 사용자 기기의 시스템 테마 설정과는 다른 값을 가지고 있습니다.

 - ✅ : 지원함
 - ❌ : 지원하지 않거나 시스템 테마 설정과 다른 값을 가짐.

| OS / Browser  | Safari | Chrome | Firefox | Whale |
| ------------- |:------:|:------:|:-------:|:-----:|
| iOS           |✅      |❌      |❌      |❌     |
| iPadOS        |✅      |❌      |❌      |❌     |
| macOS         |✅      |✅      |✅      |❌     |


#### JavaScript
JS에서는 CSS의 미디어쿼리를 빌려온 뒤,  `prefers-color-scheme` 미디어쿼리 지원여부를 확인하여 호환성을 결정합니다.

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

이제 다음과 같은 코드를 적용해서 다크모드를 지원하는 데 성공했습니다.

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

![다크모드](img/dark-diff.png)

다크모드와 관련된 CSS 코드는 모두 하나의 미디어쿼리 속에 작성되어 있습니다. 따라서 다크모드의 CSS 코드는  `dark.css`라는 파일에 따로 담아두고  `link` 태그의  `media` 속성을 활용해 파일 단위의 미디어쿼리를 조작할 수 있습니다.

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

## 다크모드 끄고 켜기
위에서 언급한 다크모드 인식 문법은 iOS13 이상, iPadOS, MacOS Mojave 이상의 일부 브라우저에서만 작동합니다. 최신 버전의 애플기기가 아니거나 prefers-color-scheme 미디어쿼리 기능을 지원하지 않는 브라우저를 사용하고 있다면 다크모드는 작동하지 않습니다. 아래부터는 다크모드 기능을 지원하지 않는 기기를 사용하는 이용자가 다크모드를 사용할 수 있도록 하는 방법을 다룹니다.

앞서 파일을 분리하기 위해 추가한  `link` 요소의  `media` 속성을 조작하는 것으로 해당 CSS를 활성화하거나 비활성화할 수 있습니다. 우선 다크모드를 끄고 켜는 JavaScript 함수를  `darkModeSwitch`라고 하고 이를 조작할 버튼을 만듭니다.
```html
<p>
  Dark Mode:
  <a onclick="darkModeSwitch(true)">ON</a>
  /
  <a onclick="darkModeSwitch(false)">OFF</a>
</p>
```

그리고 위에서  `dark.css`를 불러오기 위해 추가한  `link` 태그에 id를 부여합니다.
```html
<link id="dark-mode-sheet"
      rel="stylesheet"
      href="assets/css/dark.css"
      media="(prefers-color-scheme: dark)">
```

위에서 언급한 `darkModeSwitch` 함수를 정의해줍니다. 여기서  `link` 요소의  `media` 속성을 조작할 것입니다.
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

어렵지 않게 다크모드를 끄고 켜는 기능을 추가하였습니다. 하지만 사용자가 웹 페이지를 새로고침하거나 다른 페이지로 이동할 경우 다크모드는 해제됩니다. 이 문제는 Cookie를 사용해 브라우저에 설정값을 저장하고 이 설정에 따라 웹 페이지를 표시하도록 하면 해결됩니다.

이 글에서는 쿠키의 조작을 위해  `JavaScript Cookie` 라이브러리를 사용합니다. 
[자세히보기](https://github.com/js-cookie/js-cookie)

우선 다크모드로 변경할 때마다 이를 쿠키로 저장합니다. 쿠키는 문자열로 값을 저장하기 때문에 상태값을 정수형으로 변환해서 저장하였습니다. 그리고 이 값을 가져오는 함수  `isDarkMode`도 추가합니다.
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

![애니메이션](img/ani.gif)
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
