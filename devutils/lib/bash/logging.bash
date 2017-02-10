#!/bin/bash

##
# name: logging.bash
# author: Axel Martin (for PowerSpikeGG)
# brief: Logging facilities for bash
#

# Prints a message on stderr prefixed by NOTICE in blank
Log::Notice () {
    >&2 echo -e "\033[1mNOTICE\033[0m: $@"
}

# Prints a message on stderr prefixed by WARNING in yellow
Log::Warning () {
    >&2 echo -e "\033[1;33mWARNING\033[0m: $@"
}

# Prints a message on stderr prefixed by FATAL in red and exit the program
Log::Failure () {
    >&2 echo -e "\033[1;31mFATAL\033[0m: $@"
    exit 1
}
