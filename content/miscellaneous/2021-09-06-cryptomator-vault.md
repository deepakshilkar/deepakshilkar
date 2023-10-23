---
title: "How to encrypt your data in cloud"
date: 2022-04-30T00:00:00+05:30
# weight: 1
# aliases: ["/first"]
tags: ["Cryptomator, Encrypt"]
author: "Deepak Shilkar"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: true
description: "For those who are paranoid about their data being misused in the cloud, here is a solution"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
tags:
  - Encryption
  - Cloud
  - Privacy   
---

Quite a lot of people I’ve met so far have mentioned the reservations regarding the data that’s stored in the cloud. The reservations mostly amount to the idea that the cloud provider is somehow analyzing the data and infringing on their privacy. 

Even though cloud providers have repeatedly mentioned not using any of the customer data, especially from the storage, the paranoid ones can benefit from the total I have reviewed below. 

**Cryptomator** is a tool that allows you to create a secure vault within your cloud storage folder and helps you encrypt both files and filenames with AES and 256 bit key length. This court can then be synchronized without spilling over any of its contents. The best part is you can copy the folder containing the vault anywhere. 

As long as you have access to Cryptomator and the password, the vault can be decrypted on any system without trouble. 

However, if you forget the password and also the backup key consider your data as gone. Therefore I highly recommend that you store the password and backup key safely, probably as multiple copies in different locations especially with the help of a password manager like [Bitwarden](https://bitwarden.com/).

**Visit Cryptomator** [Click me](https://cryptomator.org/){: .btn}