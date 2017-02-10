#!/bin/bash

##
# name: prompt.bash
# author: Axel Martin (for PowerSpikeGG)
# brief: Prompt utilities for bash
#

# Asks the user a yes/no choice
Prompt::YesNoPrompt () {
    while true
    do
        read -p "$@ [y/n]: " yes_no_response
        case $yes_no_response in
            [Yy]*) return 0 ;;
            [Nn]*) return 1 ;;
        esac
    done
}


