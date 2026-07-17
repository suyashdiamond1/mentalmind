import os
import subprocess
import sys

def run_cmd(cmd):
    print(f"Running: {cmd}")
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in iter(process.stdout.readline, b''):
        print(line.decode('utf-8').rstrip())
    process.wait()
    if process.returncode != 0:
        print(f"Command failed with exit code {process.returncode}")
        sys.exit(1)

def main():
    print("==================================================")
    print(" MentalMind Extreme Quantization Pipeline (3-bit)")
    print("==================================================")
    print("This script uses MLC-LLM to download TinyLlama-1.1B and compress it down to ~300MB.")
    print("NOTE: This requires a GPU and is best run in Google Colab.")
    
    # 1. Install MLC-LLM if not present
    print("\n[1/4] Installing MLC-LLM...")
    run_cmd("python -m pip install --pre -U -f https://mlc.ai/wheels mlc-llm-nightly-cu121 mlc-ai-nightly-cu121")
    
    # 2. Download and Quantize the Model
    # We use q3f16_1 which means 3-bit integer grouping with 16-bit float activations.
    model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
    quantization = "q3f16_1"
    output_dir = "dist/tiny-llama-q3"
    
    print(f"\n[2/4] Quantizing {model_name} to {quantization}...")
    # This command downloads the model, runs the calibration/quantization, and saves it.
    run_cmd(f"python -m mlc_llm convert_weight --name tinyllama-mentalmind --quantization {quantization} {model_name} -o {output_dir}")
    
    # 3. Generate WebLLM Configuration
    print("\n[3/4] Generating WebLLM configuration...")
    run_cmd(f"python -m mlc_llm gen_config {model_name} --quantization {quantization} --conv-template llama-2 --output {output_dir}")
    
    # 4. Compile WebGPU Shader library (.wasm)
    print("\n[4/4] Compiling WebGPU Shaders (.wasm)...")
    run_cmd(f"python -m mlc_llm compile {output_dir}/mlc-chat-config.json --device webgpu -o dist/tinyllama-mentalmind-webgpu.wasm")
    
    print("\n==================================================")
    print(" SUCCESS! ")
    print("==================================================")
    print(f"Your quantized model is located in: {output_dir}")
    print(f"Your compiled WebGPU shader is: dist/tinyllama-mentalmind-webgpu.wasm")
    print("\nNext Steps:")
    print("1. Upload the contents of the 'dist/tiny-llama-q3' folder to a new HuggingFace repository.")
    print("2. Upload the '.wasm' file to the same repository or serve it statically.")
    print("3. Update your Next.js chat/page.tsx to point to your new HuggingFace URL!")

if __name__ == "__main__":
    main()
