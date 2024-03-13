---
title: "USB not detected on Windows PC but works on others"
permalink: /usb-not-detected-windows-pc-works-others/
date: 2024-03-12T10:00:00+08:00
draft: false
summary: "If your USB pendrive is not detected on a specific Windows PC but works on others, the issue might lie within the software or hardware compatibility of the problematic PC. Here are some technical methods to address the issue."
classes: wide
read_time: true
share: true
related: false
author: "Deepak Shilkar"
categories:
    - Miscellaneous
tags:
    - USB
    - Pendrive
comment: true
aliases: 
---


I recently bought a Sandisk Cruzer blade, plugged and ejected several times into my PC, several times unsafely. Suddenly, it stopped being detected on that particular PC, but worked on others, including parallel boot Fedora. Below, I am providing a list of troubleshooting options that I tried to resolve the issue, along with the solution that worked. 

### 1. Windows USB Power Settings ❌
Sometimes, Windows turns off USB devices to save power. To check and change this setting:

1. Open Device Manager.
2. Expand the "Universal Serial Bus controllers" section.
3. Right-click on each "USB Root Hub" device and select "Properties".
4. Go to the "Power Management" tab and uncheck "Allow the computer to turn off this device to save power".
5. Click "OK" and repeat for each USB Root Hub listed.

### 2. Windows Hardware and Devices Troubleshooter ❌
The built-in troubleshooter can sometimes resolve undetected USB device issues:
- Open Settings > Update & Security > Troubleshoot > Additional troubleshooters.
- Run the "Hardware and Devices" troubleshooter and follow the on-screen instructions.

### 3. Windows Registry ❌
**Warning: Be very careful when editing the registry. Making incorrect changes can cause serious system issues.**

If your USB drive is not listed in Disk Management, there might be an issue with Windows registry settings:
1. Press Win + R, type `regedit`, and press Enter to open the Registry Editor.
2. Navigate to `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{36FC9E60-C465-11CF-8056-444553540000}`.
3. Look for any entry named "UpperFilters" or "LowerFilters" on the right pane. If found, right-click on them and delete.
4. Restart your computer.

### 4. Disk Management ✔️
Sometimes the drive is detected by Windows but is not assigned a drive letter, making it invisible in File Explorer:
- Press Win + X and select "Disk Management".
- Look for your pendrive (it might show as "Removable" without a drive letter).
- If it's there, right-click on it and choose "Change Drive Letter and Paths".
- Click "Add" and assign a drive letter.


#### Why did this solution work?

Windows uses drive letters to identify and access storage devices. When a new drive, like a USB flash drive, is plugged into a Windows PC, the operating system is supposed to automatically assign a unique drive letter. This letter acts as an identifier, allowing users to access the drive via File Explorer. However, ***if Windows fails to assign a drive letter, the drive will not appear in File Explorer, even though it might be visible in Device Manager or Disk Management***, indicating the OS detects the hardware but can't display it for user interaction.

#### Why Drive Letters Might Not Be Assigned

1. **Drive Letter Conflict:** If the drive's default letter is already in use by another device, Windows might fail to assign a new, unique letter.
2. **Policy Restrictions:** In some corporate or secure environments, group policies might restrict automatic drive letter assignments to prevent unauthorized data access.
3. **Corrupted or Outdated System Files:** System issues or bugs can interfere with the normal operation of assigning drive letters.
4. **Registry Errors:** The Windows registry, which stores configuration settings, might contain errors or corrupted entries that affect drive letter assignments.

To minimize future USB drive detection issues, consider these tips:

- **Safely Eject Hardware:** Always use the "Safely Remove Hardware" option before unplugging a USB drive to prevent data corruption and system conflicts.
- **Avoid Using the Same Drive Letter for Multiple Devices:** If you frequently switch between devices, ensure they're configured to use different drive letters.
- **Maintain a Healthy System Registry:** Use reliable system maintenance tools to clean and repair registry issues, preventing configuration errors.

Cheers! Hope this helps someone. Feel free to comment and correct anything I have written above. 