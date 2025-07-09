---
layout: posts
title: "Read the docs! Do not re-invent the wheel! A chocolatey case study."
excerpt: "A quick guide on how to upgrade all software packages on your PC using Chocolatey, with a twist."
weight: 8
author_profile: true
date: 2024-07-31T00:00:00+05:30
comments: true
classes: wide
read_time: true
share: true
related: false
hasMermaid: false
categories:
  - Tips
tags:
  - Powershell
---

I've been a long-time user of [Chocolatey](https://chocolatey.org/), primarily using it for clean installations and uninstallations of software. Recently, I started using Chocolatey to manage and upgrade existing software on my PC, combined with PowerShell. Here’s how I achieved it.

To update all the software on your PC, the command **`choco upgrade all -y`** works perfectly. Since the packages come from verified sources, I generally don't worry about malware. This command performs an unattended installation of all possible software, as Chocolatey can take over existing installs and handle uninstalls in most cases. If there isn't a **`chocolateyUninstall.ps1`** script, Chocolatey won’t be able to uninstall the software.

However, I have multiple software packages that I do not want to update. At this point, the default option for many people is to read the documentation to find a solution. But, the coder in me woke up and decided to devise a solution. Unaware of the `choco upgrade all --except="package1,package2,package3"` option, I decided to create a PowerShell script to help me accomplish this.

### Simple Upgrade with Manual Exclusion

My first version was rudimentary, requiring me to enter `choco outdated` and manually delete unnecessary packages from the output, which looked something like this:
```javascript
> choco outdated
Chocolatey v2.3.0
3 validations performed. 2 success(es), 1 warning(s), and 0 error(s).

Validation Warnings:
 - System Cache directory is not locked down to administrators.
   Remove the directory 'C:\ProgramData\ChocolateyHttpCache' to have
   Chocolatey CLI create it with the proper permissions.

Outdated Packages
 Output is package name | current version | available version | pinned?

anaconda3|2023.3.0|2024.6.0|false
chocolateygui|2.1.0|2.1.1|false
jetbrainstoolbox|2.1.3.18901|2.4.1.32573|false
libreoffice-still|7.5.9|24.2.5|false
miktex|24.3.0|24.4.0|false
mobaxterm|23.6.0|24.2.0|false
npm|1.4.9.20150213|1.4.9.20150213|false
putty|0.80.0|0.81.0|false
rclone|1.66.0|1.67.0|false
sandboxie-plus|1.12.6|1.14.5|false
strawberryperl|5.32.1.1|5.38.2.2|false
termius|8.9.1|9.1.1|false
vcredist140|14.38.33130|14.40.33810|false
```
I manually copied and formatted the package names, then generated the script below:
```
$packages = "7zip", "anaconda3", "audacity", "calibre", "chocolatey", "cmake", "cryptomator", "docker-desktop", "drawio", "ffmpeg", "foxitreader", "gimp", "git", "gitkraken", "hugo-extended", "imagemagick.app", "irfanview", "jre8", "local", "mobaxterm", "nodejs", "notepadplusplus", "npm", "pandoc", "pdf24", "pulsar", "rclone",    "strawberryperl", "vlc", "vscode", "winscp", "zotero", "zoom", "zettlr"

foreach ($package in $packages) {
    Write-Host "Upgrading $package..."
    choco upgrade $package --yes --force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Upgrade failed for $package. Continuing with the next package..."
    }
}
```

This script worked mostly well, ensuring that the installation process wasn't interrupted by errors. However, since I have Simplewall installed, Docker Desktop's installation was interrupted because Docker requires internet permissions. To overcome this, I created a more sophisticated script with an exclusion list and a regex query for package names.
```javascript
# Get the outdated packages, excluding those in the $exclude list 
$outdatedPackages = (choco outdated | Select-String -Pattern '^[a-zA-Z0-9-]+(?=\|)' | ForEach-Object { $_.Matches[0].Value.Trim() }) | Where-Object { $exclude -notcontains $_ } 

# Format the packages as a comma-separated list with quotes 
$packageList = $outdatedPackages | ForEach-Object { "`"$_`"" } -join ", " 

# Assign the formatted list to the $packages variable 
$packages = [string]::Join(", ", $outdatedPackages)
```
However, this got too complicated. A quick glance through the Chocolatey CLI docs and I found a different work around that omitted the requirement for the above text. 

## Version 3
```javascript
# Define the packages to exclude
$exclude = @("npm", "docker-desktop")

# Function to check if a package should be excluded
function Should-Exclude($packageName) {
    return $exclude -contains $packageName
}

# Get all outdated packages
Write-Host "Fetching outdated packages..."
$allOutdatedPackages = choco outdated -r

# Initialize an empty array to store packages to upgrade
$packagesToUpgrade = @()

# Process each outdated package
foreach ($package in $allOutdatedPackages) {
    $packageInfo = $package -split '\|'
    $packageName = $packageInfo[0]
    
    if (-not (Should-Exclude $packageName)) {
        $packagesToUpgrade += $packageName
        Write-Host "Added $packageName to upgrade list"
    } else {
        Write-Host "Excluded $packageName from upgrade list"
    }
}

