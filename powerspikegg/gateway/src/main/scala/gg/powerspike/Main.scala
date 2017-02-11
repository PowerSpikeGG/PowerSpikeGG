package gg.powerspike

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import scala.io.StdIn

object Main {
  def main(args: Array[String]) = {

    implicit val system = ActorSystem("system")
    implicit val materializer = ActorMaterializer()

    implicit val executionContext = system.dispatcher

    val route =
      path("hello") {
        get {
          complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1> Hello </h1>"))
        }
      }

    val bindingFuture = Http().bindAndHandle(route, "localhost", 8080)

    println("server started")
    StdIn.readLine()
    bindingFuture.flatMap(_.unbind())
        .onComplete( _ => system.terminate())
  }
}