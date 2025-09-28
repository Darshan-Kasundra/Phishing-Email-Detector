# 📧 Phishing Email Detector

A machine learning-powered email security solution that uses transformer neural networks to detect phishing emails with **94.14% accuracy**. The system features a custom **NanoTransformer** architecture with a full-stack web interface for real-time email analysis.

---

## 🎯 Project Overview

This project implements an end-to-end phishing detection system that:

- Analyzes email content using a custom transformer model  
- Provides real-time threat assessment through a web interface  
- Integrates with Gmail API for seamless email security monitoring  
- Achieves high accuracy through balanced training on 14,582 email samples  

---

## 🏗️ Architecture

### Core Components
- **NanoTransformer Model**: Custom PyTorch transformer with multi-head attention  
- **Flask REST API**: Backend service for model inference  
- **React Frontend**: Interactive dashboard for email analysis  
- **Gmail API Integration**: Real-time email fetching and processing  

---

## 🚀 Technical Implementation

### Machine Learning Pipeline
#### Model Architecture
```python
class NanoTransformer(nn.Module):
    # Embedding Layer: Token to vector conversion
    # Positional Embeddings: Learned sequence position encoding
    # Multi-Head Attention: 4-head attention mechanism
    # Feed-Forward Network: MLP with LayerNorm and ELU activation
    # Classification Head: Binary output (phishing/safe)
```

## 🛠️ Technical Stack

### Machine Learning
- PyTorch  
- scikit-learn  
- NLTK  
- NumPy / Pandas  

### Backend
- Flask  
- Flask-CORS  
- Pickle  

### Frontend
- React (with Hooks)  
- JavaScript (ES6+)  
- Bootstrap  
- Gmail API  

### Development Tools
- CUDA (GPU acceleration)  
- Google Colab (model training)  
- Git (version control)  

---

## 📊 Performance Metrics
- **Test Accuracy**: 94.14%  
- **Training Dataset**: 14,582 balanced samples  
- **Inference Speed**: Real-time processing  
- **Model Size**: Lightweight transformer architecture  
- **Vocabulary Coverage**: 120K+ unique tokens  

