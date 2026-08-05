---
title: "Remote Procedure Calls"
description: Module 13 of CS 6200 - Graduate Introduction to Operating Systems @ Georgia Tech. 
pubDate: 2025-12-16
categories: [OMSCS, GIOS]
tags: [Operating System, RPC]
---


### What is RPC? 

#### Overview 

A **Remote Procedure Call (RPC)** is a protocol-based mechanism for *inter-process communication (IPC)* which enables the requesting machine to execute a procedure (i.e., code) on a remote server. RPC is used to execute code on behalf of a client, while abstracting away any transfer-related details (and thus making as if the procedure is present in the client address space $\rightarrow$ *local illusion*). 

![remote-procedure-call](/img/posts/edu-GIOS/pasted-image-20251217162152.png)

RPCs are intended to simplify the development of cross-machine (more generally, cross-address-space) interactions. They accomplish this by... 

- providing a high-level interface for data movement and communication. 
- supporting error handling associated with communication. 
- abstracting the complexities of cross-machine interactions. 

Any RPC implementation must support client-server interactions, a procedure call interface (e.g., synchronous call semantics), proper type checking, and cross-machine type conversions. 

#### Structure

How does an RPC actually work? After the client machine makes a procedure call, the *client stub* marshals call specifications into a single message to be sent to the server. Upon receipt, the *server stub* unpacks this message and makes the relevant calls. If any responses are expected by the client, the process is reversed to transfer a return message. 

![RPC-structure](/img/posts/edu-GIOS/pasted-image-20251217164422.png)

### Implementation 

#### RPC Protocol 

Within the client-server RPC framework, the client should only be able to call procedures supported by the server. The server must specify an **Interface Definition Language (IDL)** to specify its *exported RPC interface*. At minimum, a valid IDL must include the following: 

- Procedure names, associated arguments, and result types. 
- Version number; useful for identifying particular server compatible with RPC desired by client (e.g., incremental upgrades supporting older versions to avoid breaking compatibility). 

The IDL may be *language-agnostic*, meaning its specification is not reliant on any particular programming language. *XDR* (SunRPC) is an example of a language-agnostic IDL, and is written using XDR language. 

```cpp
struct data_in {
	string vstr<128>; 
}; 

struct data_out {
	string vstr<128>; 
}; 

program MY_PROG {
	version MY_VERS {
		data_out MY_PROC(data_in) = 1; 	
	} = 1; 
} = 0x31230000; 
```

Conversely, *Java Remote Method Invocation (RMI)* is an IDL written in Java. 

```java
public interface Hello extends Remote {
	public String sayHello(String s) {
		throws RemoteException; 	
	}
}
```

Note that choice of language for the IDL is *only for the interface definition*, not for the RPC implementation or invocation! The user defines an IDL to define RPC methods and custom types, which are then implemented separately on the client- and server-side. 

#### Marshaling 

Earlier, we mentioned **Marshaling** - this refers to the process of organizing data into a message to be transmitted as part of RPC. More specifically, the marshaling code is responsible for *serializing* a client RPC method call (including call types + arguments) into a single contiguous *buffer message* to be sent to the server. 

![marshaling](/img/posts/edu-GIOS/pasted-image-20251217171512.png)

*Unmarshaling* involves parsing the incoming buffer to 1) identify RPC methods, and 2) reconstruct any objects on the receiving machine.  

![unmarshaling](/img/posts/edu-GIOS/pasted-image-20251217171730.png)

Note that the RPC user does not typically need to implement any marshaling / unmarshaling code. Instead, a given RPC library / system typically provides an *RPC system compiler*, which takes an IDL as input to generate marshaling / unmarshaling routines.  

#### Binding and Registry 

**Binding** is a client-side mechanism which involves connecting to a specified RPC server. As part of binding, the client must specify *server* (e.g., name + version) and *connection type* (e.g., IP address, network protocol, etc.). 

How does a client know which servers are available for binding? The RPC system / library provides a public **Registry*** containing a list of all servers, as well as their associated contact details (e.g., server name $\rightarrow$ IP address) and methods. 

#### Pointers as Arguments

Local function calls may involve *pointers* - variables which store memory addresses to values of interest, as opposed to the value of interest itself. Can we pass pointers as arguments to RPC methods? 

```cpp
// procedure interface: foo(int, int*)
foo(x, y);   // local procedure call  -> behaves normally
foo(x, y);   // remote procedure call -> ?
```

Since the pointer is an address relative to the client address space, the RPC library / system should not directly transfer the pointer value from client to server. Instead, it can make one of two implementation decisions: 

- Option 1: prohibit the use of pointers as RPC method arguments. 
- Option 2: ensure marshaling code serializes pointers by copying referenced data to buffer, as opposed to pointer value itself. 


### SunRPC
#### Overview

**SunRPC** is an RPC package originally developed by Sun in the 1980s for UNIX (Oracle purchased Sun in 2010). SunRPC makes the following design choices: 

- Binding $\rightarrow$ per-machine registry daemon. 
- IDL $\rightarrow$ language-agnostic definition written in XDR for interface specification and type encoding. Interface is defined within `.x` file, and `rpcgen` compiler converts this file to language-specific client and server stubs. 
- Pointers $\rightarrow$ allowed as arguments; serialized via marshaling code. 

![sunrpc](/img/posts/edu-GIOS/pasted-image-20251217180308.png)

SunRPC uses **Handles** to manage per-client RPC state - a handle is created on client binding and is utilized during procedure calls.  

#### XDR 

Recall that SunRPC uses `.x` files written in XDR to specify the IDL. XDR stands for *eXternal Data Representation*, and is a standard cross-platform method used to represent data. 

XDR files are structured as follows: 

```cpp
struct square_in {
 int arg1;
};
struct square_out {
 int res1;
};

program SQUARE_PROG { /* RPC service name */
  version SQUARE_VERS {
    square_out SQUARE_PROC(square_in) = 1; /* proc1 */
  } = 1; /* version1 */
} = 0x31230000; /* service id */
```

XDR files are compiled using the `rpcgen` compiler, which takes a `.x` file as input and produces client and server stubs written in the desired language. For example, `rpcgen -c square.x` generates client and server stubs written in C. 

#### SunRPC Binding and Registry

In SunRPC, the registry is a daemon which runs on every single machine called *portmapper*. Servers register with portmapper, whereas clients query it for necessary information on the server (e.g., port number). 

Clients initiate binding by invoking `clnt_create` with arguments for host name, desired protocol, version, and network protocol. 

```cpp
CLIENT* clnt_handle; 
clnt_handle = clnt_create(rpc_host_name, SQUARE_PROG, SQUARE_VERS, "tcp"); 
```

---

(all images obtained from Georgia Tech GIOS course materials) 
