
genrule(
	name = "frontend",
	srcs = ["scripts/install.sh", "package.json"],
	outs = ["dist"],
	cmd = "bash $(location scripts/install.sh) $(@D) $(GENDIR)"
)
