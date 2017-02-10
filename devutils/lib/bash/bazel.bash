#!/bin/bash

##
# name: bazel.bash
# author: Axel Martin
# brief: Bazel utilities for bash
#


# Get Bazel rules using files given in stdin as source file
Bazel::GetAssociatedTests () {
    {
        local dependencies

        while read file
        do
            local rule_to_file=$(bazel query $file 2> /dev/null)
            if [ "$rule_to_file" = "" ]; then
                Log::Notice "file is not part of a package: $file"
            elif [[ "$rule_to_file" != *:BUILD ]]; then
                dependencies=$(bazel query --logging 0 --curses no "kind('.*_test',
                    rdeps(..., attr('srcs', $rule_to_file, ...)))")
                if [ "$dependencies" = "" ]; then
                    Log::Warning "file does not have associated test suite: $file"
                else
                    echo "$dependencies"
                fi
            fi
        done
    } | sort | uniq
}


# Test bazel targets given in stdin
Bazel::TestTargets () {
    local made_tests=false
    local has_failure=false

    while read target
    do
        bazel test --ignore_unsupported_sandboxing $target || return 1
        made_tests=true
    done

    if ! $made_tests ; then
        Log::Notice "no tests affected by the commit."
    fi
}
