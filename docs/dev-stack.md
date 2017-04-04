# Setting up a development stack

Since this project has many services, we provide a way to set up the whole
stack in development mode. This is a 3 steps process:
 - installation and configuration of the necessary tools to build the stack
 - build with [Bazel][bazel] of the docker images
 - generation of the `docker-compose.yml` file.

# Pre-build requirements

## System requirements

To build the stack, we expect you to have the following tools on your system:
 - [Docker][docker] (latest stable version)
 - [Docker compose][docker-compose]
 - [npm][npm] >= 6.0.0
 - [python-pip][pip] for python2 (and optionally python3)
 - [Bazel][bazel] >= 4.2.0

**Important note: we do not support python3 as your default python system.
Please get back to python2.** Bazel has some tools that are only compatible
python2, so sadly we had to fall back to this. Make sure your `/usr/bin/python`
is targetting to `/usr/bin/python2`.

## Project configuration

Some parts of our project require a pre-configuration. We provide a script
setting up everything:

    cd $(bazel info workspace)
    ./configure

# Building the development stack

We use bazel to generate docker images required to run the development stack.
The following script will create a set of docker images in your local
repository named as `bazel/powerspikegg:xxx` where `xxx` is the service run.
It will also generate a `docker-compose.yml` able to start the whole
development stack.

    devutils/generate-docker-compose

# Bringing the development stack alive

To use the development stack, you now just have to move to the root workspace
and bring the docker composed stack.

    cd $(bazel info workspace)
    docker-compose up

[bazel]: https://bazel.build/
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[npm]: https://www.npmjs.com/
[pip]: https://pip.pypa.io/en/stable/

