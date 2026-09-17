# AWS Architecture

## Overview

This project deploys a containerized Node.js Todo application on AWS.

## Architecture Flow

User
↓
Application Load Balancer
↓
Amazon ECS Fargate
↓
Node.js Todo Container

The Docker image is stored in Amazon ECR.

## Monitoring

ECS Fargate
→ CloudWatch Container Insights
→ CloudWatch Application Logs

Application Load Balancer
→ CloudWatch ALB Access Logs

## AWS Components

### Amazon ECR

Amazon Elastic Container Registry stores the Docker image used by the ECS task.

### Amazon ECS Fargate

ECS Fargate runs the Node.js application container without requiring management of EC2 instances.

The ECS service maintains the desired number of running tasks.

### Application Load Balancer

The ALB receives HTTP traffic on port 80 and forwards requests to the ECS target group.

Application port: 8000

Health check path: /todo

### Amazon CloudWatch

CloudWatch is used for:

- ECS Container Insights
- ECS application logs
- ALB access logs
- CPU and memory monitoring
- Troubleshooting

## Deployment Flow

Developer
↓
GitHub
↓
Docker Build
↓
Amazon ECR
↓
ECS Fargate
↓
Application Load Balancer
↓
End User

## Self-Healing

The ECS service maintains the desired task count.

During testing, the running ECS task was manually stopped. ECS automatically launched a replacement task to maintain the desired count.

## Current Implementation

- Node.js application
- Docker containerization
- Amazon ECR
- Amazon ECS Fargate
- Application Load Balancer
- CloudWatch Container Insights
- CloudWatch application logs
- CloudWatch ALB access logs

## Planned Enhancements

- ECS Auto Scaling
- HTTPS using AWS Certificate Manager
- Terraform Infrastructure as Code
- CI/CD
- Jenkins
- Production-grade security configuration
