---
title: "Machine Learning Operations with AWS"
description: Section 9 of AWS Certified ML Engineer course from Udemy. 
pubDate: 2026-09-18
categories: [AWS]
tags: [ML, AWS, MLOps]
---


## Introduction 

Practical applications of machine learning require knowledge of **Machine Learning Operations (MLOps)** - the set of practices supporting model development, testing, integration, release, and infrastructure management. This section reviews the basic principles of MLOps and their relation to various AWS services. 

## Deployment 

**Model Deployment** is the process of integrating a trained ML model into a production environment, making it available for inference via other applications or systems. 

#### Optimizing Deployments 

SageMaker AI offers both *single and multi-model endpoints* for inference. Each endpoint has its own deployment guardrails and may be configured with its own VPC. Endpoints support *load balancing* through the use of application auto-scaling. Foundation model deployment can be optimized via asynchronous inference (if latency isn't important) and model compression techniques: 

- *Quantization*: reduces memory and computational costs of model by converting model weights from high precision to low precision data types (ex: `float32` $\rightarrow$ `int8`). 
- Pruning: removes weights / connections / neurons from a trained neural network. 
- Knowledge Distillation: trains a smaller specialized model using the output of a larger model. 

Monitor token counts for LLM deployments - this tends to be the most important driver of cost. If real-time inference is not required, consider batching to improve resource utilization. Note that *tensor parallelism* shards LLM weights across GPUs, and can thereby yield better memory utilization per container. CloudWatch is very useful for monitoring efficiency and utilization. 

#### Safeguards

AWS *deployment guardrails* control shifting traffic to new models via "blue/green deployments", where the blue : old model and green : new model. 

- All-at-once: shift everything and terminate blue fleet. 
- Canary: shift a small portion of traffic from blue to green. 
- Linear: shift traffic from blue to green in linearly-spaced steps. 

Auto-rollbacks revert changes to the original (blue) fleet upon some trigger condition. Shadow tests compare the performance of a shadow variant with a production variant. 

#### Docker 

**Docker** is a software application for creating *containers* - lightweight isolated environments which serve as an alternative to virtualization, but share the same host OS kernel. 

- Docker *containers* are running instances of Docker *images*. 
- Docker *images* are constructed from a *Dockerfile*: text file containing collection of ordered instructions.  
- Docker *images* are stored in a *repository*; in SageMaker / AWS, ECR is the Docker registry. 

SageMaker models are hosted in Docker containers built from images registered with Amazon *Elastic Container Registry (ECR)*. ECR offers pre-built images for many common machine learning model types, including PyTorch and scikit-learn. AWS has multiple services for creating and running containers from images: 

- *Elastic Container Service (ECS)*: fully-managed container orchestration service for deploying containerized applications using EC2 instances or Fargate. 
- *Elastic Kubernetes Service (EKS)*: alternative platform with the same goal as ECS, but operating through the Kubernetes API. 
- *AWS Batch*: runs Docker images as batch jobs using spot EC2 instances or Fargate. 

![Docker](/img/posts/edu-AWS/docker.png)

SageMaker permits separate images for training and inference. Training and inference containers have predefined file tree structures. Models are commonly served via `flask` (Python API framework) and `nginx` (high-performance HTTP web server). 

#### Instance Types 

How should we select an instance type for model training / inference? Training deep learning models may benefit from the use of a GPU (`P3`, `g4dn`). More lightweight instances (`C5`) are suitable for inference since it tends to be less computationally intensive. 

- Training Instances: require large compute, high GPU / accelerator memory, and fast interconnects for distributed workloads. 
	- `P3` / `P4` / `P5` / `P6`: high-power GPU instances used for training deep learning models. 
	- `Trn1` / `Trn2`: cost-efficient training instances with a custom AWS chip. 
	- `G4` / `G5` / `G6`: less powerful GPU instances used for prototyping and fine-tuning. 
- Inference Instances: require low latency and high throughput. 
	- `C5` / `C6` / `C7`: CPU-only instances suitable for traditional ML (non-tensor math). 
	- `Inf2`: AWS Inferentia for LLMs and Gen AI deployments. 
	- `G4` / `G5` / `G6`: GPU options for deep learning inference. 

Note that *EC2 Spot Instances* offer managed training on interruptible spare capacity, and can be much more cost efficient for small projects. 

#### Deployment Methods for Inference

How can we actually go about deploying a trained model? 

- *SageMaker JumpStart*: easy method for deploying trained models to pre-configured endpoints via template workflows. 
- *ModelBuilder*: more configurable deployment tool used within the SageMaker Python SDK. 
- *CloudFormation*: most advanced option, enabling developers to create repeatable deployment patterns. 
	- Enables user to outline their AWS infrastructure (ex: security group, EC2 instances, S3 bucket, load balancer, etc.). 
	- Creates specified resources for you in configurable fashion. 
	- Infrastructure as code tool. 

There are a few primary types of inference: 

- *Real-Time Inference*: for interactive workloads which require low-latency. 
- *Asynchronous Inference*: queues requests and processes them asynchronously. More suitable for large payloads without real-time needs. 

AWS offers serverless inference in certain scenarios, which abstracts away infrastructure management from the developer by automatically provisioning and scaling underlying instances. 

Inference pipelines chain together a linear sequence of containers to combine pre-processing, prediction generation (actual inference), and post-processing in a modular fashion. This is suitable for both real-time and batch inference workloads. 

## Model Monitoring 

#### Metrics to Monitor 

What are the primary types of metrics we should monitor within an ML system? We can broadly group metrics of interest by category. 

- Infrastructure Monitoring: endpoint invocations / traffic, latency, errors / failures, resource (CPU / GPU / memory) utilization. 
- Input Data: missing features, unexpected ranges, changes in distribution, data drift. 
- Model Quality: output distributions, performance metrics (once ground-truth labels are available). 

#### Performance Baselines and Drift 

Baselines define the expected / reference behavior for a model in production. There are two primary types of baselines: 

- Data Baseline: statistical features of the input dataset (e.g., distributions, ranges, missing value rates, etc.). 
- Performance Baseline: model evaluation metrics relevant to the task at hand (e.g., accuracy, precision, recall, RMSE, MAE, etc.). 

Accordingly, *Data Drift* refers to the situation where production input data increasingly differs from the original training dataset over time. *Model Quality Drift* refers to degradation in model prediction quality over time. Drift monitoring in AWS was previously supported via SageMaker Model Monitor, but now relies on custom-built solutions via open-source tooling (ex: MLFlow). 

#### GenAI Drift

Given the stochastic and unstructured nature of generative AI output, foundation model evaluation is a bit more tricky. One suitable practice is to maintain a fixed prompt / evaluation dataset and run at fixed intervals. The response is then evaluated via humans / other LLMs, or compared to ground-truth response values (when available). Bedrock Model Evaluations assists with this functionality. 

## Other Dev Considerations

#### CI/CD in AWS 

**Continuous Integration / Continuous Delivery (CI/CD)** is a collection of software development practices which automates the building, testing, and release of code into production in a structured and consistent fashion. 

There are many basic tools pertaining to CI/CD in AWS: 

- *CodeCommit*: AWS-hosted Git provider. Analogous to GitHub, Azure DevOps, GitLab.  
	- CodeConnections: manages connections between AWS services and third-party Git providers (ex: Gitlab). 
- *CodePipeline*: orchestration tool defining series of actions to perform given trigger event. 
- *CodeBuild*: tool for automatically provisioning the resources required to build source code. 
- *CodeDeploy*: fully-managed service for automating software deployments to various compute services (ex: EC2, ECS, on-prem servers). 

![CICD](/img/posts/edu-AWS/code-tools.png)

Note that CI/CD concepts and tools generalize to *AI artifacts*, which are files pertaining to machine learning projects (e.g., pickled models, prompt templates, etc.). Additionally, Bedrock Knowledge Bases provides a `StartIngestionJob` sync feature to re-process added, modified, or deleted documents within an updated knowledge base. 

#### EventBridge 

Amazon **EventBridge** is a service used to schedule *Cron jobs* (scheduled script execution) and react to event patterns. EventBridge links source events to downstream actions. For example...

- Source Event: API call logged via CloudTrail. 
- EventBridge: generates JSON document used to summarize event. May also filter incoming events to those of interest (ex: only certain request types). 
- Destination: appropriate Lambda function triggered by EventBridge. 

EventBridge also supports integration with partner services such as Zendesk and Datadog. 

#### Step Functions 

Amazon **Step Functions** is a serverless orchestration service which enables developers to construct and run multi-step application workflows involving multiple different AWS services. It can automate many aspects of the machine learning project lifecycle, including training or tuning a model. 

---
(all information obtained from AWS Certified Machine Learning Engineer Associate: Hands On! course on Udemy)



