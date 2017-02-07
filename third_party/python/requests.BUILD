licenses(["notice"])  # Apache v2

filegroup(
    name="certificates",
    srcs=glob(["requests/*.pem"]),
)

py_library(
    name="library",
    srcs=glob([
        "requests/*.py",
        "requests/**/*.py"
    ]),
    imports=["."],
    data=[
        ":certificates"
    ],
    visibility=[
        "//visibility:public"
    ],
)
