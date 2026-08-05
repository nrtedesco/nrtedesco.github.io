---
title: "Datacenter Technologies"
description: Module 16 of CS 6200 - Graduate Introduction to Operating Systems @ Georgia Tech. 
pubDate: 2025-12-12
categories: [OMSCS, GIOS]
tags: [Operating System, Datacenter, Cloud, SAAS, PAAS, IAAS]
---


### What is a Datacenter?

#### Overview

A **Datacenter** is a physical facility used to house IT infrastructure (e.g., computers and associated hardware) which stores data or runs critical business applications. 

#### Internet Services and Datacenters

Datacenters are used to host *internet services*, which refer to any applications accessible via the internet. Recall that **scaling** dynamically adjusts compute infrastructure to meet the demands of a particular service. Scaling may be applied in two directions: 

- *Scale-Out* (horizontal scaling): add more servers to support the service. 
- *Scale-Up* (vertical scaling): add more compute power (e.g., RAM, CPU) to given machine(s) already supporting the service. 

Datacenters usually take a scale-out approach for multi-process, multi-machine applications which require variable levels of support. More specifically, a front-facing *load-balancer* fields delegates incoming requests to individual machines via a *boss-worker* distribution pattern. Worker machines may be *homogenous* (each performing the same functionality) or *heterogenous* (different machines specialized for different tasks). 

![datacenters](/img/posts/edu-GIOS/pasted-image-20251212114943.png)

### The Cloud

#### What is Cloud Computing?

**Cloud Computing** refers to the use of (usually third-party) remote servers for compute power or to host business services. 

How did cloud computing begin? Consider the case of Amazon. In the mid-2000's, Amazon had a problem - they needed servers and hardware resources to support high-demand periods of the year (e.g., Christmas), but supported this costly infrastructure even throughout idle periods. To turn costs into profits, Amazon began renting out its machines to other companies during down periods. This idea laid the foundation for *Amazon Web Services* (2006)! 

Finally, see below for a more concrete definition of cloud computing. 

>Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., network, servers) that can be rapidly provisioned and released with minimal management effort or service provider interactions.  
> - National Institute of Standards and Technology (2011) 

#### Benefits of Cloud Computing

What does cloud computing provide? Prior to cloud computing, businesses maintained their own infrastructure (e.g., datacenters) to support demand for their services. Internal infrastructure scaling is more rigid - the business must invest time and money into a single scaling operation (e.g., building warehouses and purchasing compute), and therefore should not perform scaling efforts continuously.

![no-cloud](/img/posts/edu-GIOS/pasted-image-20251212121022.png)

Reliance on cloud services enables much more fluid scaling. A business can dynamically adjust its infrastructure (and therefore costs) depending on current demand. 

![with-cloud](/img/posts/edu-GIOS/pasted-image-20251212121513.png)

In order to fit this scenario, cloud computing should provide...

- *shared resources* $\rightarrow$ elastic infrastructure and software/services available as-needed. 
- *APIs* $\rightarrow$ interface for customer to remotely access and request resources from cloud provider. 
- *billing / accounting models* $\rightarrow$ fine-grained pricing based on customer usage. 
- *management* $\rightarrow$ creation, upkeep, and delegation of shared resources by cloud provider. 
  
#### Deployment and Service Models 

Cloud are first classified based on **Deployment**... 

- *Public* $\rightarrow$ third-party customers utilize infrastructure owned by cloud provider. 
- *Private* $\rightarrow$ a single company uses its own cloud resources to leverage tech internally. 
- *Hybrid* $\rightarrow$ portions of private cloud supplemented with or switched to public cloud as appropriate for business needs. 

... and then based on **Service**: 

- *Software-as-a-Service (SAAS)*: cloud provider manages all aspects of the cloud services. 
- *Platform-as-a-Service (PAAS)*: cloud provider manages application platform + physical aspects of the cloud services. Customer manages application itself and data. 
- *Infrastructure-as-a-Service (IAAS)*: cloud provider manages physical aspects of the cloud services. Customer manages the application, data, and platform (runtime + OS). 
- *On-Premises* (not cloud): user manages all aspects of the services. 

![cloud-models](/img/posts/edu-GIOS/pasted-image-20250725012302.png) 

---

(all images obtained from Georgia Tech GIOS course materials)
