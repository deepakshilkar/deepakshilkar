---
title: "Create multiple folders with file names in PowerShell"
permalink: /create-multiple-folders-file-names-powershell/
date: 2023-10-25T10:00:00+08:00
draft: false
summary: "Create multiple folders with file names in PowerShell"
classes: wide
read_time: true
share: true
related: false
author: "Deepak Shilkar"
categories:
    - Tips
tags:
    - Powershell
comment: true
aliases: create-multiple-folders-file-names-powershell
---

I was preparing files for molecular dynamics on Windows (too lazy to boot into parallel Linux). I had all the drug protein complexes in one folder in the format `PDB ID + Ligand` and needed to create a folder for each file. After some ordeal with documentation, I wrote the following PowerShell script to create a folder for each file in a folder. Hope it helps someone.

```powershell

# Define the source folder containing the files
$sourceFolder = "F:\Projects\VJ\PPAR\Proteins"

# Get a list of files in the source folder
$files = Get-ChildItem -Path $sourceFolder

# Loop through each file and create a folder with its name
foreach ($file in $files) {
    # Check if the item is a file
    if ($file.PSIsContainer -eq $false) {
        # Create a folder with the same name as the file (without the file extension)
        $folderName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $folderPath = Join-Path -Path $sourceFolder -ChildPath $folderName

        # Check if the folder already exists, and if not, create it
        if (-not (Test-Path -Path $folderPath -PathType Container)) {
            New-Item -Path $folderPath -ItemType Directory
        }

        # Move the file to the corresponding folder
        Move-Item -Path $file.FullName -Destination $folderPath
    }
}
```

This script will create folders (without extension names) in the parent folder you specified above. If you do not want the files to be moved in the corresponding folder, you can comment out the last line. If you want the files to be copied, not moved, you can replace the last line with the following:

```powershell
Copy-Item -Path $file.FullName -Destination $folderPath
```

Hope this helps. If you have any questions, please feel free to comment below.