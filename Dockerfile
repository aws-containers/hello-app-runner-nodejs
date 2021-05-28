# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

# You can use "node:12" or your custom image as a base image of course.
# We chose this to avoid Docker Hub's throttling during the tutorial steps.
FROM public.ecr.aws/amazonlinux/amazonlinux:latest

# You can remove this "RUN" instruction if you use a base image with
# Node.js 12 installation.
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash - \
    && yum install -y nodejs \
    && yum -y clean all \
    && rm -rf /var/cache/yum

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 80

ADD https://raw.githubusercontent.com/aws-containers/hello-app-runner/2356069859f2ac2e4c0300b510911a7a48d75337/banner_base_light.png ./public/images/

CMD [ "npm", "start" ]
