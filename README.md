# 🌙 ダークモードウェブページデザイン

- [한국어](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.md)
- [English](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.en.md)
- [日本語](https://github.com/tmdgus0084/apple-dark-mode/blob/master/README.jp.md)

## 목차
1. [ダークモードとは](#ダークモードとは)
2. [ダークモードの認識](#ダークモードの認識)
3. [ダークモードのオン・オフ](#ダークモードのオンオフ)
4. [アニメーション](#アニメーション)

## ダークモードとは
2019年9月20日午前2時、アップルはiPhoneとiPodTouchに向けた新しい運営体制であるiOS 13を公開し始めました。また、同年6月初旬に開かれたWWDC2019(アップル世界開発者会議)では、ウェブ開発者がiOS13とMacOS Mojaveを向けたダークモードを制御できる方法を提供しました。白い画面の上に黒い文字を表す以前のUIとは違って、このダークモードは黒い画面に白い文字を表して全体的に暗い姿を見せるUIです。デザインに黒い色がたくさん使われるため、iPhone11ProのようにOLEDディスプレイを使用する機器では電力の消耗を減らす事ができ、目が疲れるのを防ぐ事が出来るというメリットが有ります。この文章では、もっと統一性のあるUIとUXのためにダークモードを使用しているユーザーがウェブサイトにアクセスする場合、自動的にウェブサイトを暗いデザインに変更させる方法を教えて差し上げます。

## ダークモードの認識
ユーザーがウェブサイトにアクセスした瞬間にダークモードを適用するためには、まずユーザーの機器がダークモードを使用しているかを確認しなければなりません。 CSSとJavaScriptでこれを確認する方法は次の通りです。

#### CSS
CSSは、ユーザ機器がどのようなテーマを使用するのかを教えてくれる`prefers-color-scheme`メディアクエリーをサポートします。`prefers-color-scheme`は次のような値を持つことができます。

- no-preference: テーマ不詳
- light: ライトモードを使用中
- dark: ダークモードを使用中

これで、以下のコードを利用して、ダークモードを使用するユーザーだけに作動するCSSコードを作成することができます。
```css
@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

しかし、一部のブラウザは、`prefers-color-scheme`メディアクエリーをサポートしなかったり、実際のユーザ機器のシステムテーマ設定とは異なる値を持ったりすることがあります。

 - ✅ : サポート中
 - ❌ : サポートしなかったり、実際のユーザ機器のシステムテーマ設定とは異なる値を持ったりする

| OS / Browser  | Safari | Chrome | Firefox | Whale |
| ------------- |:------:|:------:|:-------:|:-----:|
| iOS           |✅      |❌      |❌      |❌     |
| iPadOS        |✅      |❌      |❌      |❌     |
| macOS         |✅      |✅      |✅      |❌     |


#### JavaScript
JSではCSSのメディアクエリーを借りて来た後、`prefers-color-scheme`メディアクエリーの支援有無を確認します。これで互換性が決まります。

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

次のようなコードを適用して、ダークモードのサポートに成功しました。

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

ダークモードに関連するCSSコードは全て一つのメディアクエリーの中に作成されています。なので、ダークモードのCSSコードは`dark.css`というファイルに別々に保存しておき、`link`タグの`media`属性を活用してファイル単位のメディアクエリーを操作することができます。

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

## ダークモードのオン・オフ
上で言及したダークモード認識文法はiOS13以上、iPadOS、MacOS Mojave以上の一部のブラウザでしか動作しません。最新バージョンのアップル機器を使わなかったり、prefers-color-schemeメディアクエリー機能をサポートしないブラウザを使用したりする場合は、ダークモードは動作しません。下記からはダークモード機能をサポートしない機器を使用するユーザーがダークモードを使用できるようにする方法を教えてあげます。

先にファイルを分離するために追加した`link`要素の`media`属性を操作することで、CSSを活性化したり、無効化したりすることができます。まず、ダークモードをオフ・オンにするJavaScript関数を`darkModeSwitch`と名付けて、これを操作するボタンを作ります。
```html
<p>
  Dark Mode:
  <a onclick="darkModeSwitch(true)">ON</a>
  /
  <a onclick="darkModeSwitch(false)">OFF</a>
</p>
```

そして、先に`dark.css`を読み込むために追加した`link`タグにidを付与します。
```html
<link id="dark-mode-sheet"
      rel="stylesheet"
      href="assets/css/dark.css"
      media="(prefers-color-scheme: dark)">
```

上記に言及した`ddarkModeSwitch`関数を定義します。ここで`link`要素の`media`属性を操作します。
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

ダークモードをオフにしてオンにする機能を追加しました。 しかし、ユーザーがウェブページをリフレッシュしたり、他のページに移動したりする場合、ダークモードは解除されます。 この問題は、Cookieを使ってブラウザに設定値を保存し、この設定に従ってウェブページを表示するようにすれば解決されます。

この文では、クッキーの操作のために`JavaScript Cookie`ライブラリを使用します。
[もっと見る](https://github.com/js-cookie/js-cookie)

まず、ダークモードに変更するたびに、これをクッキーとして保存します。 クッキーは文字列で値を保存するため、状態値を整数型に変換して保存します。そして、この値を持ってくる関数`isDarkMode`も追加します。
```javascript
function isDarkMode() {
  return Cookies.get('darkmode');
}

function darkModeSwitch(status) {
  Cookies.set('darkmode', +status);
  document
  .querySelector('#dark-mode-sheet')
  //中略
}
```

これからはウェブページが始まるときにこの値にしたがってページを操作しなければなりません。 クッキー値がある場合は、ユーザの機器のダークモード設定を無視し、クッキー値にしたがってページを操作します。もしクッキー値がなかったら何の操作もしません。保存された値は定数で成り立つ文字列なので、これを再び整数型に変更します。

```javascript
//前略
document.addEventListener('DOMContentLoaded', function () {
  const isDm = isDarkMode();
  if (isDm != null) darkModeSwitch(+isDm);
});
```

ダークモードをすべてのユーザーに完璧にサポートできるようになりました。

## アニメーション
ダークモードに変わるたびにアニメーションを追加すると、もっと完成度の高いウェブデザインになります。

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

テストに使用されたページは [こちら](https://tmdgus0084.github.io/apple-dark-mode/)をクリックして確認できます。様々なユーザーの経験のために、多くの資料を探索し、発展することを祈ります。この文が役に立ったならスター⭐️をクリックして下さい！
読んで頂いてありがとうございます.
