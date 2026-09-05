---
title: "Generative AI Model Fundamentals"
description: Section 7 of AWS Certified ML Engineer course from Udemy. 
pubDate: 2026-09-04
categories: [AWS]
tags: [Machine Learning, ML, Foundation Models, Generative AI, AWS]
---

## Introduction 

**Generative AI (Gen AI)** is a type of *artificial intelligence* which has the ability to create new content. This might take the form of text (conversations), images, code, and so on. This section provides an overview of Gen AI fundamentals, and common services for Gen AI available via AWS. 

## Transformers 

A **Transformer** is a type of *neural architecture*, which is a specific arrangement of layers within a neural network. Transformers were introduced alongside self-attention - their underlying mechanism - in the 2017 publication [Attention Is All You Need](https://arxiv.org/abs/1706.03762). The transformer architecture serves as the backbone of most modern Gen AI models, including *Large Language Models (LLMs)* such as ChatGPT. 

#### Evolution of Transformers 

Transformers evolved from *Recurrent Neural Networks (RNNs)* and *Long Short-Term Memory (LSTM)* networks. Both of these network types utilize the concept of a feedback loop for modeling sequential items. 

![Feedback Loop](/img/posts/edu-AWS/feedback-loop.png)

Machine translation took this idea one step further through the use of *encoder-decoder* architecture, where two separate neural networks are trained to encode and decode information. 

- Encoder: takes input data and transforms into latent vector representation. 
- Decoder: takes latent vector representation and transforms into output. 

![Encoder-Decoder Architecture](/img/posts/edu-AWS/encoder-decoder.png)

However, using one latent vector to transfer semantic understanding from the encoder to the decoder is an information bottleneck. For example, the last hidden state may not properly represent earlier terms in the input sequence, which have been iteratively overwritten by the encoder RNN. So how can we improve on this structure?  

#### Attention-Based Networks 

**Attention** maintains a *hidden state for each token* in the sequence, and passes all hidden states from the encoder to the decoder. This is particularly useful for 1) maintaining more information on the entire sequence, and 2) representing relationships between tokens in the sequence. 

![Cross-Attention](/img/posts/edu-AWS/cross-attention.png)

Still, the encoder's recurrent nature is a huge bottleneck for training and inference. Each input sequence must be processed in an iterative token-by-token fashion, meaning modern efficient computing methods for neural network training (ex: parallelization) cannot be used here. Transformers replace the concept of recurrence with self-attention in combination with a *Feed-Forward Neural Network (FFNN)*, where information flows in a single (forward) direction. 

![Self-Attention](/img/posts/edu-AWS/self-attention.png)

**Self-Attention** applies the attention mechanism within the context of a single neural network, passing the results to downstream layers (e.g., FFNN). 

1. The embedding layer of the encoder generates a latent vector representation (*embedding*) for each token in the input sequence. $$X \sim \mathbb{R}^{m \times n} \rightarrow \text{Embedding Layer} \rightarrow E \sim \mathbb{R}^{m \times d}$$
2. The self-attention layer of the encoder produces a weighted average of all token embeddings, where attention weights are computed from learned parameters. *Each token* is assigned a weighted average of learned value vectors across all tokens in the sequence. 
$$E \sim \mathbb{R}^{m \times d} \rightarrow \text{Self-Attention} \rightarrow O \sim \mathbb{R}^{m \times d}$$
	- Three matrices of parameters are learned as part of this process. These matrices are used to produce *query*, *key*, and *value* vectors for each embedded input token in the sequence. 
	- For each token, we compute similarity between its query vector and each key in the sequence by taking the *dot product* of the query vector and key matrix. The result is then passed through a *Softmax* layer to yield scaled attention weights. 
	- For each token, the final output of the attention layer is a weighted average of the value vectors using its scaled attention weights. 

Other variants on self-attention include...

- *Masking*: censoring future tokens in a sequence when computing attention weights. 
	- Prevents tokens from associating with future tokens in a sequence.
	- This is particularly important for applications such as text generation (GPT), where information on future tokens should not be available. 
- *Multi-Headed Self-Attention*: enables multiple patterns for attention to be learned in parallel. 

Conceptually, self-attention is simply updating the original embeddings for each token to account for all other tokens in the sequence. This produces much more contextually-informative embeddings! Updated embeddings are then passed into downstream layers of the FFNN. 

#### Applications of Transformers 

