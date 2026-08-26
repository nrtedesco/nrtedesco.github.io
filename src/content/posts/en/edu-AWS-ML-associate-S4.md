---
title: "Managed AI Services"
description: Section 4 of AWS Certified ML Engineer course from Udemy. 
pubDate: 2026-08-26
categories: [AWS]
tags: [Machine Learning, AI, NLP, Computer Vision, Cloud, AWS]
---

## Introduction

AWS offers many streamlined + managed services to assist with the machine learning (ML) project lifecycle, including... 

1) Tools built around pre-trained ML models (ex: image recognition, chatbots). 
2) Services to facilitate preprocessing for ML projects (ex: text and document parsing). 
3) A centralized platform for model development + deployment on AWS (SageMaker AI). 

This section reviews the various AI services offered through AWS. 

## NLP Services 

**Natural Language Processing (NLP)** is a subfield of machine learning concerned with understanding and utilizing human language. Common NLP problems include text generation, semantic encoding, and machine translation. 

#### Amazon Comprehend

**Comprehend** is a fully-managed, serverless AWS service for NLP. It offers many use cases for text-based problems: 

- Language Identification: define the language of the text. 
- Text Extraction: gather key phrases or topics from the text. 
- Sentiment Analysis: understand the attitude (positive vs. negative) of the text. 
- Tokenization and POS Tagging: break text down into tokens (used for ML model input) and tag based on part-of-speech. 
- Topic Classification: organize collection of text files by topic. 

One of the primary services offered by Comprehend is *Named Entity Recognition (NER)*, which extracts predefined entities (e.g., people, places, organizations, etc.) from text. We can further customize text extraction using *Custom Entity Extraction* by training a model to recognize a custom entity of interest (e.g., policy number). 

![AWS SageMaker](/img/posts/edu-AWS/AWS-comprehend.png)


#### Other NLP Tools

**Translate** is used to translate large volumes of text. It has the ability to integrate with user applications, and may operate in batch or real-time fashion. 

**Transcribe** converts audio files (representing speech) into text using *Automated Speech Recognition* built on deep learning models. The user can provide *custom vocabularies* to improve Transcribe's accuracy; this is especially useful when dealing with brand names and acronyms. Additionally, users may train custom Transcribe models using their own domain-specific data. Finally, Transcribe also provides ML-powered toxicity detection to determine whether input audio files correspond to discriminatory or hateful content. 

Whereas Transcribe converts speech to text, Amazon **Polly** generates speech from text. Advanced features of Polly include: 

- *Lexicons*: define how to read certain specific pieces of text. 
	- Ex: AWS = "Amazon Web Services"
- *Speech Synthesis Markup Language*: indicates certain actions to take while reading text. 
	- Ex: <\p> = add a pause between paragraphs

**Lex** enables users to quickly build a *chatbot* for their particular application. Lex integrates with various other AWS services (Lambda, Connect, Comprehend, Kendra) to take the appropriate action based on user intent. For example, Lex may automatically invoke a Lambda function given the information obtained from user prompts. 

**Kendra**  is a fully-managed *document search service* used to extract answers from within a document. Search results may be fine-tuned based on data importance and custom user specifications. 

## Computer Vision Services

**Computer Vision** is a subfield of machine learning dedicated to images. Typical computer vision problems include image classification and object detection.

#### Amazon Rekognition

**Rekognition** is an object detection tool for finding and labeling various types of content present in images or videos, including objects, text, faces, and scenes. Rekognition allows users to provide *custom training data* (including labeled images) to fine-tune their image recognition model to your particular use case. This is particularly helpful for identifying custom products or logos within pictures. 

![AWS SageMaker](/img/posts/edu-AWS/AWS-rekognition.png)

Rekognition is also used for *content moderation* to automatically detect inappropriate, unwanted, or offensive content. This feature can be integrated with Amazon Augmented AI (Amazon A2I) to include a human review component. 

#### Amazon Textract

**Textract** is used to automatically extract text / data from any scanned document. 

![AWS SageMaker](/img/posts/edu-AWS/AWS-textract.png)

Textract can be used to read and process any type of document, including PDF and image files. 


## Other ML Services 

#### Amazon Personalize

**Personalize** is a fully-managed ML-service used to build apps with real-time personalized recommendations. This is the same technology used on Amazon.com for recommending products. 

![AWS SageMaker](/img/posts/edu-AWS/AWS-personalize.png)

Personalize provides *recipes* as template algorithms prepared for specific use cases. The user may provide additional training configuration on top of the recipe for customization. 

#### Amazon Augmented AI (A2I) 

**Augmented AI (A2I)** provides human oversight of machine learning predictions in production. Users can leverage A2I as part of production ML workflows to redirect low-confidence predictions for human review. 

![AWS SageMaker](/img/posts/edu-AWS/AWS-augmented-AI.png)

Human reviewers may be a company's employees, or sourced from the AWS contractor pool. 

#### Hardware for AI: Amazon EC2

**Elastic Compute Cloud (EC2)** is one of AWS' most popular offerings, providing *Infrastructure as a Service (IaaS)* via provisioned servers = compute. EC2 is directly tied to the following AWS components / services: 

- *Elastic Block Store (EBS)*: virtual hard drive which attaches to cloud EC2 servers. 
- *Elastic Load Balancing (ELB)*: automatically distributes incoming application / network traffic across multiple targets, such as EC2 instances. 
- *Auto-Scaling Group (ASG)*: collection of EC2 instances treated as a logical grouping for the purposes of automatic scaling and management. 

EC2 has many configuration options, including... 

- Operating System (OS): Linux, Windows, or Mac OS. 
- Compute Power + Cores (CPU). 
- Random-Access Memory (RAM). 
- Storage Space via EBS / EFS. 

Put briefly, EC2 provisions highly-configurable virtual servers in the cloud. In terms of AI, AWS offers *GPU-based EC2 instances* well-suited for ML model training and inference. Other hardware includes...

- *AWS Trainium* `Trn1`: servers with ML processors built to efficiently train massive deep learning models (100B+ parameters). 
- *AWS Inferentia* `Inf1`: servers with ML processors built to efficiently perform ML inference at high performance and low cost. 

Trainium and Inferentia EC2 instances have the lowest environmental footprint for ML workloads of any service offered on AWS. 

#### Amazon Q Business

**Q Business** is a fully-managed generative AI assistant for companies, based entirely on the company's knowledge base and internal data. It is used to answer questions, provide summaries, generate content, and perform regular tasks in the context of a certain business. Q Business is built on *Amazon Bedrock*, but the user does not have the ability to select or customize the foundation model being utilized. Q Business can be connected to *data sources* (ex: S3, RDS, Aurora, etc.) via RAG pipelines, as well as *plugins* for third-party services and applications. 

---
(all information obtained from AWS Certified Machine Learning Engineer Associate: Hands On! course on Udemy)