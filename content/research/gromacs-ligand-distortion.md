---
layout: posts
permalink: /research/gromacs-ligand-distortion/
title: "Ligand parameterization in GROMACS"
excerpt: "Parameterization of a ligand is a crucial step in molecular dynamics simulations. The detailed tutorial for this process is provided by Dr JA Lemkul on his website. The tutorial is very detailed and provides a step-by-step guide to parameterize a ligand."
author_profile: true
date: 2023-11-06T00:00:00+05:30
comments: true
classes: wide
read_time: true
share: true
related: false
categories:
  - gromacs
  - molecular dynamics

tags:
  - gromacs
  - molecular dynamics
keywords:
  - gromacs
  - molecular dynamics
  - ligand
  - parameterization
  - cgenff
  - charmm
---

# //TLDR

**Problem**: On one of my recent projects, the ligand appeared intact during sorting stage but distorted after converting the stream file. 

**Cause**: This is caused by long ligand names, whihc distorts how the charmm2gmx script parses the stream file.

**Solution**: Maintain ligand/residue name character count to 4 or below. 



# Detailed explanation

Parameterization of a ligand is a crucial step in molecular dynamics simulations.The detailed tutorial for this process is provided by [Dr JA Lemkul on his website](http://www.mdtutorials.com/gmx/complex/02_topology.html). The tutorial is very detailed and provides a step-by-step guide to parameterize a ligand. 

The steps involve

1. Conversion of the ligand file from `.pdb` to `.mol2` format. I generally use Open Babel for this purpose.

2. In the second step, change the ligand name in the `.mol2` file to a uniform notation. The first change that needs to be made is in the `MOLECULE` heading and also the residue names and numbers such that they are all the same. This is well illustrated in the tutorial. 

3. Sort the bonds using the `sort_mol2_bonds.pl` script. 

4. Upload the sorted `.mol2` file to CGenFF server and download the CHARMM "stream" file (`.str`) file containing all of the topology information.

5. Finally, generate topology using `cgenff_charmm2gmx.py` script. 



On one of my recent projects, the ligand appeared intact in Step 3 but the output of Step 5 was distorted and mangled (Figure 1). I first thought that there was some problem with the server which mangled the output. I tried implementing other options, including one option here [molecular dynamics - Alternative to CGenFF for generating large ligand topology - Matter Modeling Stack Exchange](https://mattermodeling.stackexchange.com/questions/8310/alternative-to-cgenff-for-generating-large-ligand-topology) whihc was largely unsuccesful. 

![Figure 1](/images/gromacs-distorted-molecule.png)

However, upon close examination of `cgenff_charmm2gmx.py`, I found that my ligand name was 5 characters long, which broke the PDB format, specifically how the python scrip parses the stream file. Upon truncating this name to 3 characters, the problem was fixed. 

A more detailed discussion on this topic is available here:
1. Gromacs Forums - https://gromacs.bioexcel.eu/t/problem-in-file-broken-structure-ini-pdb-generated-using-cgenff-for-proceeding-in-md-simulation/2926/6 
2. Matter Modeling Stack Exchange - https://mattermodeling.stackexchange.com/questions/8310/alternative-to-cgenff-for-generating-large-ligand-topology/8311#8311

Hope this helps! Do let me know if you have any questions.
