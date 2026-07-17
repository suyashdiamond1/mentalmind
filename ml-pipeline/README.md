# MentalMind: Extreme Quantization Pipeline

This directory contains the machine learning pipeline to compress a large language model into an ultra-small, highly efficient format that can run natively in a web browser using WebGPU.

## Goal
Take **TinyLlama-1.1B-Chat** and compress it using **q3f16_1** (3-bit integer quantization with 16-bit float activations) via MLC-LLM. This extreme quantization crushes the model down to roughly **300MB - 400MB**, allowing it to run smoothly on low-end hardware.

## Why 3-bit Quantization?
Normally, models use 16-bit (fp16) or 8-bit (int8) quantization. By mathematically shifting to 3-bit (q3f16_1) grouping, we achieve a massive reduction in VRAM and bandwidth requirements. This is heavily inspired by EXL2's philosophy of mixed-precision grouping to maintain perplexity (intelligence) while shrinking file size.

## How to Run This Pipeline
Because MLC-LLM compilation requires Apache TVM, a C++ compiler, and a GPU, it is highly recommended to run this pipeline in **Google Colab** rather than locally on Windows. 

1. Upload `colab_quantization.ipynb` to Google Colab.
2. Go to **Runtime > Change runtime type** and select **T4 GPU**.
3. Run all the cells in the notebook.
4. Once completed, the notebook will output a `dist/` folder containing your compiled `.wasm` file and the quantized model weights.
5. You can then upload these weights to a HuggingFace repository!

## Integrating with the Web App
Once your model is uploaded to HuggingFace (e.g., `your-username/TinyLlama-MentalMind-q3f16_1-MLC`), you simply update `src/app/chat/page.tsx`:

```typescript
const selectedModel = 'hf://your-username/TinyLlama-MentalMind-q3f16_1-MLC';
```
And WebLLM will automatically fetch and run your custom 300MB model!
