### ♻ Infraestructura reutilizable
# Front-End IaC

## Instrucciones para reutilización de IaC:

- **`docker-compose.yaml`**: como valor de "image" indicar un repositorio que tengamos en Docker Hub donde se pueda pushear la imagen de nuestro Front-End.
- **`hosts.ini`**: cambiar "ec2-54-175-245-83.compute-1.amazonaws.com" por la dirección DNS pública de nuestra instancia EC2. Cambiar el valor de "ansible_ssh_key_file" por el valor que indique dónde están las nuestras keys de acceso a la instancia EC2: "./keys.pem". El "./" indica que están en el mismo directorio donde esto se ejecuta, pero no lo tienen que estar subidas en el repositorio, si no que tenemos que ejecutar en el pipeline scripts para que las copie de las variables de entorno de Gitlab y cree el archivo de las llaves cuando se tengan que utilizar.
- **`Dockerfile`**: se puede reutilizar tal como está.
- **`.gitlab-ci.yml`**: El primer pipeline del directorio raíz únicamente refiere a que se ejecute el pipeline que está en el directorio "Skyshop". El pipeline que está dentro del directorio SkyShop lo tenemos que personalizar de la siguiente manera: donde dice "- echo "$JUANKEYS" > juankeys.pem" ahí se crea el archivo de la llaves .pem en base al valor de la variable de Gitlab que contiene el valor de estas llaves (en esta variable de Gitlab es muy importante que copiemos el valor de la llaves rsa de nuestra instancia EC2 y las peguemos tal cual están, con saltos de línea y y comentarios y demás porque eso también es parte de las llaves), el cual debemos personalizar con el nombre de nuestras llaves. En el stage "create_image" tenemos que personalizar las líneas donde se ejecutan el docker build y el docker push, debemos indicar un repositorio al que podamos pushear la imagen de nuestro back-end. Recordar personalizar siempre que se nombra a las llaves .pem.
- **`nginx`**: este directorio se puede reutilizar tal como está, recreando la ubicación que tiene en relación al archivo Dockerfile.

### Variables de Entorno de Gitlab:

- #### Heredadas del grupo de repositorios:
  - **`JUANKEYS`**: valor de nuestras llaves .pem. 
  - **`CI_REGISTRY_USER`**: nuestro nombre de usuario de Docker Hub.
  - **`CI_REGISTRY_PASSWORD`**: nuestra contraseña de Docker Hub.
  - **`CI_REGISTRY`**: "docker.io" como valor, sin comillas. 
  - **`AWS_SECRET_ACCESS_KEY`**: nuestra llave de acceso secreta de AWS.
  - **`AWS_ACCESS_KEY_ID`**: nuestro id de llave de acceso de AWS.

  Esta IaC se complementa con la infraestructura de Terraform de [este repositorio](https://github.com/juancruzmarzetti/full-aws-iac) y tambíen con el Back-End de [este otro repositorio](https://github.com/juancruzmarzetti/java-spring-iac-aws)

---

### ♻ Reusable Infrastructure
# Front-End IaC

## Instructions for IaC Reuse:

- **`docker-compose.yaml`**: for the "image" value, specify a repository we have in Docker Hub where the Front-End image can be pushed.
- **`hosts.ini`**: Replace "ec2-54-175-245-83.compute-1.amazonaws.com" with the public DNS address of our EC2 instance. Change the value of "ansible_ssh_key_file" to indicate where our EC2 instance access keys are located: "./keys.pem". The "./" indicates they are in the same directory where this is executed, but they do not need to be uploaded to the repository. Instead, scripts must be run in the pipeline to copy them from GitLab environment variables and create the key file when needed.
- **`Dockerfile`**: Can be reused as is.
- **`.gitlab-ci.yml`**: The first pipeline in the root directory only refers to executing the pipeline located in the "Skyshop" directory. The pipeline within the SkyShop directory needs to be customized as follows: where it says "- echo "$JUANKEYS" > juankeys.pem", it creates the .pem key file based on the value of the GitLab variable containing these keys (in this GitLab variable, it is very important that we copy the rsa key value from our EC2 instance and paste it exactly as it is, including line breaks, comments, etc., as these are part of the keys). The name of our keys should be personalized. In the "create_image" stage, we need to customize the lines where `docker build` and `docker push` are executed, and specify a repository where we can push the backend image. Remember to always personalize when referencing .pem keys.
- **`nginx`**: This directory can be reused as is, recreating its location in relation to the Dockerfile.

### GitLab Environment Variables:

- #### Inherited from the repository group:
  - **`JUANKEYS`**: value of our .pem keys. 
  - **`CI_REGISTRY_USER`**: our Docker Hub username.
  - **`CI_REGISTRY_PASSWORD`**: our Docker Hub password.
  - **`CI_REGISTRY`**: "docker.io" as the value, without quotes.
  - **`AWS_SECRET_ACCESS_KEY`**: our AWS secret access key.
  - **`AWS_ACCESS_KEY_ID`**: our AWS access key ID.

  This IaC is complemented by the Terraform infrastructure in [this repository](https://github.com/juancruzmarzetti/full-aws-iac) and also by the Back-End from [this other repository](https://github.com/juancruzmarzetti/java-spring-iac-aws).
