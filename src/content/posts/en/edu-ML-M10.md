---
title: "Bayesian Learning"
description: Module 10 of CS 7641 - Machine Learning @ Georgia Tech. Lesson 9 of Supervised Learning Series.
pubDate: 2026-01-06
categories: [OMSCS, ML]
tags: [Machine Learning, Supervised Learning, Bayes Theorem, Bayesian Learning, MAP, MLE]
math: true
---

### What is Bayesian Learning? 

#### Objectives 

The primary goal of **Bayesian Learning** is to learn the best hypothesis given *data* and some *domain knowledge*. Bayesian learning is therefore a statistical learning method for combining current evidence (data) with prior beliefs (domain knowledge). 

#### Bayes Theorem + Application

Recall that **Bayes Theorem** is a method for inverting conditional probabilities.  

$$\Pr(a | b) = \frac{\Pr(b | a) \times \Pr(a)}{\Pr(b)}$$  

Bayesian learning applies Bayes Theorem in the context of supervised learning. We are interested in finding the most probable hypothesis $h$ given our observed data $D$.  

$$\Pr(h | D) = \frac{\Pr(D | h) \times \Pr(h)}{\Pr(D)}$$   

$$\arg \max_{h \in H} \Pr(h | D)$$  

Okay, so what do each of these terms actually represent? 

- $\Pr(D)$: prior belief on the data; normalization constant for yielding a valid probability distribution. Often ignored in practice, since it does not impact the results of an $\arg \max$. 
- $\Pr(D \| h)$: probability of observing data the specific data $D$ given that $h$ is the true underlying model. 
- $\Pr(h)$: prior belief on the hypothesis. Encapsulates our prior belief that one hypothesis is better or worse than another. This translates to domain knowledge!  
  

Therefore, one simple approach to Bayesian Learning is to calculate $\Pr(h\|D)$ for each candidate hypothesis $h$, then select the hypothesis which maximizes this probability. Although this framework is conceptually valid, it is computationally infeasible given the infinite hypothesis space of most supervised learning algorithms!  

$$\text{Calculate}: ~~~ \Pr(h|D) \propto \Pr(D | h) \times \Pr(h) \tag{1}$$  

$$\arg \max_{h \in H} \Pr(h|D) \tag{2} $$  

Bayesian learning algorithms compute the *maximum a-posteriori (MAP)* hypothesis, which is simply a function of data likelihood and prior belief. This is in contrast to other approaches reliant on likelihood alone, which compute the *maximum likelihood* hypothesis.  

$$h_{MAP} = \arg \max_{h} \Pr(h | D)$$  

$$h_{MLE} = \arg \max_h \Pr(D | h)$$  

### Practice 

#### Quiz on Bayes Theorem 

> A man goes to see a doctor. She gives him a lab test. The test returns a correct positive 98% of the time, and a correct negative 97% of the time. The test looks for spleentitis - a rare disease which only occurs in 0.8% of the general population. 

$$\text{GIVEN}: ~~~ \Pr(R+|D+) = 0.98 ~~~ \Pr(R-|D-) = 0.97 ~~~ \Pr(D+)=0.008$$  

$$\Pr(D+|R+) = \frac{\Pr(R+|D+) \times \Pr(D+)}{\Pr(R+)}\tag{1}$$  

$$\Pr(R+) = \Pr(R+|D+) \times \Pr(D+) + \Pr(R+|D-) \times \Pr(D-)  \tag{2}$$  
 
$$\Pr(R+) = 0.98 \times 0.008 + 0.03 \times 0.992 = 0.0376$$   

$$\Pr(D+|R+) = \frac{0.98 \times 0.008}{0.0376} = 0.2085 \tag{3}$$  

#### Derivation of MSE

Consider the case where we have a set of training instances generated via some noisy process, where noise is assumed to follow a normal distribution with some variance $\sigma^2$.   

$$\text{GIVEN}: ~~~ \begin{Bmatrix} <x_i, d_i> \end{Bmatrix} d_i = f(x_i) + \epsilon_i ~~~~ \epsilon_i \sim N(0, \sigma^2) ~~~~ i.i.d.$$  

What is the maximum likelihood hypothesis?   

$$h_{MLE} = \arg \max_h \Pr(D | h) \tag{1}$$  

$$h_{MLE} = \arg \max_h \prod_i \Pr(d_i | h) \tag{2}$$  

$$h_{MLE} = \arg \max_h \prod_i \frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{1}{2} \frac{(d_i - h(x_i))^2}{\sigma^2}} \tag{3} $$  

$$h_{MLE} = \arg \max_h \sum_i -\frac{1}{2} \frac{(d_i - h(x_i))^2}{\sigma^2}\tag{4}$$  

$$h_{MLE} = \arg \max_h - \sum_i (d_i - h(x_i))^2 \tag{5}$$   

$$h_{MLE} = \arg \min_h \sum_i(d_i - h(x_i))^2 \tag{6}$$  

This final term is the residual sum of squares! Therefore, minimizing the sum of squared error is supported by Bayesian learning. 