# Output the list of packages to upgrade
Write-Host "`nPackages to upgrade:"
$packagesToUpgrade | ForEach-Object { Write-Host "- $_" }

# Confirm before proceeding
$confirmation = Read-Host "`nDo you want to proceed with the upgrade? (Y/N)"
if ($confirmation -ne 'Y') {
    Write-Host "Upgrade cancelled by user."
    exit
}

# Upgrade packages
foreach ($package in $packagesToUpgrade) {
    Write-Host "`nUpgrading $package..."
    $upgradeOutput = choco upgrade $package --yes --force
    
    # Check if upgrade was successful
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully upgraded $package"
    } else {
        Write-Host "Failed to upgrade $package. Error details:"
        $upgradeOutput | ForEach-Object { Write-Host $_ }
    }
}

Write-Host "`nUpgrade process completed."
```
This mostly got the job done. I was very proud of it and wanted to showcase it somewhere. So, I decided to write a blog article about it and started with a bit more research. That’s when I stumbled upon the `--except` flag, which lets you specify a comma-separated list of packages to exclude from the upgrade process. The command `choco upgrade all --except="package1,package2,package3"` allowed me to achieve the desired result—minus the 30 minutes I spent searching for the solution. 🤣🤣🤣

I was quickly reminded of something I read in **[101 Essays that will Changethe way You Think by Brianna Wiest](https://www.goodreads.com/book/show/32998876-101-essays-that-will-change-the-way-you-think)**

> **You think “problems” are roadblocks to achieving what you want, when in reality they are pathways.**
> Marcus Aurelius sums this up well: “The impediment to action advances action. What stands in the way becomes the way.” Simply, running into a “problem” forces you to take action to resolve it. That action will inevitably lead you to think differently, behave differently, and choose differently. The “problem” becomes a catalyst for you to actualize the life you always wanted. It pushes you from your comfort zone, that’s all.

At this point, I decided it was time to give this code a bit of a power boost. So, I went ahead and injected some steroids into it by adding a bunch of sophisticated features. Here’s what’s new:

1. **Logging**: Every action and its outcome are now logged to a file specified in the configuration. No more guessing what happened during the upgrade process!
2. **Retry Mechanism**: The script now tries to upgrade each package several times if needed, with a delay between attempts. This should help tackle those pesky temporary network glitches or transient errors.
3. **Detailed Package Information**: You can now see both the current and available versions of each package right in the script. Knowledge is power, after all!
4. **Email Notifications**: Once the upgrade is complete (or if something goes wrong), the script can shoot you an email with a summary of what happened. It’s like having a personal assistant keeping you updated.
5. **Configuration Section**: All the customizable settings are now neatly organized at the top of the script, making tweaks a breeze.
6. **Error Handling**: With new try/catch blocks in place, the script now handles unexpected errors much better and reports them in a more user-friendly way.
7. **Summary Generation**: At the end of the upgrade, you get a detailed summary showing what was upgraded successfully, what failed, and what was excluded. It’s like a report card for your packages.
8. **Flexible Exclusion**: The exclusion logic has been moved to its own function, so it’s super easy to adjust if you need to add more complex exclusion rules down the line.

Here is the result:
```javascript
# Script configuration
$config = @{
    ExcludePackages = @("npm", "Docker-Desktop")
    LogFile = "C:\Users\MinasTirith\Documents\Scripts\Choco\upgrade_log.txt"
    MaxRetries = 3
    RetryDelay = 30  # seconds
    EmailNotification = $true
    EmailFrom = "your-email@gmail.com"
    EmailTo = "recipient@example.com"
    SmtpServer = "smtp.gmail.com"
    SmtpPort = 587
    SmtpUsername = "your-email@gmail.com"
    SmtpPassword = "your-email-password"
}

