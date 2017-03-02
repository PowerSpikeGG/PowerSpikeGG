#!/bin/bash

##
# name: logging.bash
# author: Axel Martin (for PowerSpikeGG)
# brief: Logging facilities for bash
#

Log::_GetStackCall () {
    echo "$(basename ${BASH_SOURCE[2]}):${FUNCNAME[2]}"
}

# Prints a message on stderr prefixed by SUCCESS in green
Log::Success () {
    >&2 echo -e "\033[1;32m$(Log::_GetStackCall) SUCCESS\033[0m: $@"
}

# Prints a message on stderr prefixed by NOTICE in blank
Log::Notice () {
    >&2 echo -e "\033[1m$(Log::_GetStackCall) NOTICE\033[0m: $@"
}

# Prints a message on stderr prefixed by WARNING in yellow
Log::Warning () {
    >&2 echo -e "\033[1;33m$(Log::_GetStackCall) WARNING\033[0m: $@"
}

# Prints a message on stderr prefixed by ERROR in red
Log::Error () {
    >&2 echo -e "\033[1;31m$(Log::_GetStackCall) ERROR\033[0m: $@"
    ((_log_error_count+=1))
}

# Reset the error counter
Log::ResetErrorCounter () {
    _log_error_count=0
}

# Get the error count
Log::GetErrorCounter () {
    echo -n $_log_error_count
}

if [ -z ${_log_error_count+x} ]; then
    _log_error_count=0
fi

# Prints a message on stderr prefixed by FATAL in pink and exit the program
Log::Failure () {
    >&2 echo -e "\033[1;35m$(Log::_GetStackCall) FATAL\033[0m: $@"
    exit 1
}
