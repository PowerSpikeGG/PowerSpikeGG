#!/bin/bash

##
# name: bazel.bash
# author: Axel Martin
# brief: Bazel utilities for bash
#

source "$(dirname "${BASH_SOURCE[0]}")/logging.bash"

# Get Bazel rules using files given in stdin as source file
Bazel::GetAssociatedTests () {
    {
        local dependencies

        while read file
        do
            local rule_to_file=$(bazel query "$file" 2> /dev/null)
            if [ -z "$rule_to_file" ]; then
                Log::Notice "file is not part of a Bazel package: $file"
            elif [[ "$rule_to_file" != *:BUILD ]]; then
                dependencies="$(bazel query --logging 0 --curses no "kind('.*_test',
                    rdeps(..., attr('srcs', $rule_to_file, ...)))")"
                if [ -z "$dependencies" ]; then
                    Log::Warning "file does not have associated Bazel test suite: $file"
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

    while read -r target
    do
        ( $made_tests ) || Log::Notice "testing associated targets (this might take a while)"
        bazel test --noshow_progress \
                   --noverbose_test_summary \
                   --ignore_unsupported_sandboxing \
                   "$target" || return 1
        made_tests=true
    done

    if ! $made_tests ; then
        Log::Notice "no tests affected by the commit."
    fi
}
