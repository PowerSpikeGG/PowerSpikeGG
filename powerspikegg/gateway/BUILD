filegroup(
    name = "src",
    srcs = glob([
        "conf/**/*",
        "project/*.sbt",
        "project/*.properties",
        "app/**/*",
        "public/**/*"
    ])
)

genrule(
    name = "dist",
    srcs = [
        "src"
    ],
    outs = ["test.zip"],
    cmd = "sbt dist",
)