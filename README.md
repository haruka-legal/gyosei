# 遥か行政書士事務所 コーポレートサイト

Eleventy(11ty)で構築。記事はMarkdown、GitHub Actionsが自動でビルド・公開します。

## 新しい記事を1本追加する手順

1. `src/articles/` フォルダに、新しい `.md` ファイルを作る（ファイル名がそのままURLになります。例: `foo-bar.md` → `/articles/foo-bar/`）
2. ファイルの先頭に、以下の形式で情報（フロントマター）を書く

```yaml
---
layout: layouts/article.njk
title: "記事タイトル"
description: "検索結果に表示される説明文（120字程度）"
keywords: "キーワード1,キーワード2"
category: "カテゴリ名（例：技人国ビザ）"
datePublished: 2026-07-15
image: "/images/記事用イラストのファイル名.jpg"
imageAlt: "画像の説明"
breadcrumbs:
  - { name: "トップ", url: "/" }
  - { name: "お役立ち記事", url: "/articles/" }
  - { name: "記事タイトル（短縮版）", url: "/articles/foo-bar/" }
checklist:
  - "チェック項目1"
  - "チェック項目2"
faq:
  - q: "質問1"
    a: "回答1"
  - q: "質問2"
    a: "回答2"
---
```

3. `---` の下に、記事の本文をMarkdownで書く（`## 見出し`、`**強調**`、通常の段落など）
4. 記事のイラスト画像を `src/images/` フォルダに入れる
5. GitHubにアップロード（`git push` またはWebのドラッグ&ドロップ）すると、自動的にビルドされ、数分でサイトに反映されます

**これだけで、トップページの記事カード・記事一覧ページ・サイトマップ・llms.txtに自動的に追加されます。** 手作業でHTMLファイルを組み立てたり、他のページを書き換えたりする必要はありません。

## checklist / faq は省略可能

その記事にチェックリストやFAQが不要な場合は、フロントマターからその項目を削除すれば、その部分は表示されません（無理に埋める必要はありません）。

## トップページに固定表示する記事を変えたい場合

`src/index.njk` の中にある `pinnedSlug` の値（ファイル名）を変更してください。

## ローカルで確認したい場合

```
npm install
npm run serve
```

でブラウザ上でプレビューできます（`npm run build` だけならビルドのみ）。

## 注意：Googleサイト所有権確認ファイルについて

`googleXXXXXXXXXXXXXX.html` のような所有権確認ファイルは、このリポジトリには含まれていません。旧リポジトリからそのままコピーして `src/static/` フォルダに入れてください（このフォルダの中身はビルド時にそのままルート直下にコピーされます）。
