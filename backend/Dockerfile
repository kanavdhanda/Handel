# Use the official Golang image as the base image
FROM golang:1.23.1

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
# RUN go build -o main .

# Copy the run.sh script into the container
COPY run.sh ./


# Give execute permission to the run.sh script
RUN chmod +x run.sh

RUN ls -la

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the script
CMD ["./run.sh"]
