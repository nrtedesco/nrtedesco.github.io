---
title: "GIOS M4: PThreads"
description: Module 4 of CS 6200 - Graduate Introduction to Operating Systems @ Georgia Tech. 
pubDate: 2025-12-04
categories: [OMSCS, GIOS]
tags: [Operating System, Multi-Threading, PThreads, POSIX, C++, Mutex, Condition Variable]
---



### What is a PThread? 

**PThreads** (POSIX threads) is the standardized library for thread creation / management in C / C++ programs on UNIX-based systems. *POSIX* (Portable Operating System Interface) refers to a collection of standards defined by the IEEE Computer Society for maintaining compatibility between operating systems. 

Most of this lesson will cover PThread functions and code corresponding to general theory from the previous lesson. 

#### PThread Creation + Destruction

The `pthread_t` data type represents a thread, and holds all thread-associated state necessary for the thread abstraction. `pthread_create` is used to create a new thread, and is conceptually equivalent to the `fork` method discussed in the previous lesson. Finally, `pthread_join` is used to destroy threads, and is conceptually equivalent to `join`. 

```cpp
#include <pthread.h> 

pthread_t aThread;                           
int pthread_create(pthread_t *thread, const pthread_attr_t *attr, ...);   
int pthread_join(pthread_t thread, ...); 
```

`pthread_attr_t` objects are used to specify desired features of a thread during its creation. This includes characteristics such as stack size, inheritance, ability to join, scheduling policy, priority, and system / process scope. 
#### Example Implementations

Here is a simple implementation of multi-threading using the PThreads library. 

```cpp 
#include <stdio.h>
#include <pthread.h> 
#define NUM_THREADS 4

void *hello (void *arg) {
	printf("Hello Thread\n"); 
	return 0; 
}

int main(void) {
	int i; 
	pthread_t tid(NUM_THREADS); 
	for (i=0; i<NUM_THREADS; i++) {
		pthread_create(&tid[i], NULL, hello, NULL); 	
	}
	for (i=0; i<NUM_THREADS; i++) {
		pthread_join(tid[i], NULL);	
	}
	return 0; 
}
```

We can also pass arguments during thread creation to provide each thread with its own data. 

```cpp
#include <stdio.h> 
#include <pthread.h> 
#define NUM_THREADS 4

void *threadFunc(void *pArg) {
	int *p = (int*)pArg; 
	int myNum = *p; 
	printf("Thread number %d\n", myNum);
	return 0;
}

int main(void) {
	int i; 
	pthread_t tid[NUM_THREADS]; 
	for (i=0; i<NUM_THREADS; i++) {
		pthread_create(tid[i], NULL, threadFunc, &i); 	
	}
	for (i=0; i<NUM_THREADS; i++) {
		pthread_join(tid[i], NULL); 	
	}
	return 0; 
}
```

Note that the above program isn't guaranteed to print thread numbers in order. Furthermore, we may have a *race condition* where the globally-accessible variable `i` is changed prior to a thread reading + printing its value. We can avoid this situation by first copying the value of `i` into a different variable, then passing the address corresponding to the copy variable. 

### PThread Synchronization

#### Mutexes

How does PThreads deal with *mutual exclusion*? Recall the **Mutex** data structure from the previous lesson, which a thread must lock prior to accessing some critical section of code. PThreads provides a mutex type, along with associated lock / unlock operations. 

```cpp
pthread_mutex_t aMutex; 
int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);  
```

Given this framework, it is fairly straightforward to see how we can apply mutexes to pseudocode from last lesson. 

```cpp
list<int> my_list; 
pthread_mutex_t m; 
void safe_insert(int i) {
	pthread_mutex_lock(&m);
	my_list.insert(i); 
	pthread_mutex_unlock(&m); 
}
```

When working with multiple mutexes, make sure to always enforce a *global lock order* to prevent the possibility of deadlocks! 

#### Condition Variables

**Condition Variables** are synchronization constructs which allow blocked threads to be notified once a condition occurs. PThreads provides the following API for condition variables: 

```cpp
pthread_cond_t aCond; 
int pthread_cond_wait(pthread_cond_t *cond, pthread_mutex_t *mutex); 
int pthread_cond_signal(pthread_cond_t *cond); 
int pthread_cond_broadcast(pthread_cond_t *cond); 
```

### Producer and Consumer Example

The **Producer and Consumer** framework is a classic example of multi-threading involving some data producer(s) and consumer(s) interacting with a shared buffer. 

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#define BUF_SIZE 3

int buffer[BUF_SIZE];   // shared resource (buffer = temporary holding spot) 
int add = 0;            // place to add next element
int rem = 0;            // place to remove next element 
int num = 0;            // count of elements in buffer

pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;     // mutex init with attr
pthread_cond_t c_cons = PTHREAD_COND_INITIALIZER;  // cond init with attr
pthread_cond_t c_prod = PTHREAD_COND_INITIALIZER; 

void *producer (void *param);  // function executed by producer threads
void *consumer (void *param);  // function executed by consumer threads 

int main(int argc, char *argv[]) {
	
	pthread_t tid1, tid2; 
	int i; 
	
	if (pthread_create(&tid1, NULL, producer, NULL) != 0) {
		fprintf(stderr, "Unable to create producer thread\n"); 
		exit(1); 	
	}
	
	if (pthread_create(&tid2, NULL, consumer, NULL) != 0) {
		fprintf(stderr, "Unable to create consumer thread\n"); 	
		exit(1); 
	}
	
	pthread_join(tid1, NULL); 
	pthread_join(tid2, NULL); 
	printf("Parent quiting\n"); 
	
	return 0; 

}

void *producer(void *param) {

	int i; 
	for (i=1; i<=20; i++) {
		pthread_mutex_lock(&m); 
		if (num > BUF_SIZE) {   /* overflow */ 
			exit(1); 	
		}	
		while (num == BUF_SIZE) {
			pthread_cond_wait(&c_prod, &m); 
		}
		buffer[add] = i; 
		add = (add + 1) % BUF_SIZE; 
		num++; 
		pthread_mutex_unlock(&m); 
		
		pthread_cond_signal(&c_cons); 
		printf("producer: inserted %d\n", i); 
	}
	
	printf("produer quitting\n"); 

}

void *consumer(void *param) {

	int i; 
	while (1) {    /* infinite loop */
		pthread_mutex_lock(&m); 
		if (num < 0) {
			exit(1); 	
		}	
		while (num == 0) {
			pthread_cond_wait(&c_cons, &m); 	
		}
		i = buffer[rem];
		rem = (rem+1) % BUF_SIZE; 
		num--; 
		pthread_mutex_unlock(&m); 
		pthread_cond_signal(&c_prod); 
		printf("consumer: removed value %d\n", i); 
	}
	
	printf("consumer quitting\n");   // never reached

}
```


---

(all images obtained from Georgia Tech GIOS course materials)
