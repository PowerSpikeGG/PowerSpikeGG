package controllers

import javax.inject._

import play.api.mvc._
import fetcher.rds.MatchFetcherGrpc
import fetcher.rds.Service.MatchRequest
import game.leagueoflegends.Constants.Region
import io.grpc.{ManagedChannel, ManagedChannelBuilder}
/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject() extends Controller {

  private val channel: ManagedChannel = ManagedChannelBuilder
    .forAddress("127.0.0.1", 50001)
    .usePlaintext(true).build()

  private val blockingStub = MatchFetcherGrpc.newBlockingStub(channel)


  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index = Action { implicit request =>

    val request = MatchRequest.newBuilder().setRegion(Region.EUW).build()

    try {
      val res = blockingStub.`match`(request)
      Ok(res.toString)
    } catch {
      case e: Exception => InternalServerError(e.getMessage)
    }
  }
}
