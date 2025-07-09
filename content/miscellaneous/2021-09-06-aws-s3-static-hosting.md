---
title: "Setting Up a Static Image Host on AWS"
summary:
date: 2023-09-05T00:00:00+05:30
aliases: ["/s3-static/"]
tags: ["AWS", "S3", "Hugo"]
author: "Deepak Shilkar"
draft: false
weight: 4
comments: true
keywords: ["AWS S3", "cloud storage", "image hosting", "cost effective", "scalability", "durability", "Amazon cloud", "digital hosting", "file storage", "reliable storage"]

---
<<<<<<< HEAD

I manage my Hugo site (versioning and deployment) via GitHub. One key issue with this setup is that images eventually make the repository heavier, making push and pull slower and unnecessarily gobbling GitHub's resources for purposes that it is not meant for. A common option to manage this issue is to use image hosting and resizing services like Cloudimage and Cloudkit. A key issue I have with these services is the inability to maintain a persistent backup elsewhere. Plus, this can get quickly expensive if you overshoot your Free Tier storage quota. 
=======
Hugo is one of the simplest ways to write and manage a blog. Yet, I totally get the frustration a lot of people express with managing images in the GitHub repository. It's like trying to fit an elephant into a Mini Cooper. I tried to address this issue using AWS S3, which I have documented below.
>>>>>>> 618a67c843821713fcdfed60cba8a1f3bf62d6ef

## Why AWS S3?

1. It's reliable (it's Amazon, after all)
2. You can scale up or down as needed
3. It's pretty cost-effective for most bloggers
4. You maintain control over your data (bye-bye, third-party image hosting services!)

### Step 1: Setting Up Your AWS Account

First things first, head over to [AWS](https://aws.amazon.com/) and create an account. It's like signing up for any other service, except you might need to enter your credit card info.

### Step 2: Grab Those Security Credentials

Once you're in, we need to get you some security credentials. Here's what you do:

1. Find the IAM service (it stands for Identity and Access Management, but who's got time for that?)
2. Create a new user (let's call it "imagehost" - creative, I know)
3. Give it "Programmatic access" (fancy talk for "can use APIs")
4. Attach the "AmazonS3FullAccess" policy (we're going all in, baby!)
5. Save those credentials like they're the nuclear launch codes

### Step 3: Getting Cozy with AWS CLI

Install the AWS CLI on your machine and run `aws configure`. It'll ask for those credentials you just saved. Don't forget to pick a region - "us-east-1" is a popular choice.

### Step 4: Creating Your S3 Bucket

Now for the fun part! We're going to create your very own S3 bucket. Run this command:

```sh
aws s3api create-bucket --bucket your-awesome-image-bucket --region us-east-1
```

Replace "your-awesome-image-bucket" with something cool. Maybe "hugo-image-paradise"? 😎

### Step 5: Making Your Bucket Public

Make that bucket public:

1. Find your bucket in the S3 service console
2. Click on "Permissions" and then "Bucket Policy"
3. Paste in the policy I provided earlier (don't forget to change the bucket name!)

### Step 6: Uploading Images Like a Boss

Ready to upload? It's as easy as pie from your console:

```sh
aws s3 cp your-awesome-image.jpg s3://your-awesome-image-bucket/
```

And voila! Your image is now living it up in the cloud.

When you upload an image to S3 using the AWS CLI, it doesn't directly output the URL. However, we can easily construct the URL based on the S3 bucket name and the image filename. Here's how you can do it:

1. After uploading your image using the AWS CLI command:

```sh
aws s3 cp your-awesome-image.jpg s3://your-awesome-image-bucket/
```

2. The URL structure for your uploaded image will typically be:

```
https://your-awesome-image-bucket.s3.amazonaws.com/your-awesome-image.jpg
```

So, to use this in your Hugo site, you'd reference it like this in your Markdown:

```markdown
![Alt text](https://your-awesome-image-bucket.s3.amazonaws.com/your-awesome-image.jpg)
```

To make this process even easier, you could create a simple bash script that uploads the image and then outputs the URL. Here's an example:

```bash
#!/bin/bash

# Check if an image file is provided
if [ $# -eq 0 ]; then
    echo "Please provide an image file as an argument."
    exit 1
fi

# Set your bucket name
BUCKET_NAME="your-awesome-image-bucket"

# Get the filename from the provided path
FILENAME=$(basename "$1")

# Upload the file to S3
aws s3 cp "$1" "s3://$BUCKET_NAME/"

# Construct and output the URL
echo "Image uploaded successfully."
echo "URL: https://$BUCKET_NAME.s3.amazonaws.com/$FILENAME"
```

Save this script (let's call it `upload_to_s3.sh`), make it executable with `chmod +x upload_to_s3.sh`, and then you can use it like this:

```sh
./upload_to_s3.sh path/to/your-awesome-image.jpg
```

This script will upload your image and then output the full URL, which you can copy and paste into your Hugo Markdown files.

## Wrapping Up

There you have it! No more bloated GitHub repos, no more relying on sketchy third-party services.

Keep an eye on your AWS usage to avoid any surprise bills. But for most bloggers, this setup should be both affordable and efficient.

Until later!
