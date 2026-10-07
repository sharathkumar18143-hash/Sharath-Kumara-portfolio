// Sharath Kumar — Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('sk_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.remove('light');
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
    htmlElement.classList.add('light');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      localStorage.setItem('sk_portfolio_theme', 'light');
    } else {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      localStorage.setItem('sk_portfolio_theme', 'dark');
    }
  });


  // --- Toast Notification Helper ---
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }


  // --- Copy Email to Clipboard ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-link');

  if (copyEmailBtn && emailLink) {
    copyEmailBtn.addEventListener('click', () => {
      const emailText = emailLink.textContent.trim();
      navigator.clipboard.writeText(emailText).then(() => {
        showToast('Email address copied to clipboard');
      }).catch(() => {
        showToast('Sharath\'s email: ' + emailText);
      });
    });
  }


  // --- Project Data & Modal ---
  const projectData = {
    "1": {
      title: "Neural Vision OCR & Document Parser",
      year: "2026",
      tech: "Python · PyTorch · OpenCV · REST APIs",
      description: "An automated deep learning pipeline for processing unstructured document scans, invoices, and technical forms, extracting structured tabular JSON with high precision.",
      architecture: `[ Document Image ] ──> [ OpenCV Preprocessing ]
                           │
                           ▼
              [ LayoutNet Segmentation ]
                           │
                           ▼
          [ PyTorch Vision Transformer OCR ]
                           │
                           ▼
                [ JSON Output REST API ]`,
      highlights: [
        "Implemented image normalization, binarization, and deskew algorithms using OpenCV.",
        "Fine-tuned a PyTorch Transformer layout recognition model, improving cell detection accuracy by 24%.",
        "Exposed asynchronous REST API endpoints built with FastAPI to deliver output within 450ms per page."
      ]
    },
    "2": {
      title: "Predictive Analytics & Sales Forecasting Engine",
      year: "2025",
      tech: "Python · NumPy · Pandas · Matplotlib · SQL",
      description: "A high-throughput machine learning forecasting model designed to predict demand spikes and inventory variance across multi-category dataset streams.",
      architecture: `[ Multi-Source Data Ingest ] ──> [ Pandas Data Cleaning & Aggregation ]
                                                │
                                                ▼
                                    [ Feature Engineering Pipeline ]
                                                │
                                                ▼
                                 [ XGBoost / Scikit Ensemble & Matplotlib ]
                                                │
                                                ▼
                                   [ SQL Metric Persistence ]`,
      highlights: [
        "Constructed automated data cleaning, lag-feature engineering, and outlier detection routines using NumPy & Pandas.",
        "Created custom visualization dashboards with Matplotlib for model performance loss evaluation.",
        "Achieved a 12% reduction in Mean Absolute Percentage Error (MAPE) compared to traditional moving-average baseline models."
      ]
    },
    "3": {
      title: "Intelligent Technical Knowledge RAG Assistant",
      year: "2025",
      tech: "Python · LLMs · RAG · PyTorch · REST APIs",
      description: "A Retrieval-Augmented Generation (RAG) system utilizing vector embeddings to query complex technical documentation and return concise, grounded answers.",
      architecture: `[ Markdown/PDF Manuals ] ──> [ Recursive Chunking ]
                                              │
                                              ▼
                                   [ Embedding Model (SentenceTransformers) ]
                                              │
                                              ▼
[ User Query ] ──> [ Vector Similarity Search ] ──> [ Prompt Context Assembly ] ──> [ LLM Generation ]`,
      highlights: [
        "Engineered chunking strategies optimized for technical API reference manuals and code snippets.",
        "Integrated dense vector similarity index queries, delivering response latency under 300ms for context retrieval.",
        "Designed strict prompt constraints for LLMs to mitigate hallucination and force inline citations."
      ]
    },
    "4": {
      title: "Model Context Protocol (MCP) Server & Data Pipeline",
      year: "2026",
      tech: "Python · MCP · LLMs · RAG · SQL · REST APIs",
      description: "An asynchronous backend microservice implementing the Model Context Protocol (MCP) to connect AI agents directly with relational SQL databases, vector tools, and APIs.",
      architecture: `[ LLM Agent Client ] ──> [ MCP JSON-RPC Transport Layer ]
                                           │
                                           ▼
                                 [ Tool Registry & Schemas ]
                                           │
                                           ▼
                                 [ SQL Query & RAG Executor ]`,
      highlights: [
        "Implemented standardized MCP server specification for exposing database schema inspection and SQL queries to AI agents.",
        "Enforced dynamic parameter validation and strict execution guards for autonomous LLM tool calling.",
        "Built lightweight Python middleware to stream live data and context to local client sessions."
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtns = document.querySelectorAll('.modal-close');

  function openProjectModal(id) {
    const p = projectData[id];
    if (!p) return;

    modalContent.innerHTML = `
      <h2 class="modal-project-title">${p.title}</h2>
      <p class="modal-project-sub">${p.tech} · ${p.year}</p>
      
      <h4 class="modal-section-title">Overview</h4>
      <p class="modal-section-p">${p.description}</p>
      
      <h4 class="modal-section-title">System Architecture Flow</h4>
      <div class="architecture-box">${p.architecture}</div>
      
      <h4 class="modal-section-title">Key Engineering Highlights</h4>
      <ul class="modal-bullet-list">
        ${p.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      
      <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
        <a href="https://github.com/sharathkumar18143-hash" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
          View Code Repository &rarr;
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  // --- Resume Modal ---
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const downloadResumeFileBtn = document.getElementById('download-resume-file');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  if (downloadResumeFileBtn) {
    downloadResumeFileBtn.addEventListener('click', () => {
      const resumeContent = `SHARATH KUMAR
BCA Student · Aspiring AI Engineer
Email: sharath.kumar@example.com
LinkedIn: https://www.linkedin.com/in/sharathkumara45/
GitHub: https://github.com/sharathkumar18143-hash
Location: Bangalore, India

================================================================================
SUMMARY
================================================================================
Final-year Bachelor of Computer Applications (BCA) student interested in AI engineering, 
software development, and building useful digital products.

================================================================================
TECHNICAL SKILLS
================================================================================
Languages: Python, C, SQL
AI & Data Science: PyTorch, LLMs, RAG, MCP, NumPy, Pandas, Matplotlib, OpenCV
Tools & Engineering: REST APIs, Git & GitHub, DSA, Linux CLI, Data Structures & Algorithms

================================================================================
EXPERIENCE & INTERNSHIPS
================================================================================
Full Stack Web Development Intern — Elevance Skills (Mar 4, 2026 – May 1, 2026)
- Completed 2-month internship developing web applications, dynamic frontend interfaces, and backend API integration.
- Credential Doc ID: 69f4346ec915afd92a2875d8 | MSME: UDYAN-TN-11-0114655 | Issued: May 2, 2026

================================================================================
CERTIFICATIONS & CREDENTIALS
================================================================================
1. Introduction to Model Context Protocol (MCP) — Anthropic
   - Protocol architecture, AI agent tool integration, and JSON-RPC transport layers.

2. AI Fluency for Students — Anthropic
   - Artificial intelligence concepts, prompt engineering techniques, and generative workflows.

3. Certificate of Internship in Full Stack Web Development — Elevance Skills (Issued May 2026)
   - Certified full stack web development program completion.

4. Python Logic & Flow — Issued by CTO Kevin Spektor (August 29, 2026)
   - Control structures, algorithmic problem solving, and Python program execution (ID: X3QG50-python-C8r1xh).

================================================================================
PROJECTS
================================================================================
1. Neural Vision OCR & Document Parser (Python, PyTorch, OpenCV, REST APIs)
   - Deep learning pipeline for processing unstructured document scans and extracting structured JSON data.

2. Predictive Analytics & Sales Forecasting Engine (Python, NumPy, Pandas, Matplotlib, SQL)
   - Machine learning forecasting model predicting demand spikes across multi-category dataset streams.

3. Intelligent Technical Knowledge RAG Assistant (Python, LLMs, RAG, PyTorch, FastAPI)
   - Semantic retrieval-augmented generation assistant for offline technical documentation.

4. Model Context Protocol (MCP) Server & Data Pipeline (Python, MCP, LLMs, RAG, SQL)
   - Asynchronous MCP microservice connecting LLM agents to relational databases and tools.

================================================================================
EDUCATION
================================================================================
Bachelor of Computer Applications (BCA) — Final Year (2024 - 2027)
`;
      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Sharath_Kumar_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Resume downloaded successfully');
    });
  }

  // --- Close Modals Common Handler ---
  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeAllModals();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });


  // --- Contact Form Handling with Direct Email Delivery ---
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Build mailto link prefilled with name, email and message
      const targetEmail = 'sharath25052006@gmail.com';
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(
        `Hi Sharath,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoUrl;

      showToast(`Opening your email app to deliver message to ${targetEmail}...`);
      contactForm.reset();
    });
  }

});
