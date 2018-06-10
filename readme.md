
# このリポジトリについて

WordPressのテーマである[Snow Monkey](https://github.com/inc2734/snow-monkey)専用子テーマのリポジトリです。

SnowMonkeyはモンキーレンチのキタジマ氏が開発・販売している100%GPLのWordPressテーマです。

## 利用方法

### インストール
`$ git clone https://github.com/contiki9/baby-monkey.git`
`$ cd baby-monkey`
`$ npm i`
※ gitとnode.jsとnpmはインストール済みの想定です。

### 実行
`$ gulp `

上記でWatchが走り、CSS、JS、IMAGEが`assets`として吐き出されます。


## 注意事項
- `SnowMonkey`が同階層にインストールされてないと`gulp`の実行で失敗します。
- 多分ちゃんと私がメンテナンスしないと親テーマのアップデートのタイミングで、何かあればissueください。
- なにかあっても自己責任でお願いします。

## この子テーマの特徴

- `gulp`が使えます。
- `SCSS`を親テーマから読み込んでいるので、変数によってSCSSで全体的なカスタマイズが容易です。
- 私がよく使うMIXINがデフォルトで入っています。
- フォームまわりの見た目を調整済みです。


