---
title: "DL M15: Scalable Training"
description: Module 15 of CS 7643 - Deep Learning @ Georgia Tech.
pubDate: 2025-11-24
categories: [OMSCS, DL]
tags: [Deep Learning, Machine Learning, Distributed Computing, PyTorch, Parallelism, Remote Procedure Call, Pinned Memory, GPU]
math: true
---

### Overview 

Modern deep learning libraries such as `torch` provide direct integration with the **Graphics Processing Unit (GPU)** to drastically increase computational efficiency via *parallelization*. Whenever possible, we should prefer `torch` operations over base Python to benefit from this enhanced efficiency. 

#### Script Mode 

Additionally, `torch` has different modes depending on the level of desired optimization: 

- **Eager Mode**: default mode which executes code line-by-line. Useful for model development and prototyping. 
- **Script Mode** (TorchScript): converts models to programs via *Just-in-Time (JIT)* interpreter, with programs being optimized for production runtimes. 

We can convert normal functions to programs optimized by JIT using `torch.jit.script`. For example...

```python 
a = torch.rand(5)
def func(x): 
	for i in range(10): 
		x = x*x 
	return x 

scripted_func = torch.jit.script(func) 
%timeit func(a) 
# 18.5 microseconds per loop 

%timeit scripted_func(a) 
# 4.41 microseconds per loop 
```

JIT performs various types of optimization to increase efficiency. 

![JIT](/img/posts/edu-DL/pasted-image-20251112031935.png)

### End-to-End Scalable Training

#### Ingesting Data 

How can we efficiently load + use data as part of our machine learning workflow? PyTorch provides the following classes to interact with data: 

- **Dataset**: construct representing our data. Supports operations such as iteration and mapping. 
- **Data Loader**: enables *batching* and parallelization, which is very helpful during model training. 

```python
from torch.utils.data import DataLoader, RandomSampler 

dataloader = DataLoader(
	dataset,        # only for map-style dataset 
	batch_size=8,   # balance speed and convergence
	num_workers=2,  # non-blocking when > 0
	sampler=RandomSampler, 
	pin_memory=True
)
```

*Pinned memory* (also known as page-locked memory) refers to a specific hardware optimization concept for transferring data from the CPU to the GPU. Normal RAM is *pageable*, meaning it is separated into bocks called pages that can be swapped out to the disk as needed. In contrast, pinned memory is page-locked such that the operating system cannot swap it to disk. Before CUDA can send data from CPU to GPU, it must first create a page-locked version of the data. In the case of `pinned_memory=True`, `torch` loads the data into page-locked memory to avoid the expensive copy operation when sending to GPU. 

For a more thorough overview of pinned memory, check out the [PyTorch guide](https://docs.pytorch.org/tutorials/intermediate/pinmem_nonblock.html). 

#### Distributed Computing

We have primarily discussed **Parallelism** in terms of the operations performed by a single GPU. In this section, we will extend our discussion of parallelism to include *distributed computing*, whether in terms of *multiple GPUs* on a single machine or *multiple machines*. 

In deep learning, we frame distributed parallelism from two major perspectives: 

- *Data Parallelism*: data is distributed across devices. 
  `model = torch.nn.DataParallel(model)`
- *Model Parallelism*: model is distributed across devices. Intended for cases where the model itself is too large to fit on a single machine. 
	- must manually set layers to corresponding device in network `__init__` function, and manually transfer data to device in `forward` function. 

Here are a few examples of parallelized implementations: 

- Single Machine Data Parallel: data is scattered across GPUs, and model is replicated on each GPU. `torch` takes care of gathering the data on each GPU to compute loss, then updating the parameters across GPUs. 

![single-machine-data-parallel](/img/posts/edu-DL/pasted-image-20251124144916.png)

- Single Machine Model Parallel: model is shared across GPUs. An instance is sent through a portion of the model, and the intermediate activation is transferred to the next device to proceed as dependent on model distribution architecture. 

![single-machine-model-parallel](/img/posts/edu-DL/pasted-image-20251124145044.png)

- Distributed Data Parallel: each GPU across machines receives different instances to process. `torch` must account for parameter updates performed across multiple GPUs / machines; this is done within `loss.backward()`. 

![distributed-data-parallel](/img/posts/edu-DL/pasted-image-20251124145150.png)

- Distributed Data Parallel with Single Machine Model Parallel: combines concepts of distributed data parallel - data processed across multiple machines - with single machine model parallel - model distributed across multiple GPUs on same machine. Model is replicated on each machine. 

![distributed-data-parallel-with-single-machine-model-parallel](/img/posts/edu-DL/pasted-image-20251124145246.png)

- Distributed Model Parallel: model is shared across GPUs on multiple different machines. 
	- Distributed model parallelism in PyTorch makes use of **Remote Procedure Call (RPC)** via `torch.distributed.rpc`. Recall that RPC is a method for calling a function locally, but having the function execute on a remote machine.
	- *Distributed autograd* and *distributed optimizer* extend `torch` model training methods across multiple machines. For example, *Hogwild!* is a distributed optimizer which implements stochastic gradient descent (SGD) across machines in a non-locking fashion. In other words, each machine can perform parameter updates without a locking mechanism. 

--- 

(all images obtained from Georgia Tech DL course materials)
