---
title: "Introduction"
description: Introductory Module of CS 7641 - Machine Learning @ Georgia Tech.
pubDate: 2025-12-29
categories: [OMSCS, ML]
tags: [Machine Learning, Supervised Learning, Unsupervised Learning, Reinforcement Learning, Generalization]
math: true
---

### What is Machine Learning? 

#### Definition

**Machine Learning (ML)** is the process of building intelligent artifacts which *learn* to improve their performance at some task with experience. 

> A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E. 
> - Tom Mitchell, Machine Learning (1997)

ML uses *statistical modeling* to mathematically represent the task at hand. One of the most fundamental problems in ML is model *generalizability*, which refers to the gap in model performance on training data versus unseen instances (test data).

#### Subdivisions

ML is divided into three primary subfields: 

- *Supervised Learning*: function approximation. Learning involves identifying a mapping between inputs $X$ and output(s) $y$. 
	- SL is about induction - creating a general rule from a set of specific instances.  

    $$f: X\rightarrow y$$  

- *Unsupervised Learning*: data description. Learning involves extracting characteristics from input data $X$ to gain information relative to some general task (e.g., clustering, dimensionality reduction).  

    $$f : X$$  

- *Reinforcement Learning*: reward maximization in the context of an agent-environment dynamic. Learning involves identifying a policy, which maps environmental states to agent decisions.  

    $$f : s \rightarrow a$$  

Despite these differences, certain high-level concepts are shared across fields. Each field uses optimization as a means for learning - we define some *objective function* to evaluate model performance, then improve our model by optimizing the objective function. Furthermore, all ML problems are fully reliant on *data*. Since models are trained on data, their performance is highly dependent on data quantity and quality! 
