---
title: "Security, Identity, and Compliance"
description: Section 10 of AWS Certified ML Engineer course from Udemy. 
pubDate: 2026-09-19
categories: [AWS]
tags: [Machine Learning, AWS, IAM, VPC, KMS]
---

## Introduction 

This section of the course covers security, identity roles, and compliance in the context of machine learning project development on AWS. 

## Basic Security Concepts 

#### Least Privilege 

The **Principle of Least Privilege** grants only necessary permissions to a user / role in order to perform a task. This ensures that a given user has the minimal permissions required to complete their job. 

#### Encryption

**Encryption** converts readable plaintext data into an encoded ciphertext to mask sensitive information. 

- *Encryption at Rest*: encryption applied to data stored in a persistent location. Encryption may be server-side or client-side. 
	- Might include notebooks, files stored on endpoints, etc. 
	- S3 buckets have an encryption option, or can use KMS if desired. 
- *Encryption in Transit*: encryption applied to data transferred over a network connection. Data is encrypted prior to sending, and decrypted after receiving. This helps to protect against man-in-the-middle attacks intercepting and parsing sensitive information. 
	- Common Methods: TLS / SSL 
	- Inter-node training communication may be encrypted if desired. 

#### VPCs 

A **Virtual Private Cloud (VPC)** is a secure, isolated private network hosted within a public cloud infrastructure. SageMaker training jobs may be optionally configured to run in a VPC; notebooks, training, and inference containers are Internet-enabled by default. Network isolation is configurable for these components if desired. VPCs on AWS must exist within a single region. 

*Subnets* exist within a VPC, enabling the developer to partition their VPC network. Subnets on AWS exist at the Availability Zone (AZ) level. 

- Public Subnet: accessible from the Internet. 
- Private Subnet: subnet NOT accessible from the Internet. 
- Route Tables: set of rules (routes) that determine where network traffic from subnet / gateway is directed within the context of a VPC. 

*Internet Gateways* assist VPC instances with Internet connection. Public subnets have a defined bidirectional route to the Internet gateway; private subnets may use *NAT Gateways* to access the Internet while remaining inaccessible from the public. 

![VPC](/img/posts/edu-AWS/vpc-diagram.png)

A *Network ACL (NACL)* is a firewall which controls traffic to and from a subnet. NACLs in AWS are attached at the subnet level, and manage access by defining rules for IP addresses. A *Security Group* is a firewall which controls traffic to and from an EC2 instance. Rules for security groups may concern IP addresses or other security groups. 

*VPC Peering* connects two VPCs privately using AWS' network. This enables the VPCs to behave as if they existed in the same network. *VPC Endpoints* enable connection to AWS services using a private network, instead of the default option of using a public connection. This provides developers with enhanced security and lower latency to access AWS services. 

## Security and Privacy in AWS

#### IAM 

**Identity and Access Management (IAM)** is an AWS service for managing the permissions of users. Some relevant terminology concerning IAM includes... 

- *Root User*: default user created at inception of AWS account. Single sign-in identity which has complete access to all AWS services and resources in the account. 
	- Does not follow principle of least privilege! 
- *User*: individual within organization. 
- *Group*: collection of users having common access patterns (ex: Data Engineers). 

Users or Groups may be assigned *policies* granting them permission to certain AWS services. Each policy is a JSON file with certain expected fields. 

```json 
{
	"Version": "2012-10-17", 
	"Id": "S3-Account-Permissions", 
	"Statement": [
		{
			// unique identifier for statement
			"Sid": "1", 
			// "Allow" or "Deny"
			"Effect": "Allow",  
			// account / user / role to which policy applies
			"Principal": {
				"AWS": ["arn:aws:iam::1234567:root"]	
			}, 
			// list of actions the policy allows or denies 
			"Action": [.        
				"s3:GetObject", 
				"s3:PutObject"
			],
			// list of resources action applies to
			"Resource": ["arn:aws:s3:::mybucket/*"] 
		}
	]
}
```

**IAM Roles** are groups of permissions assigned to an AWS service account (service roles) or users / groups. For example, an EC2 instance may need to access certain information from AWS. The appropriate IAM role may be created and bound to the EC2 instance to ensure it has the proper permissions to complete its task. Roles are commonly created for AWS services such as EC2 instances, lambda functions, and CloudFormation. 

#### KMS 

Amazon **Key Management Service (KMS)** supports the creation and management of encryption keys. It is fully-integrated with IAM for authorization. Key usage is auditable via CloudTrail. 

There are a few types of keys: 

- *Symmetric (AES-256)*: single encryption key used to both encrypt and decrypt. 
- *Asymmetric (RSA / ECC)*: public encryption key and private decryption key. Public key may be shared with anyone; used to encrypt a message. Private key is strictly kept by the owner; used to decrypt the received message. 

KMS offers AWS-owned, customer-managed, and AWS-managed keys. It supports automatic key rotation and scopes keys per region. 

#### Macie 

Amazon **Macie** is a fully-managed security service which uses machine learning and pattern matching to identify sensitive data (e.g., PII) within S3 buckets. 

![Macie](/img/posts/edu-AWS/macie.png)

---
(all information obtained from AWS Certified Machine Learning Engineer Associate: Hands On! course on Udemy)

