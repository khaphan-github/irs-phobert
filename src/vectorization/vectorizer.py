from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base", use_fast=False)
model = AutoModel.from_pretrained("vinai/phobert-base")

def vectorize(text):
    tokens = tokenizer.encode(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model(tokens)
    return outputs.last_hidden_state.mean(dim=1).squeeze().tolist()

# Test
if __name__ == '__main__':
    sample = "Việt Nam vô địch AFF Cup"
    vec = vectorize(sample)
    print(f"Vector result: {vec}")
