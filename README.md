# Getting Started

### Requirements

- Node.js > v8

### Steps to run

1. Clone the repo or download the source
2. Run npm install to install the dependencies
3. Use `npm start` to start the dev server

### Steps to deploy

Using Docker:

1. Build a docker image using:

```
docker build -t <image-name>:<tag> .
```

2. Run the image using:

```
docker run -p 80:80 -d <image-name>:<tag>
```

Build and deploy Manually:

1. Build the project using `npm build`
2. Copy the content from /build to the destination folder
