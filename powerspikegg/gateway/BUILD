filegroup(
    name = "src",
    srcs = glob([
        "conf/**/*",
        "project/*.sbt",
        "project/*.properties",
        "app/**/*",
        "public/**/*",
        "build.sbt",
    ]),
)

filegroup(
    name = "config",
    srcs = glob([
        "built.sbt",
        "project/*.sbt",
        "project/*.properties",
    ]),
)

genrule(
    name = "install",
    srcs = [
        "config",
    ],
    outs = [
        "sbt.zip",
    ],
    cmd = """cd powerspikegg/gateway &&
             sbt -Dsbt.global.base=./.sbt/ -Dsbt.ivy.home=./.ivy2/ -Divy.home=./.ivy2/ update &&
             zip -r ../../$(@) .ivy2 .sbt""",
)

genrule(
    name = "dist",
    srcs = [
        "src",
        "sbt.zip",
    ],
    outs = ["dist.zip"],
    cmd = """cd powerspikegg/gateway && 
             sbt -Dsbt.global.base=./.sbt/ -Dsbt.ivy.home=./.ivy2/ -Divy.home=./.ivy2/ dist && 
             mv target/universal/gateway-1.0-SNAPSHOT.zip ../../$(@)""",
)