The most obvious application of transformers is conversation, including via chat (ex: ChatGPT) or question answering. Other applications include text classification (ex: sentiment analysis), named entity recognition, text summarization, machine translation, and so on. Note that transformers can be generalized to many different tasks by adding an output layer specific to the problem, such as binary classification for sentiment analysis. 

#### GPT Models

**Generative Pre-Trained Transformers (GPT)** are particular transformer-based LLMs developed by OpenAI. The first GPT model (GPT-1) was created in 2018, and subsequent versions have tweaked architecture / training to substantially improve generative performance. 

GPT is a *decoder-only* transformer model. Each decoder block includes 1) a masked self-attention layer, and 2) a neural network. The concept of input and output is a bit nuanced here: 

- Input: *prompt* representing a question or statement in natural language. 
- Output: text generated based on previously-generated tokens and the input. 

The task for GPT is *next-token language modeling* - it generates the most probable next token given previous tokens in the sequence. This task is commonly evaluated via **Perplexity**.  

$$\text{PPL}(X) = \exp\{-\frac{1}{t} \sum_{i\in t} \log p_\theta (x_i | x_{<i})\}$$  

$\underline{\text{GPT Input}}$

As with many other NLP approaches, raw input text must first be translated into a format understandable by machine learning (mathematical) models. **Tokenization** is the process of converting input text to tokens, where a token is a discrete ID. Token vectors are sparse, with a binary indicator in the position corresponding to the token ID. 

An *embedding layer* converts token vectors to dense latent vectors, which are intended to capture the semantic meaning of a token. Additionally, *positional encodings* provide detail on the position of the token within the input sequence. 

$\underline{\text{GPT Output}}$

The output of a GPT model is a probability distribution over tokens. We might choose to output the highest-probability token, sample from the estimated distribution, or use a parameter called *temperature* to flatten the distribution (i.e., increase randomization) before sampling for token generation. 

#### Fine-Tuning and Transfer Learning 

**Transfer Learning** is the process of *fine-tuning* a pre-trained *foundation model* on your specific task or dataset. There are a few methods for transfer learning: 

- Train the entire model on your dataset, initializing weights to their pre-trained values. 
- Add a final layer on top of the pre-trained model, freezing all other layers. 
- Freeze any combination of layers within the pre-trained model, and fine-tune the others. 

Fine-tuning is a much more viable strategy than training from scratch, given that foundation models have been trained 1) on massive datasets often inaccessible to the typical developer, and 2) using expensive computational infrastructure only affordable by corporations. 

## SageMaker Gen AI

#### Preprocessing: Tokenization and Positional Encoding 

The course demonstrates how to perform tokenization and positional encoding using a provisioned *EC2 Notebook Instance* within SageMaker. First we review tokenization...

```python
## hugging face (transformers) offers classes for common pre-trained models + associated tokenizers
from transformers import BertModel, BertTokenizer 

model_name = 'bert-base-uncased' 

tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)

## tokenization converts input text to tokens (IDs within the vocabulary)
input = 'This is my input prompt!' 
tokenized_input = tokenizer(input) 
```

... and next, we review positional encodings: 

```python 
## a common method for positional encoding is the sinosoidal wave function (with position in sequence as input) 
import numpy as np 

def encode_positions(num_tokens, depth, n=10_000): 
	positional_matrix = np.zeros((num_tokens, depth)) 
	for row in range(num_tokens): 
		for col in np.arange(int(depth / 2)): 
			denom = np.power(n, 2 * col / depth) 
			positional_matrix[row, 2 * col] = np.sin(row / denom) 
			positional_matrix[row, 2 * col + 1] = np.cos(row / denom) 
	return positional_matrix 
```

#### Attention Visualized

`transformers` also has a method for visualization self-attention. This allows us to understand which other tokens most closely associate with the current token in consideration, for a given input sequence. 

```python 
from bertviz.transformers_neuron_view import BertModel, BertTokenizer 
from bertviz.neuon_view import show 

tokenizer_viz = BertTokenizer.from_pretrained(model_name) 
model_viz = BertModel.from_pretrained(model_name) 

show(model_viz, 'bert', tokenizer_viz, 'I read a good novel') 
```

![Attention Visualized](/img/posts/edu-AWS/attention-example.png)

Furthermore, [Explorable BERT](https://huggingface.co/spaces/exbert-project/exbert) allows us to perform this same analysis via its web application. 

---
(all information obtained from AWS Certified Machine Learning Engineer Associate: Hands On! course on Udemy)


