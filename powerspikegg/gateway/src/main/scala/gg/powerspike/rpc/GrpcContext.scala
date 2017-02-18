package gg.powerspike.rpc

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import io.grpc.{ManagedChannel, ManagedChannelBuilder}

/**
  * Created by cassan on 17/02/17.
  */
class GrpcContext {

  private val port = 50001

  private val address = "127.0.0.1"

  val channel: ManagedChannel = ManagedChannelBuilder
    .forAddress(address, port)
    .usePlaintext(true)
    .build()

}
