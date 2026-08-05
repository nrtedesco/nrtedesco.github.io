---
title: "Inter-Process Communication"
description: Module 9 of CS 6200 - Graduate Introduction to Operating Systems @ Georgia Tech. 
pubDate: 2025-12-06
categories: [OMSCS, GIOS]
tags: [Operating System, IPC, Synchronization, Mutex, Condition Variable, Shared Memory, Message Queue, Socket, Pipe]
---



### What is Inter-Process Communication? 

**Inter-Process Communication (IPC)** refers to OS-supported mechanisms for interaction (coordination + communication) among processes. IPC methods are loosely grouped into two main categories: 

- *message-based IPC*: sockets, pipes, message queues.
- *memory-based IPC*: shared memory, memory mapped files.

The end result of any IPC mechanism is that data is transferred from one address space into another. As part of message-based IPC mechanisms, the CPU must copy data to/from a port; as part of memory-based mechanisms, the CPU must define VA-PA mappings. If the data is large, the CPU overhead required to copy data is much larger than that to map memory. 

### Message-Based IPC

Message passing involves the `send/recv` of messages. The OS handles channel management + synchronization, enabling one process to write to a port and the other to read from it. There are many different POSIX-supported implementations of message-based IPC: 

- **Pipes** are characterized by two endpoints, and carry a *byte stream* between two processes. Pipes are commonly used to connect the output of one process to the input of another. 
- **Message Queues** are organized such that the sending process sends a properly formatted message to a channel, and the receiving process receives a properly formatted response. The OS may handle things like message parsing, formatting, prioritization, and scheduling.
- **Sockets** are used to directly `send` and `recv` messages via the socket API. Unlike the previous two mechanisms, processes can be used for IPC across different machines.
  
### Memory-Based IPC

In **Shared Memory IPC**, processes read and write to the same shared memory buffer. P1 and P2 will use different virtual addresses, but map to the same physical addresses in RAM. *System calls* are only used for the setup process; once the OS establishes the shared memory buffer / VA-PA mappings, it is no longer needed. However, processes must use *synchronization* to access shared memory region. 

### Shared Memory 

#### Specific Implementations 

**SysV** is the UNIX standard for shared memory. As part of SysV, the OS provides shared memory in the form of *segments* - dynamically-sized and not-necessarily-contiguous physical pages. 

Using shared memory as part of SysV typically works as follows: 

1. Create $\rightarrow$ OS allocates shared memory and assigns it a unique ID. Process(es) provides a key to the OS in return for the ID. 
   `ftok(pathname, proj_id)` (hash function to generate `key`)
   `shmget(key, size, flag)`
2. Map $\rightarrow$ attach shared physical memory to each virtual address space. 
   `shmat(shmid, addr, flags)`
3. Detach $\rightarrow$ invalidate address mappings to prevent virtual addresses from accessing. Segment still exists in physical memory, and may be re-attached (to same or different processes) as desired.
   `shmdt(shmaddr)`
4. Destroy $\rightarrow$ explicitly deallocate physical memory corresponding to segment. 
   `shmctl(shmid, cm=IPC_RMID, buf)`

The **POSIX Shared Memory API** provides shared memory in the form of *files* as opposed to segments. It is not as widely supported as SysV. The POSIX shared memory API has analogous operations to SysV: 

1. `shm_open()` $\rightarrow$ returns file descriptor, where file is located in `tmpfs` file system. 
   - Must then use `ftruncate(fd, size)` to define the size of the shared memory. 
2. `mmap()` and `munmap()` $\rightarrow$ attaches shared memory to virtual address space. 
3. `close()` $\rightarrow$ removes file descriptor from virtual address space. 
4. `shm_unlink()` $\rightarrow$ indicates to the OS that all shared memory data structures should be deleted + freed. 
  
#### Synchronization 

When data is placed in shared memory, it can be concurrently accessed by all processes which have access to the shared memory. It is therefore important to use **Synchronization**, as in the case of any concurrent access to a shared resource. 

We can manage synchronization of IPC shared memory in a few ways: 

- Apply mechanisms supported by process threading library (ex: `pthreads`). 
- Utilize OS-supported IPC for synchronization. 

Either method must coordinate concurrent accesses to the shared segment (via *mutexes*), and indicate when data is available / ready for consumption (*condition variables*). 

##### PThreads 

In order to use `pthreads` structure as part of IPC, we must ensure that all interacting processes have the same access to IPC data structures. This is not a factor when considering threads, since the structures are by-default available to all threads of the same process. 

```cpp
typedef struct {
	pthread_mutex_t mutex; 
	char *data;
} shm_data_struct, *shm_data_struct_t; 

// create shm segment 
seg = shmget(ftok(arg[0], 120), 1024, IPC_CREAT|IPC_EXCL));
shm_address = shmat(seg, (void *) 0, 0); 
shm_ptr = (shm_data_struct_t)shm_address; 

// create + init mutex 
pthread_mutexattr_setpshared(&m_attr, PTHREAD_PROCESS_SHARED); 
pthread_mutex_init(&shm_prt->mutex, &m_attr); 
```

---

(all images obtained from Georgia Tech GIOS course materials) 
