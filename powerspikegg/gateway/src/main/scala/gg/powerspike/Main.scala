package gg.powerspike

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import fetcher.rds.Service.MatchRequest
import io.grpc.{ManagedChannel, ManagedChannelBuilder, StatusRuntimeException}
import fetcher.rds.{MatchFetcherGrpc, Service}

import scala.io.StdIn

object Main {
  def main(args: Array[String]): Unit = {

    implicit val system = ActorSystem("system")
    implicit val materializer = ActorMaterializer()

    implicit val executionContext = system.dispatcher

    val channel: ManagedChannel = ManagedChannelBuilder
      .forAddress("127.0.0.1", 50001)
      .usePlaintext(true)
      .build()

    val fetcher = MatchFetcherGrpc.newBlockingStub(channel)

    val route =
      path("hello") {
        get {
          val matchRequest = MatchRequest.newBuilder().setId(1).build()


          try {
            val response = fetcher.`match`(matchRequest)
            complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1> Hello </h1>" + response))
          } catch {
            case e: StatusRuntimeException => println("Failure GRPC:" + e.getStatus)
          }
          complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1> Hello </h1>"))
        }
      }

    val bindingFuture = Http().bindAndHandle(route, "localhost", 8080)

    println("server started")
    StdIn.readLine()
    /*bindingFuture.flatMap(_.unbind())
        .onComplete( _ => system.terminate())*/
  }
}