#!/usr/bin/env bash

# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

set -euo pipefail

echo "Downloading a image file ..."
curl --output ./public/images/banner_base_light.png https://raw.githubusercontent.com/aws-containers/hello-app-runner/2356069859f2ac2e4c0300b510911a7a48d75337/banner_base_light.png
