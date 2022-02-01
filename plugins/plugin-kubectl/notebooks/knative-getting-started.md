---
title: Knative &mdash; Getting Started
layout:
    1: left
    default: wizard
wizard:
    description: Kubernetes-based platform to deploy and manage modern serverless workloads
    steps:
        - Before you begin
        - name: Prepare local Kubernetes cluster
          description: Using kind or minikube can help you isolate your Knative learning experiments.
        - Install the Kubernetes CLI
        - Install the Knative CLI
        - name: Install the Knative "Quickstart" environment
          description: The kn quickstart plugin can quickly set up Knative against kind of minikube
codeblocks:
    - language: bash
      match: ^brew install kn$
      validate: brew info kn
---

--8<-- "knative-what-is-it-good-for.md"

---

--8<-- "https://raw.githubusercontent.com/knative/docs/main/docs/getting-started/README.md"

<!-- This is a demonstration of including unmodified markdown content, and overlaying a wizard -->