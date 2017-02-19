package gg.powerspike

import scala.concurrent.{ExecutionContext, Future}
import akka.Done
import akka.actor.ActorSystem
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.PathMatchers.{LongNumber, Remaining}
import akka.http.scaladsl.server.{HttpApp, Route}
import com.google.protobuf.util.JsonFormat
import gg.powerspike.rpc.{GrpcContext, MatchFetcher}

/**
  * This object contains the server web server including the actor system and akka materializer
  */
object WebServer extends HttpApp {

  /**
    * The Grpc Context contains the configuration and the channels instances to other services
    * Only one context ;ust be present by web server
    */
  private val grpcContext = new GrpcContext()
  private val grpcToJson = JsonFormat.printer()
  private val fetcher = new MatchFetcher(grpcContext)

  def route: Route = {
    path("matchs" / LongNumber) { matchId =>
      get {
        complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, grpcToJson.print(fetcher.getById(matchId))))
      }
    } ~
    path("summoner" / Remaining) { summonerId =>
      get {
        complete(HttpEntity(ContentTypes.`text/html(UTF-8)`,
          fetcher.getBySummoner(summonerId).map(grpcToJson.print(_)).mkString("[", ",", "]")
        ))
      }
    }
  }

  override def waitForShutdownSignal(actorSystem: ActorSystem)(implicit executionContext: ExecutionContext): Future[Done] = {
    systemReference.get().whenTerminated.map(_ => Done)
  }
}
