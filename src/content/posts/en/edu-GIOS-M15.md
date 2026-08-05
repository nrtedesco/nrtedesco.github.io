---
title: "Distributed Shared Memory"
description: Module 15 of CS 6200 - Graduate Introduction to Operating Systems @ Georgia Tech. 
pubDate: 2025-12-13
categories: [OMSCS, GIOS]
tags: [Operating System, Distributed Computing, Shared Memory, Consistency]
---


### What is Distributed Shared Memory? 

#### Overview 

**Distributed Shared Memory (DSM)** refers to a combined memory system in which components of memory are stored on separate machines. Since any distributed service involves similar concepts, much of the previous discussion on *distributed file systems (DFS)* is relevant here. 

DSM is particularly useful in the context of *scaling*. Instead of scaling up a single machine to improve memory capacity, DSM systems rely on horizontal scaling to increase memory. This allows us to bypass the memory limitations of a single machine, often in a more cost-effective manner! 

#### Peer DSM Systems 

In this lesson, we will focus on the case of *peer distribution* - recall this implies each machine in the system both hosts and accesses at least a portion of the distributed service. 

As part of peer DSM, each machine in the system owns some portion of memory and provides services (read / write) to access memory from anywhere in the system. 

#### Implementation 

DSM can be implemented at the hardware or software level: 

- *Hardware-Supported DSM*: relies on network interconnect cards (NICs) to translate remote RAM accesses into messages, which are received and parsed by the NIC of the appropriate machine.
- *Software-Supported DSM*: uses OS or language runtime to translate remote RAM accesses into requests to other machines. 

DSM design strategies must account for *sharing granularity*, which refers to the level of shared memory refresh across the entire system. Lower-level granularity (ex: cache line, variable) tends to require too much overhead; instead, higher-level granularity (ex: page, object) better suits DSM systems. 

### DSM Access and Consistency

#### Access by Application Type

DSM implementations should consider the typical expected use case to maximize performance. Use cases are grouped into three major application types: 

- *Single Reader / Single Writer (SRSW)* $\rightarrow$ DSM provides application with additional remote memory. No considerations required for resource sharing / consistency management.  
- *Multiple Readers / Single Writer (MRSW)* $\rightarrow$ DSM must support consistency mechanisms at the read level; every machine should see the same version of shared memory (state). 
- *Multiple Readers / Multiple Writers (MRMW)* $\rightarrow$ DSM must support consistency mechanisms at both the read and write levels; system must enforce sequential consistency to maintain a globally consistent state. 
  
#### Performance Considerations

The primary performance metric used to evaluate DSM systems is **Access Latency**. Since accessing local memory is much faster than accessing remote memory, it would be ideal to maximize local memory over remote memory accesses. 

There are a few strategies used to maximize local accesses in distributed memory systems: 

- *Migration*: transfers single valid copy of state from remote memory into local (requesting) machine's memory. 
- *Replication*: creates multiple valid copies of state and stores within local (requesting) machines' (plural) memories. 
  
#### Consistency Management 

Recall that *shared memory microprocessors (SMPs)* maintain **Cache Coherence** to ensure each local cache in the system has proper and consistent state (relative to state across the entire system). SMPs use *write-invalidate* or *write-update* mechanisms, which are triggered by write operations. 

Coherence operations triggered on each write would require too much overhead in the case of distributed memory. Instead, DSM may utilize... 

- *Push Invalidations* (eager): invalidate local copies of state when remote state is written to.
- *Pull Modifications* (lazy): periodically pull updated state into local memory. 

The exact mechanism(s) which occur on a trigger operation depend on the **Consistency Model**, which guarantees memory (state) changes will happen in an expected manner so long as the accessing applications follow a predefined set of rules. 

- *Strict Consistency*: any state update is immediately visible everywhere in the system. Impossible to achieve on distributed systems due to latency associated with remote access.  
- *Sequential Consistency*: memory updates from different processors may be arbitrarily interleaved. Given one observation of sequence, all machines in the system should observe the same sequence. 
	- This might be overkill in the case where different processors are involved with different regions of memory (i.e., why have such strict standards + overhead if the memory is not being jointly accessed?). 
- *Causal Consistency*: guaranteed to detect possible causal relationships between updates. If causal relationship is detected, all machines in the system will observe the same causal sequence. 
	- Concurrent (non-causal) writes have no sequence guarantee. 
- *Weak Consistency*: guarantees consistent update order once reaching a synchronization point; no order guarantee prior to this point. 

### DSM Architecture

Given our discussion of implementation considerations, how is DSM typically organized? A page-based distributed memory system has multiple independent *nodes* (machines) which contribute a portion of *main memory pages* to DSM. This system requires local caches for performance (latency), and a designated home node per page to drive coherence operations. Replication strategies may be used on-demand for load balancing, performance, and reliability. 

![dsm-architecture](/img/posts/edu-GIOS/pasted-image-20251213113526.png)

DSM must maintain *metadata* to index + locate pages. Each page object has an address (node ID + page frame number). A *global map* maps each page to its home node, and is replicated across all nodes in the system.

---

(all images obtained from Georgia Tech GIOS course materials)
