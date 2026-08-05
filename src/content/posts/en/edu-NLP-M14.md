---
title: "Responsible AI"
description: Module 14 of CS 7650 - Natural Language Processing @ Georgia Tech.
pubDate: 2025-11-21
categories: [OMSCS, NLP]
tags: [Natural Language Processing, Responsible AI, Private AI, Hallucination, Misinformation, Cognitive Harm, Prejudicial Bias]
math: true
---

### Introduction 

As machine learning algorithms become more powerful + capable, there is increasing concern for the potential societal implications of widespread adoption and novel application. **Responsible AI** refers to a set of ethical guidelines for the implementation of AI-based systems.

### Harm: An Example 

Let's start with an extreme example. Content warning - this material will discuss suicide. 

> Can a chatbot harm someone? 

In March 2023, a Belgian man experiencing severe depression began seeking advice from a chatbot based on a large language model (LLM). Since the chatbot was trained to be agreeable, it reinforced his thoughts of suicidal ideation and added to his feelings of isolation. Eventually, the man took his own life. 

Language models can cause cognitive harm in a number of ways: 

- Reinforcing negative thoughts that lead to self-harm / harm of others. 
- Providing support for harmful behaviors such as suicidal ideation, eating disorders, etc. 
- Encouraging someone to act against someone else. 

The agreeableness of LLMs - "going along with what people say" - is particularly problematic in these contexts. 

### Factual Errors and Misinformation 

Machine learning systems such as LLMs are often regarded as a "source of truth" for subject material. However, these systems are quite prone to getting things wrong. Furthermore, errors can be difficult to spot if the user isn't an expert in the field. 

LLMs work by generating "most probable" tokens - this means there isn't any constraint requiring produced information to be factual, so long as it is probable according to the model. **Model Hallucination** refers to the scenario where an AI model produces incorrect / nonsensical information, but presents it as fact. Factual errors may result from 1) the probability distribution over tokens overriding the correct answer, or 2) sampling from the distribution resulting in deviations from fact. 

We've discussed factual errors in terms of accidents, but they may also result from intentional misinformation. If we train an LLM on bad data, we will get back results. Adversarial entities may therefore find methods for injecting bad data into the training corpus. LLMs can also be prompted to generate information, which may then be distributed as fact in order to impersonate / defame / etc. 

### Prejudicial Bias and Privacy

**Prejudicial Bias** is any implication that one class of person or community is inferior to another based on superficial differences such as skin color, gender, sexual identity, nationality, political stance, etc. Note that prejudicial bias is very different from statistical bias. 

Since language models are trained on real-world data, real-world text involving prejudicial bias is readily acquired + learned + perpetuated by these models. 

![prejudicial-bias](/img/posts/edu-NLP/pasted-image-20251121012827.png)

As discussed in the previous module, **Privacy** is also a problem in language modeling. Sensitive information can be memorized by LLMs, and thus reproduced in generated text. 

---

(all images obtained from Georgia Tech NLP course materials)
