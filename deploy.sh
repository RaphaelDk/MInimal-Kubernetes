echo -e "\nStarting minikube"
minikube start

echo -e "\nConnectiong minikube to docker" :
eval $(minikube docker-env)

echo -e "\nBuilding docker image" :
docker build -t webapp ./app

echo -e "\nCreating Kubernetes components"
kubectl apply -f kubernetes/postgres-secret.yaml -f kubernetes/postgres.yaml -f kubernetes/postgres-config.yaml -f kubernetes/maitre-gims.yaml -f kubernetes/angele.yaml

echo -e "\nDeploying KIC"
helm repo add kong https://charts.konghq.com
helm repo update
helm install kong/kong --generate-name --set ingressController.installCRDs=false

