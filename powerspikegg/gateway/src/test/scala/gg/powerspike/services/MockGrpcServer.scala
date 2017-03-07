package gg.powerspike.services

import io.grpc.ServerBuilder
import org.scalatest.{BeforeAndAfterEach, Suite}


/**
  * This trait provide a Grpc server which implements services necessary to test the gateway
  */
trait MockGrpcServer extends BeforeAndAfterEach { this: Suite =>

  private val server = ServerBuilder
    .forPort(50001)
    .addService(new MockFetcher)
    .build()

  override protected def beforeEach(): Unit = {
    server.start()
    super.beforeEach()
  }


  override protected def afterEach(): Unit = {
    super.afterEach()
    server.shutdown()
  }

}
