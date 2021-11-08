# Kubernetes

### Prerequisite

Docker
Minikube
Helm

### How to run

deploy.sh

export PROXY_IP=$(minikube service <release-name>-kong-proxy --url | head -1)

kubectl apply -f kic/ingress.yaml
