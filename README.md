# Kubernetes

### Prerequisite
Docker
Minikube

### How to run

Start minikube :
minikube start 

Link docker / minikube :
eval $(minikube docker-env)

Build docker image :
cd minimal-express_app  
npm install  
docker build -t minimal-app .  

Create Kubernetes components :
cd minimal-kubernetes  
kubectl apply -f postgres-secret.yaml -f postgres.yaml -f postgres-config.yaml -f webapp.yaml

Check if everything is good :
kubectl get all

Get Minikube IP : 
minikube ip

Run app :
minikube_ip:32100
