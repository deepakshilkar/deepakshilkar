---
layout: posts
permalink: /general/computers/debloat-outlook-part-one/
title: "Microsoft Outlook series - Part 1: How to optimise Outlook performance"
excerpt: "Microsoft Outlook is a handy tool. A lot of universities have a subscription to Outlook and can help people in Academia manage their email in a smart way. This is a short piece in a multipart article discussing the use of Outlook."
author_profile: true
date: 2023-09-05T00:00:00+05:30
comments: true
classes: wide
read_time: true
share: true
related: false
categories:
  - Tips
  - Tricks
tags:
  - Microsoft
  - Outlook
  - Office365    
---

Microsoft Outlook is a wonderful app that helps you manage your emails perfectly
with labels, flags, filters etc. If you have a good configuration laptop/ PC,
using outlook is butter. But! If you have a low configuration system, Outlook
becomes laggy over time. This has partly to do with the offline caches stored by
outlook.

**What are offline caches?**

Outlook has feature called “caching” which downloads a copy of your mailbox to
your local storage. This feature allows you to access your email even when you
are offline. While this has some benefits such as improved performance
considering the fact that our mailboxes are nowadays housed in a centralized
server delaying the access time. Outlook’s local cache of mailbox data in an OST
file which has varied size limits (up to 50 GB in Office 365). As the size of
this IST file grows, the performance of Outlook starts degrading. Moreover,
larger OST files can also get corrupted.

**What is the solution?**

The good news is that the performance can be optimized by changing the cache
size. This is especially important when you have several mailboxes in a single
outlook file. Here is a step-by-step guide to adjust the cache size.

1. Open the Outlook app/client.

2. In the top left corner, click on the **File** menu.
   
   ![Account Settings menu](/images/general/outlook-debloat.png)

3. Navigate to **Account Settings.** A dialog box with your account information
   should appear.

4. Click on **Change** (circled in Red).
   
   ![List of accounts and options](/images/general/outlook-debloat2.png)

5. A dialog box appears with an option to adjust the duration of mail cache.
   The duration can vary from 3 days to all emails (this is applicable for
   Microsoft Exchange)
   
   ![Cache duration options for Microsoft Exchange accounts](/images/general/outlook-debloat3.png)
   
   For Gmail accounts, a different type of dialog box appears. Nevertheless,
   the options are almost similar, and the duration of Gmail cache can range
   from 1 month to all emails.
   
   ![Cache duration options for Google accounts](/images/general/outlook-debloat4.png)

6. That is all. Once you have adjusted the email cache **to an optimal size**,
   within one or two restarts, your Outlook would start running faster.

This should increase the speed by a lot. If you want more tips on outlook and, please visit my other posts.

This post was created using [FrontMatter](https://frontmatter.codes/) and [GIMP 2.10](https://www.gimp.org/). 