# Function to log messages
function Write-Log {
    param (
        [string]$Message
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    Add-Content -Path $config.LogFile -Value $logMessage
}

# Function to check if a package should be excluded
function Should-Exclude {
    param (
        [string]$PackageName
    )
    return $config.ExcludePackages -contains $PackageName
}

# Function to send email notification
function Send-EmailNotification {
    param (
        [string]$Subject,
        [string]$Body
    )
    if ($config.EmailNotification) {
        try {
            $smtpClient = New-Object Net.Mail.SmtpClient($config.SmtpServer, $config.SmtpPort)
            $smtpClient.EnableSsl = $true
            $smtpClient.Credentials = New-Object System.Net.NetworkCredential($config.SmtpUsername, $config.SmtpPassword)
            
            $mailMessage = New-Object Net.Mail.MailMessage
            $mailMessage.From = $config.EmailFrom
            $mailMessage.To.Add($config.EmailTo)
            $mailMessage.Subject = $Subject
            $mailMessage.Body = $Body
            
            $smtpClient.Send($mailMessage)
            Write-Log "Email notification sent successfully."
        }
        catch {
            Write-Log "Failed to send email notification: $_"
        }
    }
}

# Function to upgrade a package with retry logic
function Upgrade-PackageWithRetry {
    param (
        [string]$PackageName
    )
    $retryCount = 0
    $upgradeSuccess = $false

    while (-not $upgradeSuccess -and $retryCount -lt $config.MaxRetries) {
        Write-Log "Attempting to upgrade $PackageName (Attempt $($retryCount + 1) of $($config.MaxRetries))"
        $upgradeOutput = choco upgrade $PackageName --yes --force
        
        if ($LASTEXITCODE -eq 0) {
            $upgradeSuccess = $true
            Write-Log "Successfully upgraded $PackageName"
        }
        else {
            $retryCount++
            Write-Log "Failed to upgrade $PackageName. Error details:"
            $upgradeOutput | ForEach-Object { Write-Log $_ }
            
            if ($retryCount -lt $config.MaxRetries) {
                Write-Log "Retrying in $($config.RetryDelay) seconds..."
                Start-Sleep -Seconds $config.RetryDelay
            }
        }
    }

    if (-not $upgradeSuccess) {
        Write-Log "Failed to upgrade $PackageName after $($config.MaxRetries) attempts."
    }

    return $upgradeSuccess
}

# Main script execution
try {
    # Create log directory if it doesn't exist
    $logDir = Split-Path -Parent $config.LogFile
    if (-not (Test-Path -Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir | Out-Null
    }

    Write-Log "Starting Chocolatey package upgrade process"

    # Get all outdated packages
    Write-Log "Fetching outdated packages..."
    $allOutdatedPackages = choco outdated -r

    # Initialize arrays to store package information
    $packagesToUpgrade = @()
    $excludedPackages = @()

    # Process each outdated package
    foreach ($package in $allOutdatedPackages) {
        $packageInfo = $package -split '\|'
        $packageName = $packageInfo[0]
        $currentVersion = $packageInfo[1]
        $availableVersion = $packageInfo[2]
        
        if (-not (Should-Exclude $packageName)) {
            $packagesToUpgrade += [PSCustomObject]@{
                Name = $packageName
                CurrentVersion = $currentVersion
                AvailableVersion = $availableVersion
            }
            Write-Log "Added $packageName to upgrade list (Current: $currentVersion, Available: $availableVersion)"
        } else {
            $excludedPackages += $packageName
            Write-Log "Excluded $packageName from upgrade list"
        }
    }

    # Output the list of packages to upgrade
    Write-Log "`nPackages to upgrade:"
    $packagesToUpgrade | ForEach-Object { Write-Log "- $($_.Name) (Current: $($_.CurrentVersion), Available: $($_.AvailableVersion))" }

    Write-Log "`nExcluded packages:"
    $excludedPackages | ForEach-Object { Write-Log "- $_" }

    # Upgrade packages
    $successfulUpgrades = @()
    $failedUpgrades = @()

    foreach ($package in $packagesToUpgrade) {
        $upgradeResult = Upgrade-PackageWithRetry -PackageName $package.Name
        if ($upgradeResult) {
            $successfulUpgrades += $package.Name
        } else {
            $failedUpgrades += $package.Name
        }
    }

    # Generate summary
    $summary = @"
Chocolatey Package Upgrade Summary:
Total packages processed: $($packagesToUpgrade.Count + $excludedPackages.Count)
Packages upgraded successfully: $($successfulUpgrades.Count)
Packages failed to upgrade: $($failedUpgrades.Count)
Packages excluded: $($excludedPackages.Count)

Successful upgrades:
$($successfulUpgrades -join ", ")

Failed upgrades:
$($failedUpgrades -join ", ")

Excluded packages:
$($excludedPackages -join ", ")
"@

    Write-Log "`n$summary"

    # Send email notification
    Send-EmailNotification -Subject "Chocolatey Upgrade Process Completed" -Body $summary

    Write-Log "Upgrade process completed."
}
catch {
    $errorMessage = "An error occurred during the upgrade process: $_"
    Write-Log $errorMessage
    Send-EmailNotification -Subject "Error in Chocolatey Upgrade Process" -Body $errorMessage
}
finally {
    # Perform any cleanup if necessary
}
```
## Lessons learned

As a newbie developer, remember that diving straight into building features from scratch without consulting the documentation can be a bit like reinventing the wheel. **Documentation is often the treasure map that leads you to solutions and best practices already discovered by others.** Before you set off on creating something from the ground up, **take a moment to explore what’s already been established.** It can save you a lot of time and effort.

That said, **there’s value in the journey of discovery, even if it means spending a bit of extra time**. In my case, while I did lose some hours wrestling with the intricacies of `regex`, I ended up refining my skills and had a lot of fun in the process. The final product was something I felt genuinely proud of, especially given my pedestrial-level programming skills a few months ago. Sometimes, the process of figuring things out on your own, though it may seem inefficient, can lead to unexpected growth and satisfaction. So, embrace both the guidance of documentation and the joys of hands-on learning—it’s all part of the adventure.

Until later!

