

cat > main.jsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
EOF

cat > index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  scroll-behavior: smooth;
}

html, body {
  background-color: #0a0a0f;
  color: #e4e4ec;
}

body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0f;
}
::-webkit-scrollbar-thumb {
  background: #6C63FF;
  border-radius: 4px;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

@media (min-width: 768px) {
  .section-container {
    padding: 6rem 2rem;
  }
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 2.75rem;
  }
}

.section-eyebrow {
  color: #6C63FF;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
}

.gradient-text {
  background: linear-gradient(135deg, #6C63FF 0%, #9D8CFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card {
  background: #111118;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 1rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  background: #6C63FF;
  color: #fff;
  font-weight: 600;
  transition: all 0.25s ease;
}
.btn-primary:hover {
  background: #5a52e0;
  box-shadow: 0 0 25px rgba(108, 99, 255, 0.45);
  transform: translateY(-2px);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(108, 99, 255, 0.5);
  color: #e4e4ec;
  font-weight: 600;
  transition: all 0.25s ease;
}
.btn-outline:hover {
  background: rgba(108, 99, 255, 0.1);
  transform: translateY(-2px);
}

.input-field {
  width: 100%;
  background: #181822;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 0.6rem;
  padding: 0.7rem 1rem;
  color: #e4e4ec;
  outline: none;
  transition: border-color 0.2s;
}
.input-field:focus {
  border-color: #6C63FF;
}
EOF
