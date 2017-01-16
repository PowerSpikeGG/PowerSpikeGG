genrule(
    name = "install",
    srcs = [
        "scripts/install.sh",
        "package.json",
    ],
    outs = ["installed.txt"],
    cmd = "bash $(location scripts/install.sh) $(@D) $(GENDIR)",
    local = 1,
)

genrule(
    name = "frontend",
    srcs = ["scripts/build.sh"],
    outs = ["dist.tar"],
    cmd = "bash $(location scripts/build.sh) $(@D) $(GENDIR)",
    local = 1,
    tools = ["install"],
)
