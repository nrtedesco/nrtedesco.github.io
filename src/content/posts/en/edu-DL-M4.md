---
title: "DL M4: Data Wrangling (Meta)"
description: Module 4 of CS 7643 - Deep Learning @ Georgia Tech.
pubDate: 2025-11-05
categories: [OMSCS, DL]
tags: [Deep Learning, Machine Learning, Data Preprocessing, Imputation, Normalization, Bias, Meta]
math: true
---

### Preparing Data for Models

**Data Preprocessing** refers to the general process of preparing data for use in machine learning models. It may involve one of many different steps, including: 

  1. Data Cleaning
  2. Data Transformation
   
#### Data Cleaning

**Data Cleaning** involves removing errors and inconsistencies from the data. *Missing value imputation* is one type of method applied during the data cleaning phase. Missing values may be one of the following types: 

   1. Missing Completely at Random: likelihood of any missing data observation is completely random. 
   2. Missing at Random: likelihood of any missing data observation is dependent on the observed data features. 
   3. Missing Not at Random: likelihood of any missing data observation depends on an unobserved outcome. 

Imputation technique depends on the type of the missing data. Numerical imputation involves computing some summary statistic (e.g., mean, mode, zero, const) used to fill missing values. Categorical imputation is usually accomplished by filling with the mode, or performing KNN / clustering with deep learning embeddings. 

#### Data Transformation

**Data Transformation** refers to the process of converting data from one format / structure into another. This is typically done to adhere to machine learning model input standards, or to ensure the data is in a desirable format / scale for statistical use. 

*One-hot encoding* is a type of data transformation applied to categorical features in order to represent them in a numerical fashion. Other techniques such as TF-IDF and embedding have similar intent, but different outcomes.  

$$[\text{"cat"}, \text{"dog"}] \rightarrow [[0, 1], [1, 0]]$$  

Other transformation methods include *scaling* and *normalization*. Scaling is used to adjust a feature's range (ex: $[0, 100]$ to $[0, 1]$), whereas normalization is a more radical change which converts the distribution of data to a more "normal" (bell-shaped) form. 

### Managing Bias

**Fairness in ML** refers to a specific paradigm in which machine learning models are examined and tweaked to ensure limited dependence on societally-sensitive features. A few example applications of fairness in ML include... 

- *Anti-Classification*: sensitive features such as race, gender, and their proxies are avoided. 
- *Classification Parity*: measures of predictive performance should be equal across sensitive strata (ex: race / gender). In other words, an ML system should not perform worse for one group compared to another. 
- *Calibration*: conditional on risk estimates, outcomes are independent of sensitive attributes. 
