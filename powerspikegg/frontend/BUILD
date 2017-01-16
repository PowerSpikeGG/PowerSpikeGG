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
    outs = [
        "index.html",
        "inline.bundle.js",
        "main.bundle.js",
        "styles.bundle.css",
    ],
    cmd = "bash $(location scripts/build.sh) $(@D) $(GENDIR)",
    local = 1,
    tools = ["install"],
)
