# Image Cache

## Problem Summary

This problem involves writing some Typescript code to implement a filesystem base image cache.

### Expected time

45 minutes.

### Environment

- IDE and NodeJS. VSCode or IntelliJ free community versions work fine.
- [VSCode](https://code.visualstudio.com/)
- [IntelliJ](https://www.jetbrains.com/idea/)

### Quickstart guide

- Clone this repo
- Run `yarn install` to install dependencies
- Run `yarn test` to run the tests

### Background knowledge

Kaleido/Canva is a very visual product, there are lots of images involved. Many of our backend services
need to download these images and do something with them. For example, when downloading a design,
one of our backend services will download the image and store it on the filesystem while
processing the download. We’d like to avoid downloading the same image again and again, one
approach to this is to cache them.

Through the course of the interview, we'd like you to write some Ruby code that caches images
on the filesystem. The images are uniquely identified by urls.
