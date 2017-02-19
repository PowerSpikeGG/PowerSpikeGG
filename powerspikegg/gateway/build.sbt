name := "gateway"

version := "1.0"

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.0.3",
  "io.grpc" % "grpc-all" % "1.1.2"
)