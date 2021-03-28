#!/usr/bin/env bash
set -e
eslint --fix --cache --ext ts,tsx,js,jsx $@
