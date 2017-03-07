package gg.powerspike

import io.grpc.ServerBuilder

/**
  * Grpc server which implements services necessary to test the gateway
  */
class MockGrpcServer {

  private val server = ServerBuilder
    .forPort(50001)
    .addService(new MockFetcher)
    .build()

  def start(): Unit = server.start()

}

/**
  * Singleton containing an instance of the Mock Grpc server
  * Allow to share the server between tests (The server is stateless)
  */
object MockGrpcServer {

  val server = new MockGrpcServer
  server.start()

}