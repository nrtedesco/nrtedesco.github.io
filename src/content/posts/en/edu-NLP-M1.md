---
title: "Introduction to Natural Language Processing"
description: Module 1 of CS 7650 - Natural Language Processing @ Georgia Tech.
pubDate: 2025-10-22
categories: [OMSCS, NLP]
tags: [Natural Language Processing, Machine Learning, Statistics]
math: true
---

## M1: Intro to NLP
---

### What is Natural Language Processing? 

**Natural Language Processing (NLP)** refers to a set of computational methods, techniques, or algorithms for making human language accessible to computers. This often implies *analysis of text* or *generation of fluent, meaningful, and context appropriate text*. 

#### Natural Language

Okay, so what even is natural language? **Natural language** refers to the structured set of communication that has naturally evolved in humans through use and repetition. Separate systems (languages) have emerged, each with their own set of rules that might not be strictly defined or enforced. 

- *Syntax*: rules for composing words together. 
- *Semantics*: the meaning of the composition of words. 

#### Non-Natural Language

Conversely, a **non-natural language** is a deliberately planned and defined language. These include programming languages (Python, C++, etc.). Non-natural languages have well-defined rules of composition, and syntax structured to eliminate any kind of ambiguity. 

### What are the Goals of NLP? 

NLP can be utilized to *better facilitate human-computer interaction*. If the computer is able to understand and process natural language, it allows the human to avoid learning the computer's non-natural language. Example applications include conversational agents and writing assistance. 

Additionally, NLP can help to *process large volumes of data*. The vast majority of recorded data is stored in natural language. NLP can help with applications such as detecting patterns in text from social media, knowledge discovery from academic research, and document retrieval. 

### Why is NLP Difficult? 

What makes natural language processing so difficult for computers? There are many, many reasons: 

- Words can have multiple meanings, often depending on the domain or context. 
- Furthermore, words can be composed in different ways to have different meanings.
- Metaphors are not literal. 
- New words emerge, especially via slang / popular vocabulary. 

One key idea is that natural language has ample *syntactic ambiguity* - the same set of words can have different meanings depending on the context. Certain phrases may have intended connotations and interpretations that are more preferred over others. 

### What Fields are Involved in NLP?

First, much of NLP is based in *linguistics* and *speech*. These fields provide us with important context on language construction and patterns, which are certainly useful when building language-based models. 

NLP falls within the realm of **Artificial Intelligence (AI)**, which is a field concerned with building and understanding "machines that can compute how to act effectively and safely in a wide variety of novel situations" (Russell & Norvig, 2020). A significant portion of AI is **Machine Learning (ML)** - "the study of computer algorithms that improve automatically through experience" (Mitchell, 1997). Many NLP approaches use *Deep Learning* techniques, where deep learning refers to a class of machine learning algorithms built on deep chains of differentiable modules (e.g., neural networks). 

Finally, NLP is heavily reliant on **Statistics**. Consider an NLP classification problem - what is the probability that a movie review is positive?  

$$\Pr(\text{Review} = + ~ | ~ w_1, \ldots,  w_n)$$ 

Similarly, text generation involves probability. What is the probability that the next word should come next, given the words we have already observed?  

$$\Pr(w_n|w_1, w_2, ..., w_{n-1})$$
