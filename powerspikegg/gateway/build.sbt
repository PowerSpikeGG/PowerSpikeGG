name := "gateway"

version := "1.0"

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http" % "10.0.3",
  "com.typesafe.akka" %% "akka-http-testkit" % "10.0.3",
  "org.scalatest" %% "scalatest" % "3.0.1" % "test",
  "io.grpc" % "grpc-all" % "1.1.2"
)