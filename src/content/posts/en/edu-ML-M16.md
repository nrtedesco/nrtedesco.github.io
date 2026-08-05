---
title: "Information Theory"
description: Module 16 of CS 7641 - Machine Learning @ Georgia Tech. Lesson 5 of Unsupervised Learning Series.
pubDate: 2026-01-19
categories: [OMSCS, ML]
tags: [Machine Learning, Unsupervised Learning, Information Theory, Entropy, Mutual Information, KL Divergence]
math: true
---

### What is Info Theory? 
#### Definition

**Information Theory** refers to a mathematical framework outlining the quantification, storage, and communication of information in the context of computing systems. This field is particularly relevant to *machine learning* due to the notion of information. We are often interested in defining the most "informative" features as part of learning algorithms - information theory enables us to assign numerical value to information, and thus rank features in terms of information. 

#### History 

*Claude Shannon* is considered the father of information theory and the information age. He founded the field of information theory in the late 1940s while working on long-distance message charging algorithms at Bell Labs (AT&T). 

### Info Theory Concepts 
#### Examples

Consider the following example application of information theory. We are interested in sending a simple message consisting of the output of $10$ coin flips from Atlanta to San Francisco. Which message has more information? 

- Message 1 (Fair Coin): `HTHHTHTTHT` $\rightarrow$ requires ten bits of information for transmission (head vs. tail indicator for each position). 
- Message 2 (Biased Coin): `HHHHHHHHHH` $\rightarrow$ requires no bits of information for transmission (will always be all heads!). 

As another example, consider two separate vocabularies which have the following probabilities associated with letter usage. We can define encoding schemes to represent each letter depending on their probabilities.   

$$\text{VOCAB 1}: ~~~\Pr(\text{letter}=\text{?}) = \begin{cases} A & 25\% & 00\\ B & 25\% & 01\\ C & 25\% & 10 \\ D & 25\% & 11\end{cases}$$  

$$\text{VOCAB 2}: ~~~\Pr(\text{letter}=\text{?}) = \begin{cases} A & 50\% & 0\\ B & 12.5\% & 110\\ C & 12.5\% & 111\\ D & 25\% & 10\end{cases}$$  

The expected size of sending a single-letter message in Vocabulary 1 is $2$. For Vocabulary 2, our expected size is $1.75$. Therefore, we are able to take advantage of the structure of Vocabulary 2 to reduce message size! This general notion is known as *variable length encoding*. 

#### Entropy 

We can make a generalization regarding information theory from these examples. 

> More randomness corresponds to more information. Conversely, more predictability corresponds to less information.    



More formally, we define the concept of **Entropy** as the *expected number of bits* required to represent some event.    

$$H(S) = \sum_i \Pr(S=s_i) \times L_\text{bits}(s_i) = - \sum_i \Pr(S=s_i) \times \log_2 \Pr(S=s_i)$$  

Entropy is used to quantify the level of information present in a single *random variable* $S$. What if we have multiple random variables? *Joint entropy* $H(X, Y)$ and *conditional entropy* $H(Y \| X)$ are relevant in this setting.      


$$H(X, Y) = -\sum_{i, j} \Pr(X=x_i, Y=y_j) \times \log_2 \Pr(X=x_i, Y=y_j)$$  

$$H(Y | X) = - \sum_{i, j} \Pr(X=x_i, Y=y_j) \times \log_2\Pr(Y=y_j | X=x_i)$$  

If the two variables $X$ and $Y$ are independent, the joint entropy is simply the sum of individual entropies. Additionally, conditional entropy is equivalent to the individual entropy of the variable of interest.   

$$\text{If} ~~ X \perp  Y ~~\rightarrow ~~ H(X, Y) = H(X) + H(Y) ~~~~H(Y|X) = H(Y)$$  


#### Mutual Information 

How can we quantify the relationship between two variables? **Mutual Information** defines the *level of dependence* between two random variables.   

$$I(X, Y) = H(Y) - H(Y | X) = I(Y, X)$$  

We have this formula, but it might be a bit difficult to conceptually understand how this represents degree of relation. Consider the following example, where two events $E_1$ and $E_2$ represent the results of 1) independent or 2) dependent coin flips.   

$$I(E_1, E_2) = H(E_1) - H(E_1 | E_2)$$  

$$\text{Independent}: ~~~ I(E_1, E_2) = H(E_1) - H(E_1)= 0$$  

$$\text{Dependent}: ~~~ I(E_1, E_2) = H(E_1) - H(E_1 | E_2) = 1$$  


#### KL Divergence 

**Kullback-Liebler (KL) Divergence** is a distance measure between two probability distributions. It is always non-negative, and distance is zero when the two distributions are equivalent. Note we use the terminology *divergence* instead of *distance* since KL Divergence fails the symmetry property required to be considered a distance metric.   

$$D(p ~ || ~ q) = \sum_i p(x_i) \times \log \frac{p(x_i)}{q(x_i)} \neq D(q ~ || ~ p)$$  

KL Divergence is particularly relevant in machine learning, since we are often interested in modeling a ground-truth distribution $p(x)$ with our predicted distribution $q(x)$. 

---
(all content obtained from Georgia Tech ML course materials) 
