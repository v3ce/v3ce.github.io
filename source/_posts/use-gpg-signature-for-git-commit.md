---
title: 在 GitHub/GitLab 上使用 GPG 簽署提交紀錄
tags:
  - Git
  - GitHub
  - GitLab
  - GPG
date: 2021-02-25 02:55:00
cover: https://i.imgur.com/pwMmzHb.png
keywords: 'GitHub, GPG'
---

在版本控制軟體 Git 的提交紀錄中，每一條提交紀錄會存放提交紀錄的作者（commit author）和執行提交操作的用戶（committer）的名稱、電子郵件和時間戳記。由於這些資訊是以字串形式儲存在提交紀錄中，有可能會被仿冒或修改，為了防範這種行為，我們可以使用 GPG 簽名（GPG Signature）簽署提交紀錄，並讓 GitHub 和 GitLab 等程式碼託管平台確認是本人的操作。

<!-- more -->

## 資訊加密

### PGP 與 GPG


## 簽名驗證

```bash

```

## 金鑰管理

### 安裝 GnuPG

```bash
# Debian / Ubuntu
$ sudo apt install gpg

# macOS
$ brew install gpg

# Arch Linux / Manjaro
$ sudo pacman -S install gpg
```

```powershell
# Microsoft Windows
> scoop install gpg
```

### 生成金鑰

```bash
$ gpg --full-generate-key
```

### 金鑰匯出

```bash
# export the GPG public key
$ gpg --output hsins_pub.gpg --export --armor 9E9DD37D0AE1558E

# export the GPG private key
$ gpg --output hsins_sec.gpg --export-secret-key --armor 9E9DD37D0AE1558E
```

### 金鑰匯入

```bash
# import the GPG public key
$ gpg --import hsins_pub.gpg

# import the GPG private key
$ gpg --allow-secret-key-import --import hsins_sec-sec.gpg
```

### 託管金鑰

## 終端設定

```bash
# setup the signature key for local git
$ git config --global user.signingkey 9E9DD37D0AE1558E

# activate signing commit with GPG signature by default
$ git config --global commit.gpgsign true
```

## 疑難排解

### 匯入金鑰的信任層級為未知 `[unknown]`

GnuPG 會將金鑰存放於位在 `~/.gnupg/trustdb.gpg` 的信任資料庫（trust database），如果匯出金鑰並在新的環境匯入，並不會保留信任資料庫中的資訊，因此在匯入金鑰後執行 `gpg --list-keys` 命令檢查金鑰清單時，會發現匯入金鑰的信任層級會是 `[unknown]`：

```bash
$ gpg --list-secret-keys --keyid-format LONG
/Users/hsins/.gnupg/pubring.kbx
-------------------------------
sec   rsa4096/9E9DD37D0AE1558E 2021-02-04 [SC]
      AECB1DCCA747D99E57DE19E29E9DD37D0AE1558E
uid                 [ unknown] Hsins <hsinspeng@gmail.com>
ssb   rsa4096/C44D8177ADB88C41 2021-02-04 [E]
```

我們可以透過以下方式交互式地將金鑰設定改為 `[ultimate]` 信任層級：

```plain
$ gpg --edit-key hsinspeng@gmail.com
gpg> trust

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5
Do you really want to set this key to ultimate trust? (y/N) y

sec  rsa4096/9E9DD37D0AE1558E
     created: 2021-02-04  expires: never       usage: SC
     trust: ultimate      validity: unknown
ssb  rsa4096/C44D8177ADB88C41
     created: 2021-02-04  expires: never       usage: E
[ unknown] (1). Hsins <hsinspeng@gmail.com>
Please note that the shown key validity is not necessarily correct
unless you restart the program.
```

## 參考資料

- [Managing commit signature verification](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification)
- [GPG Failed to Sign the Data. `fatal: failed to write commit object`](https://stackoverflow.com/questions/39494631/gpg-failed-to-sign-the-data-fatal-failed-to-write-commit-object-git-2-10-0)
- [`gpg —list-keys` Command Outputs uid `[ unknown ]` After Importing Private Key onto a Clean Install](https://unix.stackexchange.com/questions/407062/gpg-list-keys-command-outputs-uid-unknown-after-importing-private-key-onto)
- [震惊！竟然有人在 GitHub 上冒充我的身份！](https://blog.spencerwoo.com/2020/08/wait-this-is-not-my-commit)
- [在 GitHub 上使用 GPG 認證你的 Git Commit](https://blog.ichr.me/post/use-gpg-verification-in-github/)
- [如何使用 GPG (GnuPG) 對 Git Commit 與 Tag 進行簽章](https://blog.miniasp.com/post/2020/05/04/How-to-use-GPG-sign-git-commit-and-tag-object)