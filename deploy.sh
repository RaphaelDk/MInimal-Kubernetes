echo "Starting minikube"
minikube start

echo "Connectiong minikube to docker" :
eval $(minikube docker-env)

echo "Building docker image" :
docker build -t minimal-app ./minimal-app

echo "Creating Kubernetes components"
cd minimal-kubernetes
kubectl apply -f postgres-secret.yaml -f postgres.yaml -f postgres-config.yaml -f maitre-gims.yaml -f angele.yaml
cd ..
