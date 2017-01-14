genrule(
    name = "install",
    srcs = ["scripts/install.sh", "package.json"],
    outs = ["installed.txt"],
    cmd = "bash $(location scripts/install.sh) $(@D) $(GENDIR)"
)

#TODO: Investigate why the sanboxing of bazel conflict with angular-cli environement (just a warning)
genrule(
    name = "frontend",
    srcs = ["scripts/build.sh"],
    outs = ["index.html", "inline.bundle.js", "main.bundle.js"],
    tools = ["install"],
    cmd = "bash $(location scripts/build.sh) $(@D) $(GENDIR)"
)