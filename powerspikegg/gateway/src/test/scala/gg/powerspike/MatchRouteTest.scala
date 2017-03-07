package gg.powerspike

import akka.http.scaladsl.testkit.ScalatestRouteTest
import org.scalatest.{Matchers, WordSpec}

class MatchRouteTest extends WordSpec with Matchers with ScalatestRouteTest {

  private val server = MockGrpcServer.server

  private val matchId = 2997314842L

  "The Match api" should {
    "return the details of a match referenced by an id in json" in {
      Get("/api/matchs/" + matchId) ~> WebServer.route ~> check {
        responseAs[String] should (not be empty and startWith ("{") and endWith ("}"))
      }
    }
  }

}