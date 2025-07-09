---
title: "Microsoft Office Series: Word comments update"
date: 2022-04-30T00:00:00+05:30
weight: 5
# aliases: ["/first"]
tags: ["Microsoft Office, Word"]
author: "Deepak Shilkar"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: true
description: "How to bring back the lines in comment balloons that are remov ed in the recent updates"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true

tags:
  - Microsoft
  - Microsoft Word
  - Office 365
---

Microsoft Office appears to be suffering from the same problem that current Indian government does: they have a ton of interesting schemes and initiatives, but they cannot communicate them to the people effectively. 

Office 365 introduced a new comment feature last year that removed the comment lines from the document. Comments have always shown to the pane on the right and I had a line connecting the balloon to the highlighted text. Somewhere before version 2009 (Build 13231.20152), they removed these lines. 

If you would like to bring back the comments, consider the following procedure step by step. 

# Rolling back to the previous version of Word Based on

The following page provides proper instructions to install the older versions of Microsoft Office. I have slightly modified these instructions to fit for purpose in our case. 

https://support.microsoft.com/en-us/topic/how-to-revert-to-an-earlier-version-of-office-2bd5c457-a917-d57e-35a1-f709e3dda841



- Go to the above-mentioned link to download the “Office Deployment Tool”: https://www.microsoft.com/en-us/download/confirmation.aspx?id=49117

- Download the file to a folder on your PC (C:/Users/Documents/**RollBack**/)

- Save the file to this folder and then run the .exe file.

- Create a new folder when prompted (e.g., Documents\Word Rollback), choose this folder, and click OK.

- Open Notepad and paste the following text in the file:
  
  ```
  <Configuration>
  
  <Updates Enabled="TRUE" TargetVersion="16.0.15028.20160" />
  
  </Configuration>
  ```

- Save this file to the rollback folder that you just created with the name config.xml

- Open a command prompt window as administrator and navigate to the folder with the following command (do not use the square brackets):
  
  > cd [Your Directory]

- With your command window prompt pointing to the rollback folder, enter the following command: 

```
setup.exe /configure config.xml
```

<Configuration>

<Updates Enabled="TRUE" TargetVersion="16.0.13801.20360" />

</Configuration>

A small prompt will appear with Microsoft Office configuration window. This window will subsequently disappear. 

Next, you'll have to Open Microsoft word and navigate to the account section and update Microsoft Office. This update will take you back to the version specified above.



![ Account Window](C:\Users\Deepak\Documents\my-web-projects\deepakshilkar.github.io\img\2022-04-16-16-56-28-image.png)

Once updated, restart MS Office and you will have reverted back to the old version. Now disable updates and you are good.





# Important

Once you have completed these steps, navigate to the options panel and uncheck the enable new comments option. 

![Options panel](C:\Users\Deepak\Documents\my-web-projects\deepakshilkar.github.io\img\Screenshot%202022-04-16%20170723.jpg)



Now you will have old comments but new features of MS Office. Next, if you would like to experience the new features, enable the new experience.

![New experience](C:\Users\Deepak\Documents\my-web-projects\deepakshilkar.github.io\img\Screenshot%202022-04-16%20171139.jpg)
