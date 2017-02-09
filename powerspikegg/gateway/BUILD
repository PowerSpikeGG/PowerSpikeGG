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

genrule(
    name = "dist",
    srcs = [
        "src",
    ],
    outs = ["dist.zip"],
    cmd = """cd powerspikegg/gateway && 
             sbt -Dsbt.global.base=./.sbt/ -Dsbt.ivy.home=./.ivy2/ -Divy.home=./.ivy2/ dist && 
             mv target/universal/gateway-1.0-SNAPSHOT.zip ../../$(@)""",
)
